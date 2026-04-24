<template>
  <main>
    <section id="contact" v-intersect>
      <h2>Contact Me</h2>
      
      <div class="contact-container">

        <!-- Skeleton shown while page loads -->
        <template v-if="pageLoading">
          <div class="contact-info">
            <Skeleton height="1.5rem" width="50%" style="margin-bottom:2rem" />
            <Skeleton height="1rem" v-for="n in 4" :key="n" style="margin-bottom:1.8rem" />
          </div>
          <div class="contact-form">
            <Skeleton height="1.5rem" width="40%" style="margin-bottom:2rem" />
            <Skeleton height="3rem" style="margin-bottom:1.8rem" />
            <Skeleton height="3rem" style="margin-bottom:1.8rem" />
            <Skeleton height="8rem" style="margin-bottom:1.8rem" />
            <Skeleton height="3rem" width="150px" border-radius="50px" />
          </div>
        </template>

        <!-- Actual content -->
        <template v-else>
        <div class="contact-info">
          <h3>Get in Touch</h3>
          <div class="contact-detail" @click="copyEmail" style="cursor:pointer">
            <i class="fas fa-envelope"></i>
            <span>wassim.tajeddin@gmail.com</span>
          </div>
          <div class="contact-detail" @click="copyPhone" style="cursor:pointer">
            <i class="fas fa-phone"></i>
            <span>+46 736 842 961</span>
          </div>
          <div class="contact-detail" @click="openMaps" style="cursor:pointer">
            <i class="fas fa-map-marker-alt"></i>
            <span>Malmö, Sweden</span>
          </div>
          <div class="contact-detail">
            <i class="fas fa-clock"></i>
            <span>Response within 24 hours</span>
          </div>
          <SocialLinksComponent />
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
              <textarea id="message" v-model="formData.message" rows="5" required maxlength="500"></textarea>
              <span class="char-counter" :class="{ warning: formData.message.length > 450 }">
                {{ formData.message.length }}/500
              </span>
            </div>
            <button type="submit" class="submit-btn" :disabled="submitting">
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
          <div v-if="message" class="message" :class="{ success: isSuccess, error: !isSuccess }">
            {{ message }}
          </div>
        </div>
        </template>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, inject, watch, onMounted } from 'vue'
import SocialLinksComponent from '@/components/SocialLinksComponent.vue'
import Skeleton from '@/components/SkeletonComponent.vue'

// Inject global notification system from App.vue
const notification = inject('notification')

// Show skeleton for 800ms on page load
const pageLoading = ref(true)
onMounted(() => setTimeout(() => { pageLoading.value = false }, 800))

// Copy email to clipboard and show notification
const copyEmail = async () => {
  await navigator.clipboard.writeText('wassim.tajeddin@gmail.com')
  notification.value.addNotification('Email copied!', 'info')
}

// Copy phone number to clipboard and show notification
const copyPhone = async () => {
  await navigator.clipboard.writeText('+46736842961')
  notification.value.addNotification('Phone number copied!', 'info')
}

// Open location in Google Maps
const openMaps = () => {
  window.open('https://maps.google.com/?q=Malmö,Sweden', '_blank', 'noopener,noreferrer')
}

// localStorage key for saving form draft
const DRAFT_KEY = 'contact_form_draft'

// Load saved draft from localStorage or start with empty fields
const formData = reactive(
  JSON.parse(localStorage.getItem(DRAFT_KEY) || '{"name":"","email":"","message":""}')
)

// Auto-save form draft to localStorage on every change
watch(formData, (val) => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(val))
}, { deep: true })

const submitting = ref(false)
const message = ref('')
const isSuccess = ref(false)

// API endpoint switches between dev and production
const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://admin.wassimtajeddin.com/api/contact'
  : 'http://localhost:3001/api/contact'

async function handleSubmit() {
  // Basic field validation
  if (!formData.name || !formData.email || !formData.message) {
    showMessage('Please fill in all fields', false)
    return
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    showMessage('Please enter a valid email address', false)
    return
  }
  
  submitting.value = true
  message.value = ''
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const result = await response.json()
    
    if (response.ok && result.success) {
      showMessage(result.msg || 'Message sent successfully!', true)
      // Clear form and draft after successful send
      Object.assign(formData, { name: '', email: '', message: '' })
      localStorage.removeItem(DRAFT_KEY)
      launchConfetti()
    } else {
      showMessage(result.msg || 'Something went wrong. Please try again.', false)
    }
  } catch (error) {
    console.error('Request failed:', error)
    showMessage('Failed to send message.', false)
  } finally {
    submitting.value = false
  }
}

// Show a status message that auto-dismisses after 5 seconds
function showMessage(text, success) {
  message.value = text
  isSuccess.value = success
  setTimeout(() => { message.value = '' }, 5000)
}

// Launch confetti animation on successful form submission
function launchConfetti() {
  const colors = ['#00d4aa', '#00e6b8', '#ffffff', '#a0f0e0']
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-piece'
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${1 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.5}s;
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
    `
    document.body.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
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

.char-counter {
  display: block;
  text-align: right;
  font-size: 0.75rem;
  color: var(--accent-color);
  margin-top: 0.3rem;
  opacity: 0.7;
}

.char-counter.warning {
  color: #ef4444;
  opacity: 1;
  font-weight: 600;
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
.confetti-piece {
  position: fixed;
  top: 0;
  border-radius: 2px;
  z-index: 99999;
  pointer-events: none;
  animation: confettiFall linear forwards;
}

@keyframes confettiFall {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
</style>