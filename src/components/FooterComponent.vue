<template>
  <footer>
    <div class="footer-content">
      <p>&copy; 2025 Wassim Tajeddin. All rights reserved.</p>
      <div class="social-links">
        <a href="https://www.linkedin.com/in/wassim-tajeddin-82a563201/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
        <a href="https://github.com/wassimtajeddin/wassimtajeddin" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
<style scoped>

footer {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--dark-bg);
  color: var(--text-color);
  border-top: 1px solid rgba(0, 212, 170, 0.3);
  position: relative;
  overflow: hidden;
}

footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 212, 170, 0.05), transparent);
  pointer-events: none;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.social-links {
 margin-top: 1.5rem;
  display: flex;
  gap: 1.5rem;
}

.social-links a {
  color: #ccc;
  font-size: 1.8rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .social-links a {
  background: rgba(0, 0, 0, 0.05);
  color: #666;
}

.social-links a:hover {
  color: var(--accent-color);
  transform: translateY(-5px);
  background: rgba(0, 212, 170, 0.1);
}

</style>