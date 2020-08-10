<template>
  <div class="p-2">
    <ul class="list-disc text-left list-inside">
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.content }} - {{ comment.status === 'pending' ? "Waiting for moderation" : comment.status }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: ["postId", "comments"]
};
</script>
