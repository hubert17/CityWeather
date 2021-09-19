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
using CityWeather.Application.Interfaces;
using CityWeather.Application.Dtos;
using TimeZoneConverter;

namespace CityWeather.Infrastructure.Services
{

    public class WeatherService : IWeatherService
    {
        public async Task<List<WeatherDailyDto>> GetByCityNames(string csvCities, string apiKey = "")
        {
            apiKey = string.IsNullOrWhiteSpace(apiKey) ? "4309f783f320a86bfdbba7276e3f0f9e" : apiKey;
            var apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=metric&q=";
            var apiUrlDaily = "https://api.openweathermap.org/data/2.5/onecall?appid=" + apiKey + "&units=metric&exclude=minutely,hourly,alerts"; // &lat=43.7001&lon=-79.4163"

            List<City> cities;

            using (var reader = new StringReader(csvCities))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                cities = csv.GetRecords<City>().ToList();
            }

            var data = new List<WeatherDailyDto>();

            using (var client = new WebClient())
            {
                foreach(var city in cities)
                {
                    try
                    {
                        var result = await client.DownloadStringTaskAsync(new Uri(apiUrl + city.Name));
                        var currentWeather = JsonConvert.DeserializeObject<WeatherDto>(result); // Get city coordinates
                        result = await client.DownloadStringTaskAsync(new Uri($"{apiUrlDaily}&lat={currentWeather.coord.lat}&lon={currentWeather.coord.lon}"));
                        var dailyWeather = JsonConvert.DeserializeObject<WeatherDailyDto>(result);

                        dailyWeather.name = city.Name;

                        DateTimeOffset dateTimeOffset = DateTimeOffset.FromUnixTimeSeconds(dailyWeather.current.dt);
                        DateTime dateTime = TimeZoneInfo.ConvertTimeFromUtc(dateTimeOffset.UtcDateTime, TimeZoneInfo.FindSystemTimeZoneById(TZConvert.IanaToWindows(dailyWeather.timezone)));
                        dailyWeather.current.dtHumanized = dateTime.ToString("ddd, d MMMM hh:mm tt");
                        dailyWeather.daily.ForEach(x =>
                        {
                            DateTimeOffset dateTimeOffset = DateTimeOffset.FromUnixTimeSeconds(x.dt);
                            DateTime dateTime = TimeZoneInfo.ConvertTimeFromUtc(dateTimeOffset.UtcDateTime, TimeZoneInfo.FindSystemTimeZoneById(TZConvert.IanaToWindows(dailyWeather.timezone)));
                            x.dtHumanizedDay = dateTime.ToString("dddd");
                        });

                        data.Add(dailyWeather);
                    }
                    catch
                    {
                        continue;
                    }

                }                                  
            }

            return data;
        }
    }

    // For CsvHelper
    public class City
    {
        [Name("City Name")]
        public string Name { get; set; }
    }
}

