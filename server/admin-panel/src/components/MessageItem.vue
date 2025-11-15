<template>
  <div class="message" :class="{ unread: !message.read, read: message.read }">
    <div class="message-header">
      <div class="message-info">
        <div class="name">{{ message.name }}</div>
        <div class="email">{{ message.email }}</div>
        <div class="date">{{ formattedDate }}</div>
      </div>

      <div class="message-actions">
        <button class="read-btn" @click="toggleRead">
          {{ message.read ? "Mark Unread" : "Mark Read" }}
        </button>

        <button class="delete-btn" @click="deleteMsg">
          Delete
        </button>
      </div>
    </div>

    <div class="message-content">
      {{ message.message }}
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "MessageItem",
  
  props: {
    message: {
      type: Object,
      required: true
    }
  },

  emits: ['toggle-read', 'delete'],

  setup(props, { emit }) {
    const formattedDate = computed(() => 
      new Date(props.message.createdAt).toLocaleString()
    );

    const toggleRead = () => {
      emit("toggle-read", props.message._id, props.message.read);
    };

    const deleteMsg = () => {
      emit("delete", props.message._id);
    };

    return {
      formattedDate,
      toggleRead,
      deleteMsg
    };
  }
};
</script>