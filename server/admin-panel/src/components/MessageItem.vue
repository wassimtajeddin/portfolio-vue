<template>
  <div class="message-item">
    <p>{{ message.text }}</p>
  </div>
</template>

<script>
export default {
  name: 'MessageItem',
  props: {
    message: Object
  }
}
</script>
