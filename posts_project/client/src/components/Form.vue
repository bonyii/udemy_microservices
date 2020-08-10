<template>
  <div class="w-3/5 mx-auto">
    <h2 class="mb-8 text-4xl font-bold">Create Post</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3">
      <label
        for="post"
        class="sm:col-span-1 sm:my-auto text-left sm:text-right sm:pr-6 font-bold"
        >Title</label
      >
      <textarea
        id="post"
        class="border-solid border-4 border-gray-600 sm:col-span-2"
        v-model="title"
      ></textarea>
    </div>
    <div class="mt-12">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-whit font-bold py-2 px-4 rounded"
        @click="submit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    submit() {
      axios.post("http://posts.com/posts/create", {
        title: this.title
      });
      console.log(this.title);
      this.title = "";
    }
  }
};
</script>
