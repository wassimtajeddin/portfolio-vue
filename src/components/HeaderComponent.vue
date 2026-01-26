<template>
  <header>
    <div class="header-container">
      <div class="header-controls">
        <SearchComponent />
        <ThemeToggle />
      </div>
      <img src="../assets/ProfilePicture.png" alt="Photo of Wassim Tajeddin" class="profile-pic">
      <h1>Wassim Tajeddin</h1>
      <SocialLinks />
      <button class="burger-menu" @click="toggleMenu" :class="{ active: isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav :class="{ open: isMenuOpen }">
        <router-link to="/" :class="{ active: $route.path === '/' }" @click="closeMenu">Home</router-link>
        <router-link to="/cv" :class="{ active: $route.path === '/cv' }" @click="closeMenu">CV</router-link>
        <router-link to="/projects" :class="{ active: $route.path === '/projects' }" @click="closeMenu">Projects</router-link>
        <router-link to="/contact" :class="{ active: $route.path === '/contact' }" @click="closeMenu">Contact</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import ThemeToggle from '@/components/ThemeToggleComponent.vue'
import SocialLinks from '@/components/SocialLinksComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>
<style scoped>
.header-controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;
}

.burger-menu {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
}

.burger-menu span {
  width: 25px;
  height: 3px;
  background: var(--accent-color);
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

.burger-menu.active span:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.burger-menu.active span:nth-child(2) {
  opacity: 0;
}

.burger-menu.active span:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 2rem;
  background: var(--dark-bg);
  color: var(--text-color);
  border-bottom: 1px solid rgba(0, 212, 170, 0.3);
  position: relative;
  overflow: hidden;
}

.header-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0, 212, 170, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

[data-theme="light"] .header-container::before {
  background: linear-gradient(45deg, rgba(0, 122, 99, 0.05) 0%, transparent 70%);
}

.profile-pic {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  object-fit: cover;
  margin: 1rem 0;
  border: 2px solid var(--accent-color);
  box-shadow: 0 0 20px rgba(0, 212, 170, 0.3);
  transition: var(--transition);
}

.profile-pic:hover {
  transform: scale(1.03);
  box-shadow: 0 0 25px rgba(0, 212, 170, 0.5);
}

header h1::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: width 0.5s ease;
}

.header-container:hover header h1::after {
  width: 100%;
}

header h1 {
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--accent-color);
  font-size: 2.2rem;
  position: relative;
  display: inline-block;
}


@media (max-width: 768px) {

  .header-container {
    padding: 1.2rem;
  }

  header h1 {
    font-size: 1.8rem;
  }

  .profile-pic {
    width: 140px;
    height: 140px;
  }

  .burger-menu {
    display: flex;
  }

  nav {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    background: var(--secondary-color);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: left 0.3s ease;
    z-index: 999;
    border-right: 1px solid var(--accent-color);
  }

  nav.open {
    left: 0;
  }

  nav a {
    font-size: 1.2rem;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 1rem;
  }

  header h1 {
    font-size: 1.3rem;
  }

  .profile-pic {
    width: 120px;
    height: 120px;
  }

  main {
    padding: 1rem;
  }
}
@media (max-width: 400px) {

  header h1 {
    font-size: 1.1rem;
  }

  .profile-pic {
    width: 100px;
    height: 100px;
  }
}

</style>