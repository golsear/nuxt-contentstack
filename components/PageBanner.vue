<template>
  <picture class="page__banner">
      <source media="(min-width:1200px)" :srcset="url + '?format=pjpg&width=1600'" type="image/jpeg">
      <source media="(min-width:992px)" :srcset="url + '?format=pjpg&width=1200'" type="image/jpeg">
      <source media="(min-width:768px)" :srcset="url + '?format=pjpg&width=992'" type="image/jpeg">
      <source media="(min-width:576px)" :srcset="url + '?format=pjpg&width=768'" type="image/jpeg">
      <img :src="url + '?format=pjpg&width=1600'"/>
    </picture>
</template>

<script>
export default {
  name: 'PageBanner',
  props: ['url']
}
</script>
