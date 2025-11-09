<template>
  <main>
    <section id="cv" v-intersect>
      <h2>Curriculum Vitae</h2>
      
      <div class="cv-section">
        <h3>Profile</h3>
        <p>Junior software developer skilled in Java and Python, with experience in AI and machine learning. Passionate about new technologies and continuous learning.</p>
      </div>

      <div class="cv-section">
        <h3>Experience</h3>
        <div class="cv-item">
          <h4>Android Developer (Internship) — Junico AB, Stockholm</h4>
          <div class="date">Nov 2023 - May 2024</div>
          <ul>
            <li>Developed an Android application using Jetpack Compose and Kotlin</li>
            <li>Implemented Room Database to enable offline functionality</li>
            <li>Collaborated in a Scrum team with daily stand-ups and sprint reviews</li>
          </ul>
        </div>
        <div class="cv-item">
          <h4>Courier, Service Center Associate & Team Leader — PostNord AB, Gothenburg</h4>
          <div class="date">Jun 2018 - Feb 2024</div>
          <ul>
            <li>Served as Acting Department Manager, overseeing daily operations and team performance</li>
            <li>Managed customer service and logistics processes to ensure efficiency</li>
          </ul>
        </div>
      </div>

            <div class="cv-section">
        <h3>Education</h3>
        <div class="cv-item">
          <h4>Java Developer — IT-högskolan, Gothenburg</h4>
          <div class="date">Sep 2022 - May 2024</div>
          <ul>
            <li>Degree Project: Fullstack application with Spring Boot + Vue.js</li>
            <li>500+ hours of hands-on Java coding and agile methodologies</li>
          </ul>
        </div>
        <div class="cv-item">
          <h4>Python Programming for AI Development — IT-högskolan, Gothenburg</h4>
          <div class="date">Jan 2025 - Mar 2025</div>
          <ul>
            <li>Developed CNN model for digit recognition (98% accuracy)</li>
            <li>Utilized TensorFlow and hyperparameter optimization</li>
          </ul>
        </div>

        <div class="cv-item">
          <h4>Cloud Development with AWS — IT-högskolan, Gothenburg</h4>
          <div class="date">Oct 2025 - Present</div>
          <ul>
            <li>Learning AWS services, cloud deployment, and serverless architecture</li>
          </ul>
        </div>

        <div class="cv-item">
          <h4>Architecture and System Design — IT-högskolan, Gothenburg</h4>
          <div class="date">Nov 2025 - Present</div>
          <ul>
            <li>Studying scalable system architecture, design patterns, and best practices</li>
          </ul>
        </div>

        <div class="cv-item">
          <h4>Physics — Aleppo University</h4>
          <div class="date">Sep 2011 - Jun 2015</div>
          <ul>
            <li>Advanced mathematics and analytical problem-solving</li>
          </ul>
        </div>
      </div>

      <div class="cv-section">
        <h3>Skills</h3>
        <div class="skills-list">
          <div class="tech-tags">
            <span>Java</span>
            <span>Python</span>
            <span>Kotlin</span>
            <span>Vue.js</span>
            <span>JavaScript</span>
            <span>HTML5</span>
            <span>CSS</span>
            <span>Node.js</span>
            <span>Docker</span>
            <span>Git</span>
            <span>SQL</span>
            <span>MongoDB</span>
            <span>Docker</span>
            <span>Azure</span>
            <span>Agile (Scrum)</span>
            <span>CI/CD</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'CvView'
}
</script>
<style scoped>

.cv-section {
  background: var(--secondary-color);
  padding: 2.5rem;
  border-radius: 15px;
  margin-bottom: 2.5rem;
  box-shadow: var(--card-shadow);
  border: 1px solid #333;
  transition: var(--transition);
}

[data-theme="light"] .cv-section {
  border: 1px solid #e0e0e0;
}

.cv-section:hover {
  box-shadow: var(--card-hover-shadow);
  border-color: rgba(0, 212, 170, 0.2);
}

[data-theme="light"] .cv-section:hover {
  border-color: rgba(0, 122, 99, 0.2);
}

.cv-section h3 {
  color: var(--accent-color);
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.8rem;
  font-size: 1.5rem;
}

[data-theme="light"] .cv-section h3 {
  border-bottom: 1px solid #e0e0e0;
}

.cv-item {
  margin-bottom: 2rem;
  position: relative;
  padding-left: 2rem;
}

.cv-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  height: 10px;
  width: 10px;
  border: 2px solid var(--accent-color);
  border-radius: 50%;
}

.cv-item:last-child {
  margin-bottom: 0;
}

.cv-item h4 {
  color: #f0f0f0;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

[data-theme="light"] .cv-item h4 {
  color: #333;
}

.cv-item .date {
  color: var(--accent-color);
  font-style: italic;
  margin-bottom: 0.8rem;
  font-weight: 500;
}

</style>