<template>
  <main>
    <section id="contact" v-intersect>
      <h2>Contact Me</h2>
      
      <div class="contact-container">
        <div class="contact-info">
          <h3>Get in Touch</h3>
          <div class="contact-detail">
            <i class="fas fa-envelope"></i>
            <span>wassim.tajeddin@gmail.com</span>
          </div>
          <div class="contact-detail">
            <i class="fas fa-phone"></i>
            <span>+46 736 842 961</span>
          </div>
          <div class="contact-detail">
            <i class="fas fa-map-marker-alt"></i>
            <span>Malmö, Sweden</span>
          </div>
          <div class="contact-detail">
            <i class="fas fa-clock"></i>
            <span>Response within 24 hours</span>
          </div>
        </div>
        
        <div class="contact-form">
          <h3>Send a Message</h3>
          <form id="contactForm">
            <div class="form-group">
              <label for="name">Your Name</label>
              <input type="text" id="name" required>
            </div>
            <div class="form-group">
              <label for="email">Your Email</label>
              <input type="email" id="email" required>
            </div>
            <div class="form-group">
              <label for="message">Your Message</label>
              <textarea id="message" required></textarea>
            </div>
            <button type="submit" class="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ContactView'
}
</script>