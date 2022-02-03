<template>
  <ul :class="prefix">
    <li v-for="(link, index) in links" 
        :key="prefix + index">
        <NuxtLink :to="link.href">{{ link.title }}</NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['links', 'prefix']
}
</script>
