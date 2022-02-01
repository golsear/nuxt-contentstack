<template>
  <div class="pagination">
    Pagination component
    <button v-if="showMoreEnabled" @click="showMore">Next books</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Pagination',
  data: () => ({
    showMoreEnabled: true,
  }),
  methods: {
    ...mapActions([
      'getBooks',
      'setSkip'
    ]),

    async showMore () {
      this.setSkip();
      this.getBooks();
    },
  }
}
</script>
