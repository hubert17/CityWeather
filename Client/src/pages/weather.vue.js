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
          showSample: false,
          loading: false
      };
    },

  methods: {
      getWeather() {
          if(!this.csvFile) return;

          this.loading = true;
          let formData = new FormData();
          formData.append("csvFile", this.csvFile);
          axios.post('https://gabscityweatherapi.azurewebsites.net/WeatherForecast', formData).then((response) => {
              this.cityWeathers = response.data;
              this.loading = false;
          })
          .catch((e) => {
              this.loading = false;
              alert('Oops! Server error.')
          })
      }
  },
    components: {
      CityWeather,
    },

    template: /*html*/ `

<v-container class=${styles}>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" ></v-progress-circular>
    </v-overlay>

      <v-row v-if="cityWeathers.length === 0" align="center" justify="center" style="height:calc(100vh - 200px);">
        <v-col class="text-center" style="max-width: 400px;">
         <h2 class="text-h4">City Weather App</h2>
         <h3 class="text-subtitle-2 mb-5">by Bernard Gabon</h3>
         <v-file-input v-model="csvFile" label="Upload CSV File" accept=".csv" filled @change="getWeather" @click="showSample=true" hide-details></v-file-input>
          <a v-if="showSample" href="https://drive.google.com/u/0/uc?id=11ITbYL82IRF-uhpt1erhU42xUEAosOXX&export=download" class="text-caption">Sample Cities CSV</a>
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