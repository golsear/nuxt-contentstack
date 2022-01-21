<template>
  <div class="book-list">
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
    <Pagination/>
  </div>
</template>

<script>
export default {
  name: 'BookList'
}
</script>
