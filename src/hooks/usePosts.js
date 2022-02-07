import { ref } from "vue";

export function usePosts(limit) {
    const posts = ref([]);
    const totalPages = ref(0);
    const isPostLoading = ref(true)
    const fetching = async () => {
        try {
            setTimeout( async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                _page: this.page,
                _limit: this.limit
                }
            });
    
            //101 posts : 10 postsPerPage = 11 pages
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
    
            if (response.status === 200) {
                posts.value = response.data
                isPostLoading.value = false
            }
            }, 1000)
    
        } catch (error) {
            alert(error)
        }
    }

    onMounted(fetching)
    
    return {
        posts,
        isPostLoading,
        totalPages
    }
}