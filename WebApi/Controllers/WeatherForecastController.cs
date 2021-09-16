﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CityWeather.Application.Interfaces;
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
        public async Task<IActionResult> GetWeather(IFormCollection csvFiles)
        {
            if (csvFiles.Files[0] == null || csvFiles.Files[0].Length == 0)
                return BadRequest();

            using (var reader = new StreamReader(csvFiles.Files[0].OpenReadStream()))
            {
                var csvCities = await reader.ReadToEndAsync();
                var data = await _weatherSvc.GetByCityNames(csvCities);
                return Ok(data);
            }
        }
    }
}


