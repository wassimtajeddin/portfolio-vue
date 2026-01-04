<template>
  <div id="app">
    <LoadingSpinner />
    <ScrollProgress />
    <HeaderComponent />
    <router-view />
    <FooterComponent />
    <BackToTop />
    <NotificationComponent ref="notification" />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import "@/assets/style.css"
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import LoadingSpinner from './components/LoadingSpinnerComponent.vue'
import ScrollProgress from './components/ScrollProgressComponent.vue'
import BackToTop from './components/BackToTopComponent.vue'
import NotificationComponent from './components/NotificationComponent.vue'

const notification = ref(null)

provide('notification', notification)
</script>

<style scoped>
</style>
