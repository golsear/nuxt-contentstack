<template>
  <div class="book">
    <Book :book="book"/>
  </div>
</template>

<script>
import Stack from "../../Utils/contentstack";
import { convertBookObj } from "../../Utils/helpers";

export default {
  async asyncData({ route }) {
    let book = {};

    try {
        const resp = await Stack.getEntryByUid({
          contentTypeUid: 'book',
          entryUid: route.params.id,
          referenceFieldPath: [`authors`],
          jsonRtePath: ['description'],
          fields: ['image', 'book_title', 'authors', 'description', 'number_of_pages', 'link']
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
}
</script>
