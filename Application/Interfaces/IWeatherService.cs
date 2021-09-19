using CityWeather.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CityWeather.Application.Interfaces
{
    public interface IWeatherService
    {
        Task<List<WeatherDailyDto>> GetByCityNames(string csvCities);
    }
}
