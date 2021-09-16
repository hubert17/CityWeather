using CityWeatherGabs.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Newtonsoft.Json;
using CsvHelper;
using System.Globalization;
using System.IO;
using CsvHelper.Configuration.Attributes;

namespace CityWeatherGabs.Services
{
    public interface IWeatherSvc
    {
        Task<List<WeatherDto>> GetByCityNames(string csvCities);
    }

    public class WeatherSvc : IWeatherSvc
    {
        public async Task<List<WeatherDto>> GetByCityNames(string csvCities)
        {
            var apiKey = "4309f783f320a86bfdbba7276e3f0f9e";
            var apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=";

            List<City> cities;

            using (var reader = new StringReader(csvCities))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                cities = csv.GetRecords<City>().ToList();
            }

            var data = new List<WeatherDto>();

            using (var client = new WebClient())
            {
                foreach(var city in cities)
                {
                    var result = await client.DownloadStringTaskAsync(new System.Uri(apiUrl + city.Name));
                    data.Add(JsonConvert.DeserializeObject<WeatherDto>(result));
                }                                  
            }

            return data;
        }
    }

    public class City
    {
        [Name("City Name")]
        public string Name { get; set; }
    }
}

