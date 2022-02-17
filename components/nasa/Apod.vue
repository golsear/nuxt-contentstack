<template>
  <div class="apod">
    <client-only>
      <label for="apod-date" class="form-label">Select date</label>
      <date-picker class="mb-3"
                   id="apod-date"
                   placeholder="YYYY-MMM-DD"
                   format="dd MMM yyyy"
                   :disabled-dates="disabledDates"
                   v-model="date" />
    </client-only>
    <template v-if="apodPicture">
      <h2 class="apod__title mb-3">Astronomy Picture of the Day</h2>
      <div class="apod__date fw-bold">{{ $moment(apodPicture.date).format('DD MMM YYYY') }}</div>
      <h3 class="apod__picture-title display-6 mb-3">{{ apodPicture.title }}</h3>
      <div class="apod__picture-container position-relative">
        <template v-if="apodPicture.media_type == 'image'">
          <picture class="apod__picture">
            <img :src="apodPicture.url"/>
          </picture>
        </template>
        <template v-else>
          <div class="ratio ratio-16x9">
            <iframe :src="apodPicture.url"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
            </iframe>
          </div>
        </template>
        <div v-if="preloader" class="position-absolute top-50 start-50 translate-middle">
          <div class="apod__picture-spinner spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div v-if="apodPicture.copyright"
          class="apod__copyright">&copy; <em>{{ apodPicture.copyright }}</em></div>
      <div class="apod__explanation mt-3" v-html="apodPicture.explanation"></div>
    </template>
    <template v-else>
      <div>No picture has been found</div>
    </template>
  </div>
</template>

<script>
import NasaService from "../../microservices/nasaService";

export default {
  name: 'Apod',
  data() {
    return {
      apodPicture: [],
      date: this.$moment().format('YYYY-MM-DD'),
      nasaApiKey: process.env.NASA_API_KEY,
      preloader: false
    }
  },
  computed: {
    nasaService: function () {
      return new NasaService(this.nasaApiKey);
    },
    disabledDates: function () {
      return {
        from: this.$moment().toDate()
      }
    }
  },
  watch: {
    date: async function (newDate) {
      const formattedDate = this.$moment(newDate).format('YYYY-MM-DD');

      try {
        this.apodPicture = await this.getApodPicture(formattedDate);
        this.preloader = false;
      }
      catch (e) {
        this.apodPicture = [];
      }
    }
  },
  async fetch() {
    this.apodPicture = await this.getApodPicture(this.date);
    this.preloader = false;
  },
  methods: {
    getApodPicture: async function (date) {
        this.preloader = true;
        return await this.nasaService.getApodPicture(date);
    }
  }
}
</script>
