import css from '../plugins/goober.js';

const styles = css /*css*/ `



`

export default {
    name: 'Weather',

    data() {
        return {
            title: 'Weather',
            cityWeathers: [],
            csvFile: null,
            forecast: [
                { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
                { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
                { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
            ],
        };
    },

    methods: {
        getWeather() {
            if(!this.csvFile) return;

            let formData = new FormData();
            formData.append("csvFile", this.csvFile);
            axios.post('https://localhost:44366/WeatherForecast', formData).then((response) => {
                this.cityWeathers = response.data
            })
            .catch(() => {
                alert('Oops! Server error.')
            })
        }
    },

    template: /*html*/ `

<v-container class=${styles}>
   <v-row v-if="cityWeathers.length === 0" align="center" justify="center" style="height:calc(100vh - 200px);">
     <v-col style="max-width: 400px;">
      <v-file-input v-model="csvFile" label="Upload CSV File" accept=".csv" filled @change="getWeather"></v-file-input>
     </v-col>
   </v-row>

   <v-row>
     <v-col sm="4" v-for="(weather,index) in cityWeathers" :key="weather.name">
      <v-card v-if="cityWeathers.length > 0" class="mx-auto" max-width="400" >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5"> {{weather.name}} </v-list-item-title>
            <v-list-item-subtitle>{{weather.current.dtHumanized}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{weather.current.weather[0].description}}, Feels like {{Math.round(weather.current.feels_like)}}&deg;</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col class="text-h2" cols="6" >
              {{Math.round(weather.current.temp)}}&deg;C
            </v-col>
            <v-col cols="6">
              <v-img :src="'http://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '@2x.png'" :alt="weather.current.weather[0].main" width="92" ></v-img>
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ parseFloat((weather.current.wind_speed * 3.6).toFixed(2))}} km/h</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-water</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{weather.current.humidity}}%</v-list-item-subtitle>
        </v-list-item>

        <v-list class="transparent"> <v-list-item v-for="daily in weather.daily" :key="daily.day" >
            <v-list-item-title>{{ daily.dtHumanizedDay }}</v-list-item-title>
            <v-img :src="'http://openweathermap.org/img/wn/' + daily.weather[0].icon + '.png'" :alt="daily.weather[0].main" ></v-img>
            <v-list-item-subtitle class="text-right"> {{ Math.round(daily.temp.max) }}&deg;/{{ Math.round(daily.temp.min) }}&deg; </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text> Full Report </v-btn>
        </v-card-actions>
      </v-card>
     </v-col>
   </v-row>

</v-container>

    `,
  };