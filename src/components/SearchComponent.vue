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
  // Projects
  { id: 1, type: 'Project', title: 'Portfolio Vue App', description: 'Vue.js application with Node.js API', route: '/projects' },
  { id: 2, type: 'Project', title: 'Person Management API', description: 'Spring Boot REST API', route: '/projects' },
  { id: 3, type: 'Project', title: 'QuizHub', description: 'Trivia game application', route: '/projects' },
  { id: 4, type: 'Project', title: 'MNIST Sifferigenkänning', description: 'Machine learning digit recognition', route: '/projects' },
  
  // Backend Skills
  { id: 5, type: 'Skill', title: 'Java', description: 'Backend programming language', route: '/' },
  { id: 6, type: 'Skill', title: 'Spring Boot', description: 'Java framework for building applications', route: '/' },
  { id: 7, type: 'Skill', title: 'Python', description: 'Programming language for development and ML', route: '/' },
  { id: 8, type: 'Skill', title: 'Node.js', description: 'JavaScript runtime environment', route: '/' },
  
  // Frontend Skills
  { id: 9, type: 'Skill', title: 'Vue.js', description: 'Frontend framework', route: '/' },
  { id: 10, type: 'Skill', title: 'JavaScript', description: 'Programming language for web development', route: '/' },
  { id: 11, type: 'Skill', title: 'HTML/CSS', description: 'Web markup and styling languages', route: '/' },
  
  // Database Skills
  { id: 12, type: 'Skill', title: 'MySQL', description: 'Relational database management system', route: '/' },
  { id: 13, type: 'Skill', title: 'SQLite', description: 'Lightweight database engine', route: '/' },
  { id: 14, type: 'Skill', title: 'MongoDB', description: 'NoSQL document database', route: '/' },
  
  // DevOps Skills
  { id: 15, type: 'Skill', title: 'Docker', description: 'Containerization platform', route: '/' },
  { id: 16, type: 'Skill', title: 'Azure', description: 'Microsoft cloud platform', route: '/' },
  
  // Cloud Skills
  { id: 17, type: 'Skill', title: 'AWS', description: 'Amazon cloud services', route: '/' },
  
  // Methodologies
  { id: 18, type: 'Skill', title: 'Agile (Scrum)', description: 'Software development methodology', route: '/' },
  { id: 19, type: 'Skill', title: 'CI/CD', description: 'Continuous integration and deployment', route: '/' },
  { id: 20, type: 'Skill', title: 'TDD', description: 'Test-driven development', route: '/' },
  
  // AI/ML Skills
  { id: 21, type: 'Skill', title: 'TensorFlow', description: 'Machine learning framework', route: '/' },
  { id: 22, type: 'Skill', title: 'ML Models', description: 'Machine learning model development', route: '/' },
  
  // Additional Tech
  { id: 23, type: 'Skill', title: 'JPA/Hibernate', description: 'Java persistence framework', route: '/' },
  { id: 24, type: 'Skill', title: 'CNN model', description: 'Convolutional neural networks', route: '/' },
  { id: 25, type: 'Skill', title: 'TensorFlow/Keras', description: 'Deep learning frameworks', route: '/' },
  { id: 26, type: 'Skill', title: 'GitHub Actions', description: 'CI/CD automation platform', route: '/' },
  
  // Pages
  { id: 27, type: 'Page', title: 'Contact', description: 'Get in touch', route: '/contact' },
  { id: 28, type: 'Page', title: 'CV', description: 'Resume and experience', route: '/cv' },
  { id: 29, type: 'Page', title: 'Home', description: 'Main landing page', route: '/' },
  { id: 30, type: 'Page', title: 'Projects', description: 'Portfolio of work', route: '/projects' }
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
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  color: var(--text-color);
}

.search-results {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: var(--secondary-color);
  border-radius: 8px;
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
  background: rgba(0, 212, 170, 0.15);
}

.result-type {
  font-size: 0.75rem;
  color: var(--accent-color);
  font-weight: 600;
}

.result-title {
  font-weight: 600;
}

.result-description {
  font-size: 0.85rem;
  opacity: 0.8;
}

.no-results {
  padding: 1rem;
  opacity: 0.7;
}

@media (max-width: 480px) {
  .search-container.expanded {
    width: 90%;
  }  
}

</style>