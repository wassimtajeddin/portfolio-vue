<template>
  <main>
    <section id="projects" v-intersect>
      <h2>My Projects</h2>

      <!-- Skeleton loading cards shown while content loads -->
      <div v-if="loading" class="project-cards">
        <div class="project-card skeleton-card" v-for="n in 6" :key="n">
          <Skeleton height="1.5rem" width="60%" />
          <Skeleton height="1rem" style="margin-top:1rem" />
          <Skeleton height="1rem" width="80%" style="margin-top:0.5rem" />
          <div class="tech-tags" style="margin-top:1rem; display:flex; gap:0.5rem">
            <Skeleton height="1.5rem" width="60px" border-radius="20px" />
            <Skeleton height="1.5rem" width="60px" border-radius="20px" />
            <Skeleton height="1.5rem" width="60px" border-radius="20px" />
          </div>
          <Skeleton height="2rem" width="120px" border-radius="20px" style="margin-top:1.5rem" />
        </div>
      </div>

      <!-- Actual project cards -->
      <div v-else class="project-cards">
        <div class="project-card">
          <h3>Portfolio Vue App</h3>
          <p>Vue.js application integrated with Node.js API, MongoDB, and GitHub Actions for CI/CD.</p>
          <div class="tech-tags">
            <span>Vue.js</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>API</span>
            <span>GitHub Actions</span>
          </div>
          <a href="https://github.com/wassimtajeddin/portfolio-vue" class="project-link" target="_blank" rel="noopener noreferrer">View Details</a>
        </div>
        <div class="project-card">
          <h3>Person Management API (Spring Boot App)</h3>
          <p>Spring Boot REST API for managing people which Supports basic CRUD operations (Create, Read, Update, Delete)</p>
          <div class="tech-tags">
            <span>Spring Boot</span>
            <span>JPA/Hibernate</span>
            <span>MySQL</span>
            <span>CI/CD</span>
          </div>
          <a href="https://github.com/wassimtajeddin/springboot" class="project-link" target="_blank" rel="noopener noreferrer">View Details</a>
        </div>
        <div class="project-card">
          <h3>QuizHub</h3>
          <p>Quiztastic is a fun and exciting trivia game where you can challenge yourself across 6 categories.</p>
          <div class="tech-tags">
            <span>Vue.js</span>
            <span>Node.js</span>
            <span>Agile</span>
            <span>CI/CD</span>
          </div>
          <a href="https://github.com/wassimtajeddin/AgilProjekt" class="project-link" target="_blank" rel="noopener noreferrer">View Details</a>
        </div>
        <div class="project-card">
          <h3>MNIST Sifferigenkänning</h3>
          <p>machine learning project that uses a Support Vector Machine (SVM) to recognize handwritten digits (0–9) from the popular MNIST dataset of 70,000 labeled images.</p>
          <div class="tech-tags">
            <span>Python</span>
            <span>CNN model</span>
            <span>TensorFlow/Keras</span>
          </div>
          <a href="https://github.com/wassimtajeddin/SVM-MNIST-Handwritten-Digit-Classifier" class="project-link" target="_blank" rel="noopener noreferrer">View Details</a>
        </div>
        <div class="project-card">
          <h3>Country Database Management App</h3>
          <p>A Java console application to manage a SQLite database of countries</p>
          <div class="tech-tags">
            <span>Java</span>
            <span>SQLite</span>
            <span>JDBC</span>
          </div>
          <a href="https://github.com/wassimtajeddin/labb3-sqLite" class="project-link" target="_blank" rel="noopener noreferrer">View Details</a>
        </div>
        <div class="project-card">
          <h3>Product Management System</h3>
          <p>A Java command-line application for managing a list of products.</p>
          <div class="tech-tags">
            <span>Java</span>
            <span>File handling (CSV storage)</span>
          </div>
          <a href="https://github.com/wassimtajeddin/labb2" class="project-link" target="_blank" rel="noopener noreferrer">View Details</a>
        </div>
        <div class="project-card">
          <h3>JavaFX Paint Application</h3>
          <p>A JavaFX desktop application that allows users to draw on a canvas.</p>
          <div class="tech-tags">
            <span>JavaFX</span>
            <span>Unit testing with JUnit</span>
          </div>
          <a href="https://github.com/wassimtajeddin/JavaFx" class="project-link" target="_blank" rel="noopener noreferrer">View Details</a>
        </div>
      </div>
      <div class="view-all">
        <a href="https://github.com/wassimtajeddin?tab=repositories" class="btn outline" target="_blank" rel="noopener noreferrer">View All Projects</a>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Skeleton from '@/components/SkeletonComponent.vue'

// Simulate a short loading delay to show skeleton
const loading = ref(true)
onMounted(() => setTimeout(() => { loading.value = false }, 800))
</script>