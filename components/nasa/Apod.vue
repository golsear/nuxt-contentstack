<template>
  <div class="apod">
    {{ apodData.date }}
    {{ apodData.copyright }}
    {{ apodData.title }}
    <img :src="apodData.url"/>
    <div v-html="apodData.explanation"></div>
    {{apodData}}
  </div>
</template>

<script>
import NasaService from "../../microservices/nasaService";

export default {
  name: 'Apod',
  data() {
    return {
      apodData: []
    }
  },
  async fetch() {
    const NASA_API_KEY = process.env.NASA_API_KEY;    
    const nasaService = new NasaService(NASA_API_KEY);
    this.apodData = await nasaService.apod('2022-02-14');
    console.log('>>>', apodData);

    return {
      apodData
    }
  },
}
</script>
