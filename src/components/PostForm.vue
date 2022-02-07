<template>
  <form class="posts-form" @submit.prevent>
    <fieldset class="posts-form__fieldset">
      <legend class="posts-form__title">Создание поста</legend>
      <my-input
        v-focus
        v-model="post.title"
        type="text"
        placeholder="Название"
      />
      <my-input
        v-model="post.body"
        type="text"
        placeholder="Описание"
      />
      <my-button class="posts-form__submit" :handler="createPost">Создать</my-button>
    </fieldset>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
        id: ""
      },
    };
  },
  methods: {
    createPost() {
        this.post.id = Date.now()
        this.$emit('create', this.post)
        this.post = {
            title: '',
            text: ''
        }
    },
  },
  watch: {
    post(newValue) {
      console.log(newValue)
    }
  }
};
</script>

<style lang="scss" scoped>
.posts-form {
  &__fieldset {
    padding: 15px;
    display: flex;
    flex-direction: column;
  }

  &__title {
    padding: 0 15px;
    font-size: 20px;
  }

  &__submit {
    align-self: flex-end;
    margin-top: 15px; 
    font-size: 18px;
  }
}
</style>