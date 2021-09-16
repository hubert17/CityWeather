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
            labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
            time: 0,
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
            formData.append("csvFiles[0]", this.csvFile);
            axios.post('https://localhost:44366/WeatherForecast', formData).then((response) => {
                this.cityWeathers = response.data
            })
            .catch(() => {
                alert('Oops! Server error.')
            })
        },
        timeConverter(UNIX_timestamp){
            var d = new Date(UNIX_timestamp).toLocaleDateString("en-US")
            var t = new Date(1504095567183).toLocaleTimeString("en-US")
            return d + ' ' + t
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
     <v-col sm="4" v-for="(weather,index) in cityWeathers" key="weather.name">
      <v-card v-if="cityWeathers.length > 0" class="mx-auto" max-width="400" >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5"> {{weather.name}} </v-list-item-title>
            <v-list-item-subtitle>{{timeConverter(weather.dt)}}, {{weather.weather[0].description}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col class="text-h2" cols="6" >
              {{Math.round(weather.main.temp)}}&deg;C
            </v-col>
            <v-col cols="6">
              <v-img :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'" alt="Sunny image" width="92" ></v-img>
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{weather.main.humidity}}%</v-list-item-subtitle>
        </v-list-item>

        <v-slider v-model="time" :max="6" :tick-labels="labels" class="mx-4" ticks ></v-slider>

        <v-list class="transparent"> <v-list-item v-for="item in forecast" :key="item.day" >
            <v-list-item-title>{{ item.day }}</v-list-item-title>
            <v-list-item-icon> <v-icon>{{ item.icon }}</v-icon> </v-list-item-icon>
            <v-list-item-subtitle class="text-right"> {{ item.temp }} </v-list-item-subtitle>
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