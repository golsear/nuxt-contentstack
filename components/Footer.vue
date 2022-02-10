<template>
  <footer class="footer p-3 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="footer__text mb-3 fw-bold fs-6">{{ footerText }}</div>
          <Nav :links="footerMenu" 
              :prefix="'footer__menu'"
              :classList="'flex-column'"></Nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Stack from "../Utils/contentstack";

export default {
  name: 'Footer',
  data() {
      return {
        footerText: '',
        footerMenu: []
      }
    },
  async fetch() {
    const resp = await Stack.getEntryByUid({
          contentTypeUid: 'footer',
          entryUid: 'bltc7f7fb6097ffc67f',
          fields: ['footer_text', 'footer_menu']
        });
    
    this.footerText = resp[0].footer_text;
    this.footerMenu = resp[0].footer_menu.links;
  }
}
</script>
