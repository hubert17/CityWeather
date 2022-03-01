using MudBlazor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityWeather.Blazor
{
    public class Core
    {
        public static string PrimaryColor { get; set; } = "#4876abff";

        public static MudTheme defaultTheme { get; set; } = new MudTheme()
        {
            Palette = new Palette()
            {
                AppbarBackground = "#4876abff",
                Primary = "#4876abff",
                DrawerText = "#ffffff",
                HoverOpacity = 0.3,
            }
        };
    }
}
