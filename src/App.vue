<template>
  <h1>Страница с постами</h1>
  <my-button @click="showDialog">Создать пост</my-button>

  <my-dialog v-model:show="dialogVisible">
    <post-form @create="createPost"/>
  </my-dialog>

  <post-list :posts="posts" @remove="removePost" v-if="!isPostLoading"/>
  <div v-else>Идет загрузка...</div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import axios from 'axios';

export default {
  components: { PostList, PostForm },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true
        setTimeout( async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');

          if (response.status === 200) {
            this.posts = response.data
            this.isPostLoading = false
          }
        }, 2000)

      } catch (error) {
        alert(error)
      }
    },
  },
  mounted() {
    this.fetchPosts()
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  padding: 15px;
}
</style>

