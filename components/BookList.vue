<!-- Please remove this file from your project -->
<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    Book list component
    <NuxtLink :to="{ path: 'book/' + 1 }">
      Book landing page
    </NuxtLink>
    <NuxtLink :to="{ path: 'book/' + 2 }">
      Book landing page
    </NuxtLink>
    <NuxtLink :to="{ path: 'book/' + 3 }">
      Book landing page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'BookList'
}
</script>
