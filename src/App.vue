<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
    <FooterComponent />
    <button 
      v-show="showScrollTop" 
      @click="scrollToTop" @touchstart="scrollToTop"
      class="scroll-to-top"
      :class="{ visible: showScrollTop }"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
</template>

<script>
import "@/assets/style.css";
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  data() {
    return {
      showScrollTop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showScrollTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--accent-color);
  color: black;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.scroll-to-top.visible {
  opacity: 1;
  transform: translateY(0);
}

.scroll-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 212, 170, 0.4);
}
</style>
