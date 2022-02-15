<template>
  <div class="apod">
    {{ $moment(apodData.date).format('DD-MM-YYYY') }}
    {{ apodData.copyright }}
    {{ apodData.title }}
    <img :src="apodData.url"/>
    <div v-html="apodData.explanation"></div>
  </div>
</template>

<script>
import NasaService from "../../microservices/nasaService";

export default {
  name: 'Apod',
  data() {
    return {
      apodData: [],
      date: this.$moment().format('YYYY-MM-DD')
    }
  },
  async fetch() {
    const NASA_API_KEY = process.env.NASA_API_KEY;    
    const nasaService = new NasaService(NASA_API_KEY);
    this.apodData = await nasaService.apod(this.date);
  }
}
</script>
