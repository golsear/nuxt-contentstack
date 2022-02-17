<template>
  <div class="page">
    <page-banner :url="page.banner.url"/>
    <div class="container">
      <div class="row">
        <div class="col-12 py-5">
          <h1 class="page__title">{{ page.title }}</h1>
          <div class="page__introduction" v-html="page.introduction"></div>
          <div class="page__body" v-html="page.body"></div>
          <NasaApod />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stack from "../Utils/contentstack";
import * as contentstack from "contentstack";

export default {
  name: 'MicroservicePage',
  async asyncData({ route, app }) {
    const stack = contentstack.Stack({
      api_key: app.$config.CONTENTSTACK_API_KEY,
      delivery_token: app.$config.CONTENTSTACK_DELIVERY_TOKEN,
      environment: app.$config.CONTENTSTACK_ENVIRONMENT,
      region: app.$config.CONTENTSTACK_REGION,
    });
    const pageData = await Stack.getEntryByUrl({
      stack: stack,
      contentTypeUid: 'page',
      entryUrl: `${route.fullPath}`,
      jsonRtePath: ['body'],
    })

    return {
      page: pageData[0]
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
