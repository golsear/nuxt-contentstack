<template>
  <div class="container">
      <div class="row">
        <div class="col-12 py-5">
          <Book :book="book"/>
        </div>
      </div>
    </div>
</template>

<script>
import Stack from "../../Utils/contentstack";
import { convertBookObj } from "../../Utils/helpers";
import * as contentstack from "contentstack";

export default {
  async asyncData({ route, app }) {
    let book = {};
    const stack = contentstack.Stack({
      api_key: app.$config.CONTENTSTACK_API_KEY,
      delivery_token: app.$config.CONTENTSTACK_DELIVERY_TOKEN,
      environment: app.$config.CONTENTSTACK_ENVIRONMENT,
      region: app.$config.CONTENTSTACK_REGION,
    });

    try {
        const resp = await Stack.getEntryByUid({
          stack: stack,
          contentTypeUid: 'book',
          entryUid: route.params.id,
          referenceFieldPath: [`authors`],
          jsonRtePath: ['description'],
          fields: ['image', 'book_title', 'authors', 'description', 'number_of_pages', 'link', 'seo']
        });
        const respObj = resp[0];

        book = convertBookObj(respObj, 'contentDeliveryAPI');
    } catch (err) {
        console.error('Something was wrong: ', err);
    }

    return {
      book
    }
  },
  head(data) {
    return {
      title: data.book.title,
      meta: [
        {
          title: data.book.title,
          name: data.book.seo.title,
          description: data.book.seo.description,
          keywords: data.book.seo.keywords,
        },
      ],
    }
  },
}
</script>
