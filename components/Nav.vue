<template>
  <nav :class="[prefix, classList ,'nav']">
    <template v-for="(link, index) in links">
      <NuxtLink v-if="!isExternalLink(link.href)"
                target="_self"
                :key="prefix + index"
                :to="link.href"
                class="nav-link">
        {{ link.title }}
      </NuxtLink>
      <a v-else
         :href="link.href"
         :key="prefix + index"
         target="_blank">
         {{ link.title }}
      </a>
    </template>
  </nav>
</template>

<script>
export default {
  props: ['links', 'prefix', 'classList'],
  methods: {
    isExternalLink(url) {
      if (process.client) {
        const tmpLink = document.createElement('a');
        tmpLink.href = url;
        return tmpLink.host !== window.location.host;
      }
      return url;
    }
  }
}
</script>
