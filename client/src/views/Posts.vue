<template>
  <div>
    <ul class="flex">
      <li v-for="post in posts" :key="post.id" class="w-64 mx-2 border">
        <div class="bg-gray-200 border-b font-bold">{{ post.title }}</div>
        <comments :postId="post.id" :comments="post.comments"></comments>
        <comment-create :postId="post.id"></comment-create>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"
import Comments from "./Comments.vue"
import CommentCreate from './CommentCreate'

export default {
  data() {
    return {
      posts: []
    }
  },
  components: {
    comments: Comments,
    commentCreate: CommentCreate
  },

  created() {
    const vm = this
    axios.get("http://posts.com/posts")
         .then(function(repsonse) {
           vm.posts = Object.values(repsonse.data)
         })
  }

};
</script>
