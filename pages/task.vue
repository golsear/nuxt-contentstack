<template>
  <div class="page">
    <div class="page__banner">
      <img src=""/>
    </div>
    <h1 class="page__title">{{ page.title }}</h1>
    <div class="page__introduction" v-html="page.introduction"></div>
    <div class="page__body" v-html="page.body"></div>
  </div>
</template>

<script>
import Stack from "../Utils/contentstack";

export default {
  name: 'TaskPage',
  async asyncData({ route }) {
    const pageData = await Stack.getEntryByUrl({
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
