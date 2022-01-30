<template>
  <li class="post">
    <div class="post__content">
      <h2>Название: {{ post.title }}</h2>
      <p>Описание: {{ post.body }}</p>
      <p>{{ post.id }}</p>
    </div>
    <div class="post__btns">
      <my-button @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </li>
</template>

<script>

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>