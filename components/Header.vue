<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img :src="logo.url + '?format=pjpg&width=50'" />
        </a>
        <button class="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNavAltMarkup" 
                aria-controls="navbarNavAltMarkup" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" 
             id="navbarNavAltMarkup">
          <Nav :links="menu" 
               :prefix="'header-menu'"></Nav>
        </div>
      </div>
    </nav>
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
