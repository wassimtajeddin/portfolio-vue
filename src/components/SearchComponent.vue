<template>
  <div class="search-container" :class="{ expanded: isExpanded }" @keydown.esc="clearSearch">
    <div class="search-input-wrapper">
      <button
        v-if="!isExpanded"
        @click="expandSearch"
        class="search-button"
      >
        <i class="fas fa-search"></i>
      </button>

      <template v-else>
        <i class="fas fa-search search-icon"></i>

        <input
          ref="searchInput"
          v-model="searchQuery"
          @input="handleSearch"
          @focus="showResults = true"
          @blur="handleBlur"
          @keydown.down.prevent="moveDown"
          @keydown.up.prevent="moveUp"
          @keydown.enter.prevent="selectActive"
          type="text"
          placeholder="Search projects, skills..."
          class="search-input"
        />
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="clear-btn"
        >
          ×
        </button>
      </template>
    </div>

    <div v-if="showResults && searchQuery" class="search-results">
      <div v-if="results.length === 0" class="no-results">
        No results found for "{{ searchQuery }}"
      </div>

      <div
        v-for="(result, index) in results"
        :key="result.id"
        @mousedown="navigateToResult(result)"
        class="search-result-item"
        :class="{ active: index === activeIndex }"
      >
        <div class="result-type">{{ result.type }}</div>
        <div class="result-title">{{ result.title }}</div>
        <div class="result-description">{{ result.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const showResults = ref(false)
const isExpanded = ref(false)
const searchInput = ref(null)
const activeIndex = ref(-1)

const expandSearch = async () => {
  isExpanded.value = true
  await nextTick()
  searchInput.value?.focus()
}

const handleBlur = () => {
  setTimeout(() => {
    if (!searchQuery.value) {
      isExpanded.value = false
      showResults.value = false
    }
  }, 150)
}

const clearSearch = () => {
  searchQuery.value = ''
  showResults.value = false
  isExpanded.value = false
  activeIndex.value = -1
}

const searchData = [
  { id: 1, type: 'Project', title: 'Portfolio Vue App', description: 'Vue.js application with Node.js API', route: '/projects' },
  { id: 2, type: 'Project', title: 'Person Management API', description: 'Spring Boot REST API', route: '/projects' },
  { id: 3, type: 'Project', title: 'QuizHub', description: 'Trivia game application', route: '/projects' },
  { id: 4, type: 'Skill', title: 'Vue.js', description: 'Frontend framework', route: '/' },
  { id: 5, type: 'Skill', title: 'Java', description: 'Backend programming language', route: '/' },
  { id: 6, type: 'Page', title: 'Contact', description: 'Get in touch', route: '/contact' },
  { id: 7, type: 'Page', title: 'CV', description: 'Resume and experience', route: '/cv' }
]

const results = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  return searchData
    .filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    )
    .slice(0, 5)
})

const handleSearch = () => {
  showResults.value = true
  activeIndex.value = -1
}

const moveDown = () => {
  if (activeIndex.value < results.value.length - 1) activeIndex.value++
}

const moveUp = () => {
  if (activeIndex.value > 0) activeIndex.value--
}

const selectActive = () => {
  if (results.value[activeIndex.value]) {
    navigateToResult(results.value[activeIndex.value])
  }
}

const navigateToResult = (result) => {
  router.push(result.route)
  clearSearch()
}
</script>

<style scoped>
.search-container {
  position: relative;
  right: 3rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid var(--accent-color);
  background: var(--secondary-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: visible;
}

.search-container.expanded {
  width: 300px;
  border-radius: 25px;
}

.search-container.expanded:focus-within {
  box-shadow: 0 0 0 5px rgba(0, 212, 170, 0.1);
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.search-button {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.search-button i {
  font-size: 1.5rem;
  color: var(--accent-color);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  opacity: 0.6;
}

.search-input {
  width: 100%;
  height: 100%;
  padding: 0 2.5rem 0 2.5rem;
  background: transparent;
  color: var(--text-color);
  border: none;
  outline: none;
  box-sizing: border-box;
  border-radius: 25px;
}

.clear-btn {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--secondary-color);
  border: 1px solid rgba(0, 212, 170, 0.2);
  border-radius: 8px;
  margin-top: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.search-result-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 212, 170, 0.1);
}

.search-result-item:hover,
.search-result-item.active {
  background: rgba(0, 212, 170, 0.1);
}

.result-type {
  font-size: 0.75rem;
  color: var(--accent-color);
  font-weight: 600;
}

.result-title {
  font-weight: 600;
  color: var(--text-color);
}

.result-description {
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.8;
}

.no-results {
  padding: 1rem;
  opacity: 0.7;
}
</style>