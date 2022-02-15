<template>
  <div class="apod">
    <h2 class="apod__title mb-3">Astronomy Picture of the Day</h2>
    <div class="apod__date fw-bold">{{ $moment(apodData.date).format('DD MMM YYYY') }}</div>
    <h3 class="apod__picture-title display-6 mb-3">{{ apodData.title }}</h3>
    <template v-if="apodData.media_type == 'image'">
      <picture class="apod__picture">
        <img :src="apodData.url"/>
      </picture>
    </template>
    <template v-else>
      <div class="ratio ratio-16x9">
        <iframe :src="apodData.url" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
      </div>
    </template>
    
    <div v-if="apodData.copyright" 
         class="apod__copyright">&copy; <em>{{ apodData.copyright }}</em></div>
    <div class="apod__explanation mt-3" v-html="apodData.explanation"></div>
  </div>
</template>

<script>
import NasaService from "../../microservices/nasaService";

export default {
  name: 'Apod',
  data() {
    return {
      apodData: [],
      //date: this.$moment().format('YYYY-MM-DD')
      date: '2022-02-10' // video
    }
  },
  async fetch() {
    const NASA_API_KEY = process.env.NASA_API_KEY;    
    const nasaService = new NasaService(NASA_API_KEY);
    this.apodData = await nasaService.apod(this.date);
  }
}
</script>
