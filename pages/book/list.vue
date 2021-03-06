<template>
  <div class="page">
    <page-banner :url="page.banner.url"/>
    <div class="container">
      <div class="row">
        <div class="col-12 py-5">
          <h1 class="page__title mb-3">{{ page.title }}</h1>
          <div class="page__introduction" v-html="page.introduction"></div>
          <div class="page__body" v-html="page.body"></div>
          <template v-if="books.length">
            <BookList :books="books"/>
          </template>
          <template v-else>
            Books are not found
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stack from "../../Utils/contentstack";
import { mapGetters } from 'vuex';
import * as contentstack from "contentstack";

export default {
  name: 'BookListPage',
  async asyncData({ store, route, app }) {
    const stack = contentstack.Stack({
      api_key: app.$config.CONTENTSTACK_API_KEY,
      delivery_token: app.$config.CONTENTSTACK_DELIVERY_TOKEN,
      environment: app.$config.CONTENTSTACK_ENVIRONMENT,
      region: app.$config.CONTENTSTACK_REGION,
    });
    const [books, pageData] = await Promise.all([
      store.dispatch('setBooks').then(() => {
        return store.getters.getBooks;
      }),
      Stack.getEntryByUrl({
        stack: stack,
        contentTypeUid: 'page',
        entryUrl: `${route.fullPath}`,
        jsonRtePath: ['body'],
      })
    ]);

    return {
      books,
      page: pageData[0]
    }
  },
  computed: {
    ...mapGetters({
      storedBooks: 'getBooks'
    })
  },
  watch: {
    storedBooks(books) {
      this.books = books;
    }
  },
  head(data) {
    return {
      title: data.page.title,
      meta: [
        {
          title: data.page.title,
          name: data.page.seo.title,
          description: data.page.seo.description,
          keywords: data.page.seo.keywords,
        },
      ],
    }
  },
}
</script>
