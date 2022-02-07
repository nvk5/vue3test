<template>
  <h1>Страница с постами</h1>
  <my-input v-model="searchQuery" placeholder="Поиск..."/>
  <div class="app-btns">
    <my-button @click="showDialog">Создать пост</my-button>
    <my-select v-model="selectedSort" :options="sortOptions"/>
  </div>


  <my-dialog v-model:show="dialogVisible">
    <post-form @create="createPost"/>
  </my-dialog>

  <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading"/>
  <div v-else>Идет загрузка...</div>
  <div v-intersection="loadMorePosts" class="observer"></div>
  <!-- <div class="page-wrapper">
    <div 
      :class="{'current-page': page === pageNumber}" 
      class="page" 
      v-for="pageNumber in totalPages" 
      :key="pageNumber"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div> -->
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
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0
    };
  },

  methods: {
    // changePage(pageNum) {
    //   console.log(pageNum);
    //   this.page = pageNum
    //   this.fetchPosts();
    // },
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
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          });

          //101 posts : 10 postsPerPage = 11 pages
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)

          if (response.status === 200) {
            this.posts = response.data
            this.isPostLoading = false
          }
        }, 1000)

      } catch (error) {
        alert(error)
      }
    },
    async loadMorePosts() {
      try {

        if (!this.posts.length > 0) {
          return
        } else {
          this.page++
        }

        setTimeout( async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          });

          //101 posts : 10 postsPerPage = 11 pages
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)

          if (response.status === 200) {
            this.posts = [...this.posts, ...response.data]
          }
        }, 1000)

      } catch (error) {
        alert(error)
      }
    },
  },
  mounted() {
    this.fetchPosts()


    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     console.log('OBSERVE');
    //     this.loadMorePosts()
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer)



  },
  computed: {
    sortedPosts() {
      return this.posts.sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  // watch: {
  //   selectedSort(newValue) {
  //     this.posts.sort((post1, post2) => {
  //       // if (post1[newValue] > post2[newValue]) return 1
  //       // if (post1[newValue] < post2[newValue]) return -1

  //       return post1[newValue].localeCompare(post2[newValue])
  //     });
  //   }
  // }
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

