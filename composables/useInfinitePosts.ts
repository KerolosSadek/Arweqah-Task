// Import Post Collection service
import PostsCollection from '~/services/posts/posts'

// Start of the composable function
export function useInfinitePosts() {
    const posts = ref<any[]>([])
    const currentPage = ref(1)
    const total = ref(0)
    const lastPage = ref(null)
    const loading = ref(false)
    const error = ref('')
    const hasMore = ref(true)

    // Function to fetch posts
    const fetchPosts = async () => {
        if (loading.value || !hasMore.value) return

        loading.value = true
        error.value = ''

        try {
            // Fetch posts from the PostsCollection service
            const response = await PostsCollection.getPosts(currentPage.value)
            const data = response.data

            posts.value.push(...data.data)
            lastPage.value = data.last_page
            total.value = data.total
            // Check if there are more pages to load
            if (currentPage.value >= data.last_page) {
                hasMore.value = false
            } else {
                currentPage.value++
            }
        } catch (err) {
            error.value = 'Failed to load posts, please try again.'
        } finally {
            loading.value = false
        }
    }

    // Return the reactive properties and methods
    return {
        posts,
        fetchPosts,
        hasMore,
        loading,
        error,
        total,
    }
}
