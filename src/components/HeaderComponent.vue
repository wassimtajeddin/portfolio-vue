<template>
  <header>
    <ThemeToggle />
    <div class="header-container">
      <h1>Wassim Tajeddin</h1>
      <img src="../assets/ProfilePicture.png" alt="Photo of Wassim Tajeddin" class="profile-pic">
      <nav>
        <router-link to="/" :class="{ active: $route.path === '/' }">Home</router-link>
        <router-link to="/cv" :class="{ active: $route.path === '/cv' }">CV</router-link>
        <router-link to="/projects" :class="{ active: $route.path === '/projects' }">Projects</router-link>
        <router-link to="/contact" :class="{ active: $route.path === '/contact' }">Contact</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import ThemeToggle from '@/components/ThemeToggleComponent.vue'
export default {
   components: {
    ThemeToggle
  },
  name: 'HeaderComponent'
}
</script>
<style scoped>

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

</style>