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
        ? 'https://portfolio-vue-1hg5.onrender.com/api/contact'
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
        this.showMessage('Failed to send message.', false);
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

<style scoped>

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info {
            background: var(--secondary-color);
            padding: 1.7rem;
            border-radius: 15px;
            box-shadow: var(--card-shadow);
            border: 1px solid #333;
            transition: var(--transition);
        }

        [data-theme="light"] .contact-info {
            border: 1px solid #e0e0e0;
        }

.contact-info:hover {
  box-shadow: var(--card-hover-shadow);
}

.contact-info h3 {
  color: var(--accent-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.contact-detail {
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
  transition: var(--transition);
  padding: 0.8rem;
  border-radius: 8px;
}

.contact-detail:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: translateX(5px);
}

.contact-detail i {
  font-size: 1.5rem;
  color: var(--accent-color);
  margin-right: 1.5rem;
  width: 30px;
  transition: var(--transition);
}

.contact-detail:hover i {
  transform: scale(1.2);
}

.contact-form {
            background: var(--secondary-color);
            padding: 2.5rem;
            border-radius: 15px;
            box-shadow: var(--card-shadow);
            border: 1px solid #333;
            transition: var(--transition);
        }

        [data-theme="light"] .contact-form {
            border: 1px solid #e0e0e0;
        }

.contact-form:hover {
  box-shadow: var(--card-hover-shadow);
}

.contact-form h3 {
  color: var(--accent-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.8rem;
  position: relative;
}

        .form-group label {
            display: block;
            margin-bottom: 0.8rem;
            color: #f0f0f0;
            font-weight: 500;
            transition: all 0.3s ease;
            transform-origin: left top;
        }
        [data-theme="light"] .form-group label {
            color: #333;
        }
        
        .form-group input, 
        .form-group textarea {
            width: 100%;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid #333;
            background: var(--primary-color);
            color: var(--text-color);
            font-family: 'Poppins', sans-serif;
            transition: var(--transition);
            transition: all 0.3s ease;
        }

        [data-theme="light"] .form-group input, 
        [data-theme="light"] .form-group textarea {
            border: 1px solid #e0e0e0;
        }

.form-group input:focus, 
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 5px 15px rgba(0, 212, 170, 0.2);
  transform: translateY(-2px);
}

.form-group textarea {
  min-height: 180px;
  resize: vertical;
}

.form-group input:focus + label,
.form-group textarea:focus + label,
.form-group input:not(:placeholder-shown) + label,
.form-group textarea:not(:placeholder-shown) + label {
  transform: translateY(-25px) scale(0.8);
  color: var(--accent-color);
}

.submit-btn {
  background: var(--accent-color);
  color: black;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.submit-btn:hover::before {
  transform: translateX(0);
}

.submit-btn:hover {
  background: #00e6b8;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 212, 170, 0.4);
}

.contact-detail span {
  word-break: break-word;
}

@media (max-width: 992px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 420px) {
.contact-detail span {
 font-size: 0.9rem;
}
.contact-info {
  padding: 1rem;
}
}
@media (max-width: 370px) {
 .contact-detail span {
  font-size: 0.8rem;
}
.contact-info {
  padding: 0rem;
}
}
</style>