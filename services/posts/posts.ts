import { apiUrls } from '~/apiUrls'
import apiClient from '../index'

// PostsCollection class to handle posts-related API calls
class PostsCollection {
  static async getPosts(page: number = 1) {
    return await apiClient.get(`${apiUrls.posts.getPosts}?page=${page}`)
  }
  static async getPostById(id: string) {
    return await apiClient.get(`${apiUrls.posts.getPosts}/${id}`)
  }
}

export default PostsCollection
