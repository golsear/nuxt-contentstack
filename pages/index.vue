<template>
  <div class="page">
    <page-banner :url="page.banner.url"/>
    <div class="container">
      <div class="row">
        <div class="col-12 py-5">
          <h1 class="page__title">{{ page.title }}</h1>
          <div class="page__introduction" v-html="page.introduction"></div>
          <div class="page__body" v-html="page.body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageBanner from '../components/PageBanner.vue';
import Stack from "../Utils/contentstack";

export default {
  components: { PageBanner },
  name: 'IndexPage',
  async asyncData({ route  }) {
    const pageData = await Stack.getEntryByUrl({
      contentTypeUid: 'home_page',
      entryUrl: `${route.fullPath}`,
      jsonRtePath: ['body'],
    });
    const page = pageData[0];
    
    return {
      page
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
