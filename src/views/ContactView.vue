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
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Your Name</label>
              <input type="text" id="name" v-model="formData.name" required>
            </div>
            <div class="form-group">
              <label for="email">Your Email</label>
              <input type="email" id="email" v-model="formData.email" required>
            </div>
            <div class="form-group">
              <label for="message">Your Message</label>
              <textarea id="message" v-model="formData.message" rows="5" required></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="loading">
              {{ loading ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
          <div v-if="message" class="message" :class="{ success: isSuccess, error: !isSuccess }">
            <i :class="isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
            {{ message }}
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      },
      loading: false,
      message: '',
      isSuccess: false,
      apiUrl: process.env.NODE_ENV === 'production' 
        ? 'https://your-backend-service.onrender.com/api/contact'
        : 'http://localhost:3001/api/contact'
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.formData.name || !this.formData.email || !this.formData.message) {
        this.showMessage('Please fill in all fields', false);
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        this.showMessage('Please enter a valid email address', false);
        return;
      }
      
      this.loading = true;
      this.message = '';
      
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        });

        const result = await response.json();
        
        if (response.ok && result.success) {
          this.showMessage(result.msg || 'Message sent successfully!', true);
          this.formData = { name: '', email: '', message: '' };
        } else {
          this.showMessage(result.msg || 'Something went wrong. Please try again.', false);
        }
      } catch (error) {
        console.error('Request failed:', error);
        this.showMessage('Failed to send message. Please check your connection and try again.', false);
      } finally {
        this.loading = false;
      }
    },
    
    showMessage(text, isSuccess) {
      this.message = text;
      this.isSuccess = isSuccess;
      
      setTimeout(() => {
        this.message = '';
      }, 5000);
    }
  }
}
</script>