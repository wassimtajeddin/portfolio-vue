<template>
  <main>
    <section id="hero" v-intersect>
      <div class="hero-content">
        <h2>Hello World!</h2>
        <p class="tagline">I'm a <span class="typing-text" ref="typingText"></span><span class="cursor">|</span></p>
        <p>Welcome to my portfolio website.</p>
        <div class="cta-buttons">
          <router-link to="/projects" class="btn primary">View My Work</router-link>
          <router-link to="/contact" class="btn secondary">Get In Touch</router-link>
        </div>
      </div>
    </section>

    <section id="featured-skills" v-intersect>
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

    <section id="featured-projects" v-intersect>
      <h2>Featured Projects</h2>
      <div class="project-cards">
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
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      const texts = [
        'Java developer', 
        'motivated software developer',
        'problem solver',
        'full-stack developer',
        'curious mind',
        'cloud developer'
      ];
      const element = this.$refs.typingText;
      
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingSpeed = 100;
      
      const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
          element.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 50;
        } else {
          element.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, typingSpeed);
        }
      };
      
      type();
    }
  }
};
</script>
<style scoped>

#hero {
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(to bottom, var(--primary-color), var(--light-bg));
  border-radius: 15px;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
}

#hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(0, 212, 170, 0.1), transparent 70%);
  pointer-events: none;
}

#hero h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
  font-weight: 700;
}

.tagline {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  min-height: 2rem;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.typing-text {
  color: var(--accent-color);
  font-weight: 600;
  margin-left: 0.5rem;
}

.cursor {
  color: var(--accent-color);
  font-weight: 600;
  animation: blink 1s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% { 
    opacity: 1; 
  }
  51%, 100% { 
    opacity: 0; 
  }
}

@media (max-width: 768px) {
  #hero h2 {
    font-size: 2.2rem;
  }
  
  .tagline {
    font-size: 1.2rem;
    gap: 0.5rem;
  }
  
  .typing-text {
    margin-left: 0;
  }
}

@media (max-width: 480px) {

  #hero {
    padding: 2.5rem 1rem;
  }

  #hero h2 {
    font-size: 1.8rem;
  }
  
  .tagline {
    font-size: 1.1rem;
  }
}

</style>