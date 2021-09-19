
export default {
    name: 'CityWeather',

    props:['weather'],

    data() {
        return {
            owBaseImageUrl: 'https://openweathermap.org/img/wn/',
            dialog: {show: false, title: null, text: null}
        };
      },

    template: /*html*/ `

<v-card class="mx-auto" max-width="400" >
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
          <v-img :src="owBaseImageUrl + weather.current.weather[0].icon + '@2x.png'" :alt="weather.current.weather[0].main" width="92" ></v-img>
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
        <v-img :src="owBaseImageUrl+ daily.weather[0].icon + '.png'" :alt="daily.weather[0].main" ></v-img>
        <v-list-item-subtitle class="text-right"> {{ Math.round(daily.temp.max) }}&deg;/{{ Math.round(daily.temp.min) }}&deg; </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider v-if='!$vuetify.breakpoint.xsOnly'></v-divider>

    <v-card-actions v-if='!$vuetify.breakpoint.xsOnly'>
      <v-btn text @click="dialog.title=weather.name;dialog.text=JSON.stringify(weather);dialog.show=true"> Full Report </v-btn>
    </v-card-actions>

    <v-dialog v-model="dialog.show" fullscreen hide-overlay transition="dialog-bottom-transition" >
      <v-card>
        <v-toolbar dark color="primary" >
          <v-btn icon dark @click="dialog.show = false" > <v-icon>mdi-close</v-icon> </v-btn>
          <v-toolbar-title>{{dialog.title}} [JSON Weather Data]</v-toolbar-title> </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5">
          <code>{{dialog.text}}</code>
        </v-card-text>
      </v-card>
      </v-dialog>

  </v-card>


`,
  };
