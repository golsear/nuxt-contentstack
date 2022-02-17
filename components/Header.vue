<template>
  <header class="header">
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="container">
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
              :prefix="'header-menu'"
              :classList="'navbar-nav'"></Nav>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Stack from "../Utils/contentstack";
import * as contentstack from "contentstack";

export default {
  name: 'Header',
  data() {
      return {
        menu: [],
        logo: {}
      }
    },
  async fetch() {
    const stack = contentstack.Stack({
      api_key: this.$config.CONTENTSTACK_API_KEY,
      delivery_token: this.$config.CONTENTSTACK_DELIVERY_TOKEN,
      environment: this.$config.CONTENTSTACK_ENVIRONMENT,
      region: this.$config.CONTENTSTACK_REGION,
    });
    const resp = await Stack.getEntryByUid({
      stack: stack,
      contentTypeUid: 'header',
      entryUid: 'blt752c1ed95d3d1900',
      fields: ['header_menu', 'logo']
    });

    this.menu = resp[0].header_menu.links;
    this.logo = resp[0].logo;
  }
}
</script>
