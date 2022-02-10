<template>
  <nav aria-label="Book list pagination" class="mt-5">
    <ul class="pagination pagination-sm">
      <li :class="[{ disabled: currentPage == 1 }, 'page-item']">
        <a class="page-link" 
           href="#" 
           aria-label="Previous"
           @click.prevent="showPage(currentPage - 1)">
          Previous
        </a>
      </li>
      <template v-for="page in pages">
        <li :key="'page' + page"
            :class="[{ active: currentPage == page }, 'page-item']">
          <a href="#" 
            @click.prevent="showPage(page)" 
            :class="[{ active: currentPage == page }, 'page-link']">
            {{ page }}
          </a>
        </li>
      </template>
      <li :class="[{ disabled: currentPage == pages }, 'page-item']">
        <a class="page-link" 
           href="#" 
           aria-label="Next"
           @click.prevent="showPage(currentPage + 1)">
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  computed: {
    ...mapGetters({
      total: 'getTotal',
      limit: 'getLimit',
      currentPage: 'getCurrentPage'
    }),
    pages: function () {
      return Math.ceil(this.total/this.limit);
    }
  },
  methods: {
    ...mapActions([
      'setBooks',
      'setCurrentPage'
    ]),
    async showPage (page) {
      await this.setCurrentPage(page)
      .then(()=>{
        this.setBooks();
      });
    },
  }
}
</script>
