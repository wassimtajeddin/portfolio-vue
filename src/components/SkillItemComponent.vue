<template>
  <div class="skill-item">
    <h3>{{ title }}</h3>
    <div class="tech-tags">
      <span v-for="skill in skills" :key="skill">{{ skill }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillItemComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    skills: {
      type: Array,
      required: true
    }
  }
}
</script>