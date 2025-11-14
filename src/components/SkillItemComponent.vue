<template>
  <div class="skill-item">
    <h3>{{ title }}</h3>
    <div class="tech-tags">
      <span v-for="skill in skills" :key="skill">{{ skill }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  skills: {
    type: Array,
    required: true
  }
})
</script>
<style scoped>

.skill-item {
  background: var(--secondary-color);
  padding: 2.5rem 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  border: 1px solid #333;
  position: relative;
  overflow: hidden;
}

[data-theme="light"] .skill-item {
  border: 1px solid #e0e0e0;
}

.skill-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background: linear-gradient(to bottom, rgba(0, 212, 170, 0.1), transparent);
  transition: height 0.5s ease;
}

.skill-item:hover::before {
  height: 100%;
}

.skill-item:hover {
    transform: translateY(-10px);
  box-shadow: var(--card-hover-shadow);
  border-color: rgba(0, 212, 170, 0.3);
}

.skill-item i {
  font-size: 2.8rem;
  color: var(--accent-color);
  margin-bottom: 1.5rem;
  transition: var(--transition);
}

.skill-item:hover i {
  transform: scale(1.1);
}

.skill-item h3 {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  position: relative;
  z-index: 1;
}

</style>