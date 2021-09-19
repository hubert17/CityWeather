import CityWeather from '../components/CityWeather.vue.js'

import css from '../plugins/goober.js';
const styles = css /*css*/ `


`

export default {
    name: 'Weather',

    data() {
      return {
          cityWeathers: [],
          csvFile: null,
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
    components: {
      CityWeather,
    },

    template: /*html*/ `

<v-container class=${styles}>

      <v-row v-if="cityWeathers.length === 0" align="center" justify="center" style="height:calc(100vh - 200px);">
        <v-col style="max-width: 400px;" class="text-center">
         <h2>City Weather App</h2>
         <h3 class="subtitle-2 mb-5">by Bernard Gabon</h3>
         <v-file-input v-model="csvFile" label="Upload CSV File" accept=".csv" filled @change="getWeather"></v-file-input>
        </v-col>
      </v-row>

      <v-carousel v-if="$vuetify.breakpoint.xsOnly && cityWeathers.length > 0" cycle hide-delimiter-background :show-arrows="false" hide-delimiters height="100vh">
        <v-carousel-item  v-for="(weather,index) in cityWeathers" :key="weather.name">
          <CityWeather :weather="weather" />
        </v-carousel-item>
      </v-carousel>


      <v-row v-if="!$vuetify.breakpoint.xsOnly && cityWeathers.length > 0">
        <v-col sm="4" v-for="(weather,index) in cityWeathers" :key="weather.name">
          <CityWeather :weather="weather" />
        </v-col>
      </v-row>

</v-container>

    `,
  };