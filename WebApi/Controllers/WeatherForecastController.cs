﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CityWeather.Application;
using CityWeather.Application.Interfaces;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CityWeatherWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {        
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IWeatherService _weatherSvc;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IWeatherService weatherSvc)
        {
            _logger = logger;
            _weatherSvc = weatherSvc;
        }

        [HttpPost]
        public async Task<IActionResult> GetWeather(IFormFile csvFile, string apiKey = "") // APIkey is optional 
        {
            if (csvFile == null)
                return BadRequest();

            using (var reader = new StreamReader(csvFile.OpenReadStream()))
            {
                var csvCities = await reader.ReadToEndAsync();
                var data = await _weatherSvc.GetByCityNames(csvCities, apiKey);
                return Ok(data);
            }
        }
        [HttpPost("GetWeather2")]
        public async Task<IActionResult> GetWeather2(StringViewModel str)
{
            var data = await _weatherSvc.GetByCityNames(str.Data, "");
            foreach (var i in data)
            {
                Console.WriteLine(i.timezone);
            }
            return Ok(data);
        }
    }
}


