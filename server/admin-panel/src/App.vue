<template>
  <div :data-theme="theme">
    <button class="theme-toggle" @click="toggleTheme" :title="themeTitle">
      <i :class="themeIcon"></i>
    </button>

    <div class="container">
      <h1>Contact Messages Admin</h1>

      <div class="stats">
        <strong>Total Messages: {{ messages.length }}</strong> |
        <strong>Unread: {{ unreadCount }}</strong>
      </div>

      <div v-if="messages.length" id="messagesList">
        <MessageItem
          v-for="m in messages"
          :key="m._id"
          :message="m"
          @toggle-read="toggleReadStatus"
          @delete="deleteMessage"
        />
      </div>

      <div v-else id="messagesList"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import MessageItem from "./components/MessageItem.vue";

export default {
  name: "App",
  
  components: {
    MessageItem
  },

  setup() {
    const messages = ref([]);
    const theme = ref(localStorage.getItem("theme") || "light");

    const unreadCount = computed(() => messages.value.filter(m => !m.read).length);
    const themeIcon = computed(() => (theme.value === "light" ? "fas fa-moon" : "fas fa-sun"));
    const themeTitle = computed(() => (theme.value === "light" ? "Switch to dark mode" : "Switch to light mode"));

    async function loadMessages() {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        if (data.success) messages.value = data.messages;
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    }

    async function toggleReadStatus(id, currentlyRead) {
        const endpoint = currentlyRead ? "unread" : "read";

        fetch(`/api/messages/${id}/${endpoint}`, { method: "PUT" })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              messages.value = messages.value.map(m => {
                if (m._id === id) m.read = !currentlyRead;
                return m;
              });
            }
          })
          .catch(err => console.error("Error toggling read status:", err));
      }

    async function deleteMessage(id) {
      if (!confirm("Are you sure you want to delete this message?")) return;
      try {
        const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) loadMessages();
      } catch (err) {
        console.error("Error deleting message:", err);
      }
    }

    function toggleTheme() {
      theme.value = theme.value === "dark" ? "light" : "dark";
      localStorage.setItem("theme", theme.value);
    }
    

    onMounted(() => {
      document.body.setAttribute("data-theme", theme.value);
      loadMessages();
      setInterval(loadMessages, 30000);
    });

    watch(theme, val => {
      document.body.setAttribute("data-theme", val);
    });

    return {
      messages,
      theme,
      unreadCount,
      themeIcon,
      themeTitle,
      toggleReadStatus,
      deleteMessage,
      toggleTheme
    };
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

    :root {
            --primary-color: #0a0a0a;
            --secondary-color: #1a1a1a;
            --text-color: #f0f0f0;
            --light-bg: #121212;
            --dark-bg: #000;
            --accent-color: #00d4aa;
            --accent-dark: #06896f;
            --text-muted: #a0a0a0;
            --card-shadow: 0 10px 25px -3px rgba(0, 212, 170, 0.15);
            --card-hover-shadow: 0 15px 35px -5px rgba(0, 212, 170, 0.25);
            --transition: all 0.3s ease;
        }

        [data-theme="light"] {
            --primary-color: #f5f5f5;
            --secondary-color: #ffffff;
            --text-color: #333333;
            --light-bg: #f0f0f0;
            --dark-bg: #e0e0e0;
            --accent-color: #007a63;
            --accent-dark: #005a48;
            --text-muted: #666666;
            --card-shadow: 0 10px 25px -3px rgba(0, 122, 99, 0.15);
            --card-hover-shadow: 0 15px 35px -5px rgba(0, 122, 99, 0.25);
        }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Poppins', sans-serif;
        line-height: 1.6;
        background: var(--light-bg);
        color: var(--text-color);
        min-height: 100vh;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        text-align: center;
        margin-bottom: 3rem;
        color: var(--accent-color);
        font-size: 2.5rem;
        position: relative;
        display: inline-block;
        left: 50%;
        transform: translateX(-50%);
    }

    h1::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, transparent, var(--accent-color), transparent);
    }

    .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--secondary-color);
            border: 1px solid var(--accent-color);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: var(--transition);
            padding: 0;
            line-height: 0;
    }

    .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .theme-toggle i {
            font-size: 1.5rem;
            color: var(--accent-color);
            transition: var(--transition);
    }

    .theme-toggle {
                top: 10px;
                right: 10px;
                width: 40px;
                height: 40px;
    }

    .theme-toggle i {
                font-size: 1.2rem;
    }

    .stats {
        background: var(--secondary-color);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: var(--card-shadow);
        margin-bottom: 3rem;
        text-align: center;
        font-size: 1.1em;
        border: 1px solid #333;
        transition: var(--transition);
    }
    
    [data-theme="light"] .stats {
        border: 1px solid #e0e0e0;
    }

    .stats:hover {
        box-shadow: var(--card-hover-shadow);
        transform: translateY(-2px);
    }

    .message {
        background: var(--secondary-color);
        border-radius: 15px;
        margin: 1.5rem 0;
        padding: 2rem;
        box-shadow: var(--card-shadow);
        transition: var(--transition);
        border: 1px solid #333;
        position: relative;
        overflow: hidden;
    }

    [data-theme="light"] .message {
        border: 1px solid #e0e0e0;
    }

    .message::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        background: linear-gradient(to bottom, rgba(0, 212, 170, 0.1), transparent);
        transition: height 0.5s ease;
        z-index: 0;
    }

    .message:hover::before {
        height: 100%;
    }

    .message:hover {
        transform: translateY(-5px);
        box-shadow: var(--card-hover-shadow);
        border-color: rgba(0, 212, 170, 0.3);
    }

    .message.unread {
        border-left: 4px solid var(--accent-color);
    }

    .message.read {
        border-left: 4px solid var(--accent-dark);
    }

    .message-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 1.5rem;
        position: relative;
        z-index: 1;
    }

    .message-info {
        flex: 1;
        min-width: 250px;
    }

    .message-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .name {
        font-weight: bold;
        font-size: 1.3em;
        color: var(--accent-color);
        margin-bottom: 0.5rem;
    }

    .email {
        color: var(--text-muted);
        font-size: 0.95em;
        margin-bottom: 0.5rem;
    }

    .date {
        color: var(--text-muted);
        font-size: 0.85em;
    }

    .message-content {
        margin: 1.5rem 0;
        line-height: 1.6;
        color: var(--text-color);
        padding: 1.5rem;
        background: var(--primary-color);
        border-radius: 10px;
        border-left: 3px solid var(--accent-dark);
        position: relative;
        z-index: 1;
    }

    [data-theme="light"] .message-content {
        background: #f8f9fa;
        border-left: 3px solid #005a48;
    }

    button {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-size: 0.9em;
        transition: var(--transition);
        font-weight: 600;
        position: relative;
        overflow: hidden;
        z-index: 1;
    }

    button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        transition: width 0.5s ease;
        z-index: -1;
    }

    button:hover::before {
        width: 100%;
    }

    .read-btn {
        background: var(--accent-color);
        color: black;
        box-shadow: 0 5px 15px rgba(0, 212, 170, 0.4);
    }

    .read-btn:hover {
        background: #00e6b8;
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 212, 170, 0.6);
    }

    .delete-btn {
        background: transparent;
        color: #ff6b6b;
        border: 2px solid #ff6b6b;
    }

    .delete-btn:hover {
        background: #ff6b6b;
        color: black;
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
    }

    #messagesList:empty::before {
        content: "No messages found";
        display: block;
        text-align: center;
        color: var(--text-muted);
        font-style: italic;
        padding: 3rem;
        background: var(--secondary-color);
        border-radius: 15px;
        margin: 2rem 0;
        border: 1px solid #333;
    }

    [data-theme="light"] #messagesList:empty::before {
        background: var(--secondary-color);
        border: 1px solid #e0e0e0;
    }

    @media (max-width: 768px) {
        .container {
            padding: 1.5rem;
        }
        
        .message-header {
            flex-direction: column;
        }
        
        .message-actions {
            width: 100%;
            justify-content: flex-start;
        }
        
        button {
            flex: 1;
            min-width: 140px;
        }

        .theme-toggle {
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            min-width: 40px;
        }
        
        .theme-toggle i {
            font-size: 1.2rem;
        }
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: var(--primary-color);
    }

    ::-webkit-scrollbar-thumb {
        background: var(--accent-dark);
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--accent-color);
    }
</style>
