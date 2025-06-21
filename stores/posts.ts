import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
    state: () => ({
        selectedPost: null as any,
    }),
    actions: {
        setSelectedPost(post: any) {
            this.selectedPost = post 
        },
        clearSelectedPost() {
            this.selectedPost = null
        },
    },
})
