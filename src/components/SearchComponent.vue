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
  { id: 1, type: 'Project', title: 'Portfolio Vue App', route: '/projects' },
  { id: 2, type: 'Project', title: 'Person Management API', route: '/projects' },
  { id: 3, type: 'Skill', title: 'Vue.js', route: '/' },
  { id: 4, type: 'Skill', title: 'Java', route: '/' },
  { id: 5, type: 'Page', title: 'Contact', route: '/contact' }
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
</style>