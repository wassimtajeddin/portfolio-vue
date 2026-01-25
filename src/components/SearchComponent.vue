<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <i class="fas fa-search search-icon"></i>
      <input 
        v-model="searchQuery"
        @input="handleSearch"
        @focus="showResults = true"
        type="text" 
        placeholder="Search projects, skills..."
        class="search-input"
      >
      <button v-if="searchQuery" @click="clearSearch" class="clear-btn">×</button>
    </div>
    
    <div v-if="showResults && searchQuery" class="search-results">
      <div v-if="results.length === 0" class="no-results">
        No results found for "{{ searchQuery }}"
      </div>
      <div v-else>
        <div 
          v-for="result in results" 
          :key="result.id"
          @click="navigateToResult(result)"
          class="search-result-item"
        >
          <div class="result-type">{{ result.type }}</div>
          <div class="result-title">{{ result.title }}</div>
          <div class="result-description">{{ result.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const showResults = ref(false)

const searchData = [
  { id: 1, type: 'Project', title: 'Portfolio Vue App', description: 'Vue.js application with Node.js API', route: '/projects' },
  { id: 2, type: 'Project', title: 'Person Management API', description: 'Spring Boot REST API', route: '/projects' },
  { id: 3, type: 'Project', title: 'QuizHub', description: 'Trivia game application', route: '/projects' },
  { id: 4, type: 'Skill', title: 'Vue.js', description: 'Frontend framework', route: '/' },
  { id: 5, type: 'Skill', title: 'Java', description: 'Backend programming', route: '/' },
  { id: 6, type: 'Page', title: 'Contact', description: 'Get in touch', route: '/contact' },
  { id: 7, type: 'Page', title: 'CV', description: 'Resume and experience', route: '/cv' }
]

const results = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  return searchData.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.type.toLowerCase().includes(query)
  ).slice(0, 5)
})

const handleSearch = () => {
  showResults.value = true
}

const clearSearch = () => {
  searchQuery.value = ''
  showResults.value = false
}

const navigateToResult = (result) => {
  router.push(result.route)
  clearSearch()
}
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 300px;
  right: 3rem;
  border: 1px solid var(--accent-color);
  border-radius: 999px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-color);
  opacity: 0.6;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 0.3px solid transparent;
  border-radius: 25px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 5px rgba(0, 212, 170, 0.1);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
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

.search-result-item:hover {
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
</style>