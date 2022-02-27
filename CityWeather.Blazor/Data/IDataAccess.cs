using CityWeather.Application;
using CityWeather.Application.Dtos;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace CityWeather.Blazor.Data
{
    public interface IDataAccess
    {
        [Post("/GetWeather2")]
        Task<List<WeatherDailyDto>> GetWeather2(StringViewModel str);
    }
}
