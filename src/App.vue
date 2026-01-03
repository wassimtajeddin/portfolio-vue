<template>
  <div id="app">
    <LoadingSpinner />
    <ScrollProgress />
    <HeaderComponent />
    <router-view />
    <FooterComponent />
    <BackToTop />
  </div>
</template>

<script setup>
import "@/assets/style.css"
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import LoadingSpinner from './components/LoadingSpinnerComponent.vue'
import ScrollProgress from './components/ScrollProgressComponent.vue'
import BackToTop from './components/BackToTopComponent.vue'
</script>

<style scoped>
</style>
