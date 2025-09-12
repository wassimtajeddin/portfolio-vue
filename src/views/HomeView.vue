<template>
  <main>
    <section id="hero">
      <div class="hero-content">
        <h2>Hello World!</h2>
        <p class="tagline">I'm a passionate developer creating innovative solutions</p>
        <p>Welcome to my portfolio website.</p>
        <div class="cta-buttons">
          <router-link to="/projects" class="btn primary">View My Work</router-link>
          <router-link to="/contact" class="btn secondary">Get In Touch</router-link>
        </div>
      </div>
    </section>

    <section id="featured-skills">
      <h2>My Skills</h2>
      <div class="skills-grid">
        <SkillItem title="Backend" :skills="['Java', 'Spring Boot', 'Python', 'Node.js']" />
        <SkillItem title="Frontend" :skills="['Vue.js', 'JavaScript', 'HTML/CSS']" />
        <SkillItem title="Databases" :skills="['MySQL', 'SQLite', 'MongoDB']" />
        <SkillItem title="DevOps" :skills="['Docker', 'Azure']" />
        <SkillItem title="Methodologies" :skills="['Agile (Scrum)', 'CI/CD', 'TDD']" />
        <SkillItem title="AI/ML" :skills="['TensorFlow', 'ML Models']" />
      </div>
    </section>

    <section id="featured-projects">
      <h2>Featured Projects</h2>
      <div class="project-cards">
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
      </div>
      <div class="view-all">
        <router-link to="/projects" class="btn outline">View More Projects</router-link>
      </div>
    </section>
  </main>
</template>

<script>
import SkillItem from '@/components/SkillItemComponent.vue'

export default {
  name: 'HomeView',
  components: {
    SkillItem
  }
};
</script>