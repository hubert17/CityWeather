using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityWeather.Application.Dtos
{
    // Current Weather
    public class Coord
    {
        public double lon { get; set; }
        public double lat { get; set; }
    }

    public class Weather
    {
        public int id { get; set; }
        public string main { get; set; }
        public string description { get; set; }
        public string icon { get; set; }
    }

    public class Main
    {
        public double temp { get; set; }
        public double feels_like { get; set; }
        public double temp_min { get; set; }
        public double temp_max { get; set; }
        public int pressure { get; set; }
        public int humidity { get; set; }
    }

    public class Wind
    {
        public double speed { get; set; }
        public int deg { get; set; }
        public double gust { get; set; }
    }

    public class Clouds
    {
        public int all { get; set; }
    }

    public class Sys
    {
        public int type { get; set; }
        public int id { get; set; }
        public string country { get; set; }
        public int sunrise { get; set; }
        public int sunset { get; set; }
    }

    public class WeatherDto // Current Weather
    {
        public Coord coord { get; set; }
        public List<Weather> weather { get; set; }
        public string @base { get; set; }
        public Main main { get; set; }
        public int visibility { get; set; }
        public Wind wind { get; set; }
        public Clouds clouds { get; set; }
        public int dt { get; set; }
        public Sys sys { get; set; }
        public int timezone { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public int cod { get; set; }
    }

    // =======================
    // Weather Daily 

    public class Current
    {
        public int dt { get; set; }
        public string dtHumanized { get; set; } // Humanized datetime from unix timestamp
        public int sunrise { get; set; }
        public int sunset { get; set; }
        public double temp { get; set; }
        public double feels_like { get; set; }
        public int pressure { get; set; }
        public int humidity { get; set; }
        public double dew_point { get; set; }
        public double uvi { get; set; }
        public int clouds { get; set; }
        public int visibility { get; set; }
        public double wind_speed { get; set; }
        public int wind_deg { get; set; }
        public double wind_gust { get; set; }
        public List<Weather> weather { get; set; }
    }

    public class Temp
    {
        public double day { get; set; }
        public double min { get; set; }
        public double max { get; set; }
        public double night { get; set; }
        public double eve { get; set; }
        public double morn { get; set; }
    }

    public class FeelsLike
    {
        public double day { get; set; }
        public double night { get; set; }
        public double eve { get; set; }
        public double morn { get; set; }
    }

    public class Daily
    {
        public int dt { get; set; }
        public string dtHumanizedDay { get; set; } // Humanized datetime from unix timestamp
        public int sunrise { get; set; }
        public int sunset { get; set; }
        public int moonrise { get; set; }
        public int moonset { get; set; }
        public double moon_phase { get; set; }
        public Temp temp { get; set; }
        public FeelsLike feels_like { get; set; }
        public int pressure { get; set; }
        public int humidity { get; set; }
        public double dew_point { get; set; }
        public double wind_speed { get; set; }
        public int wind_deg { get; set; }
        public double wind_gust { get; set; }
        public List<Weather> weather { get; set; }
        public int clouds { get; set; }
        public double pop { get; set; }
        public double uvi { get; set; }
        public double? rain { get; set; }
    }

    public class WeatherDailyDto
    {
        public string name { get; set; } // City Name
        public double lat { get; set; }
        public double lon { get; set; }
        public string timezone { get; set; }
        public int timezone_offset { get; set; }
        public Current current { get; set; }
        public List<Daily> daily { get; set; }
    }



}
