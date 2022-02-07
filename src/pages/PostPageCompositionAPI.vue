<template>
  <h1>Страница с постами</h1>
  <my-input v-model="searchQuery" placeholder="Поиск..."/>
  <div class="app-btns">
    <my-button >Создать пост</my-button>
    <my-select v-model="selectedSort" :options="sortOptions"/>
  </div>


  <my-dialog v-model:show="dialogVisible">
    <post-form />
  </my-dialog>

  <post-list :posts="sortedAndSearchedPosts" v-if="!isPostLoading"/>
  <div v-else>Идет загрузка...</div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import usePosts from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';

export default {
  components: { PostList, PostForm },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ],
    };
  },
  setup(props) {
      const { posts, totalPages, isPostLoading } = usePosts();
      const { sortedPosts, selectedSort } = useSortedPosts(posts);
      const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

      return {
        posts,
        totalPages,
        isPostLoading,
        sortedPosts,
        selectedSort,
        searchQuery,
        sortedAndSearchedPosts
      }
  }
};
</script>

<style lang="scss">

.app-btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page-wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}

</style>

