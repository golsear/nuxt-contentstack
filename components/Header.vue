<template>
  <header class="header">
    <div class="header__logo"><img :src="logo.url + '?format=pjpg&width=100'" /></div>
    <div class="header__nav">
      <Nav :links="menu" :prefix="'header-menu'"></Nav>
    </div>
  </header>
</template>

<script>
import Stack from "../Utils/contentstack";

export default {
  name: 'Header',
  data() {
      return {
        menu: [],
        logo: {}
      }
    },
  async fetch() {
    const resp = await Stack.getEntryByUid({
          contentTypeUid: 'header',
          entryUid: 'blt752c1ed95d3d1900',
          fields: ['header_menu', 'logo']
        });
    
    this.menu = resp[0].header_menu;
    this.logo = resp[0].logo;
  }
}
</script>
