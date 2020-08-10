<template>
  <div class="pt">
    <input type="text" v-model="content" class="border-solid border border-gray-600 mr-4" />
    <button
      class="mt-2 bg-blue-500 hover:bg-blue-700 text-whit font-bold py-2 px-4 rounded"
      @click="submit"
    >
      Submit
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["postId"],
  data() {
    return {
      content: ""
    };
  },
  methods: {
    submit() {
      axios.post(`http://posts.com/posts/${this.postId}/comments`, {
        content: this.content
      });
      console.log(this.content);
      this.content = "";
    }
  }
};
</script>
