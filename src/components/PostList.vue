<template>
  <transition-group tag="ul" name="post-list" v-if="posts.length > 0">
    <post-item @remove="$emit('remove', post)" v-for="post in posts" :key="post.id" :post="post"/>
  </transition-group>
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

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all .4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.post-list-move {
  transition: transform 0.8s ease;
}

</style>