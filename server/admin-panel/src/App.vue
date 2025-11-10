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

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import MessageItem from "./components/MessageItem.vue";


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
  try {
    const res = await fetch(`/api/messages/${id}/${endpoint}`, { method: "PUT" });
    const data = await res.json();
    if (data.success) loadMessages();
  } catch (err) {
    console.error("Error toggling read status:", err);
  }
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
</script>

<style>
@import "@/assets/admin.css";
</style>
