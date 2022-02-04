<template>
  <div :class="[prefix, 'navbar-nav']">
    <NuxtLink v-for="(link, index) in links" 
              :key="prefix + index" 
              :to="link.href" 
              class="nav-link">{{ link.title }}</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['links', 'prefix']
}
</script>
