using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CityWeatherGabs.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CityWeatherGabs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {        
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IWeatherSvc _weatherSvc;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IWeatherSvc weatherSvc)
        {
            _logger = logger;
            _weatherSvc = weatherSvc;
        }

        [HttpPost]
        public async Task<IActionResult> GetWeather(IFormFile csvFile)
        {
            if (csvFile == null || csvFile.Length == 0)
                return BadRequest();

            using (var reader = new StreamReader(csvFile.OpenReadStream()))
            {
                var csvCities = await reader.ReadToEndAsync();
                var data = await _weatherSvc.GetByCityNames(csvCities);
                return Ok(data);
            }
        }
    }
}


