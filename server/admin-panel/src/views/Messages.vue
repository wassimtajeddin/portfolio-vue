<template>
  <div class="message" :class="{ read: message.read, unread: !message.read }">
    <div class="message-header">
      <div class="message-info">
        <div class="name">{{ message.name }}</div>
        <div class="email">{{ message.email }}</div>
        <div class="date">{{ formattedDate }}</div>
      </div>

      <div class="message-actions">
        <button class="read-btn" @click="$emit('toggle-read', message._id, message.read)">
          {{ message.read ? "Mark Unread" : "Mark Read" }}
        </button>
        <button class="delete-btn" @click="$emit('delete', message._id)">
          Delete
        </button>
      </div>
    </div>

    <div class="message-content">{{ message.message }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  message: { type: Object, required: true }
});

const formattedDate = computed(() =>
  new Date(props.message.createdAt).toLocaleString()
);
</script>
