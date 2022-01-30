<template>
  <ul v-if="posts.length > 0">
      <post-item @remove="$emit('remove', post)" v-for="post in posts" :key="post.id" :post="post"/>
  </ul>
  <h2 v-else>Список постов пуст</h2>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      default() {
        return [
          {
            id: Date.now(),
            title: "Default Post",
            text: "Lorem ipsum blabla",
          },
        ];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}

</style>