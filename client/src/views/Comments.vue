<template>
  <div class="px-2">
    <ul class="list-disc text-left list-inside">
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.content }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"

export default {
  props: ["postId"],
  data() {
    return {
      comments: []
    }
  },
  created() {
    const vm = this;
    axios
      .get(`http://localhost:4001/posts/${this.postId}/comments`)
      .then(function(response) {
        vm.comments = response.data;
      });
  }
};
</script>
