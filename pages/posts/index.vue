<template>
    <div class="p-4 max-w-7xl mx-auto min-vh-100">
        <v-container fluid>

            <!-- Toggle Button -->
            <div class="d-flex justify-end my-4">
                <v-btn @click="viewMode = viewMode === 'card' ? 'list' : 'card'" color="primary" variant="tonal"
                    aria-label="Toggle view mode">
                    {{ viewMode === 'card' ? 'Switch to List View' : 'Switch to Card View' }}
                </v-btn>
            </div>

            <!-- Search Input -->
            <div class="mb-6">
                <input v-model="search" type="text" placeholder="Search posts..." aria-label="Search posts"
                    class="search-input w-100 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out" />
            </div>


            <!-- Announce loaded posts -->
            <div aria-live="polite" class="my-4">
                <v-chip color="primary" variant="flat">
                    {{ filteredPosts.length }} Posts Loaded From {{ total }} Posts
                </v-chip>
            </div>

            <!-- Skeleton when loading and no posts yet -->
            <v-row v-if="loading && posts.length === 0">
                <v-col v-for="n in 8" :key="'skeleton-' + n" cols="12" sm="6" md="3" lg="3">
                    <v-skeleton-loader class="mx-auto border rounded-lg" max-width="100%" type="image, article"
                        aria-hidden="true" />
                </v-col>
            </v-row>

            <!-- Card View -->
            <v-row v-else-if="viewMode === 'card'" role="list" aria-label="Card view of blog posts" id="posts-list">
                <v-col v-for="post in filteredPosts" :key="post.id" cols="12" sm="6" md="6" lg="3" role="listitem">
                    <CardsPostCard :post="post" @click="handlePostClick(post)" tabindex="0" role="button"
                        @keydown.enter="handlePostClick(post)" :aria-label="`Read post: ${post.title}`" />
                </v-col>
            </v-row>

            <!-- List View -->
            <div v-else class="posts-list" role="list" aria-label="List view of blog posts" id="posts-list">
                <div v-for="post in filteredPosts" :key="post.id" role="listitem" tabindex="0" class="posts-list__item"
                    @click="handlePostClick(post)" @keydown.enter="handlePostClick(post)"
                    :aria-label="`Read post: ${post.title}`">
                    <div class="posts-list__content">
                        <h2 class="posts-list__title">{{ post.title }}</h2>
                        <p class="posts-list__desc">{{ post.description }}</p>
                        <div class="posts-list__footer">
                            <span class="posts-list__date">
                                {{
                                    new Date(post.created_at).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })
                                }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading & End Messages -->
            <div v-if="loading && posts.length > 0" class="text-center text-blue-500 my-4" aria-live="assertive">
                <v-progress-circular indeterminate color="primary" size="24" />
                <span class="ml-2">Loading more posts...</span>
            </div>
            <!-- Show when search yields no results -->
            <div v-if="search && !loading && filteredPosts.length === 0" class="text-center my-4" role="status"
                aria-live="polite">
                <span class="text-warning">No posts found.</span>
            </div>

            <!-- No More Posts -->
            <div v-if="!hasMore && !loading" class="text-center my-4" role="status" aria-live="polite">
                <span class="text-blue-500">No more posts to load.</span>
            </div>
            <!-- Error Message -->
            <div v-if="error" class="text-center text-red-500 my-4" role="alert">
                {{ error }}
            </div>
            <!-- Scroll to Top Button -->
            <button v-show="showScrollTop" @click="scrollToTop" class="scroll-top-btn" aria-label="Scroll to top">
                <img src="@/assets/icons/arrow-up.svg" alt="Scroll to top">
            </button>

        </v-container>

    </div>
</template>

<script setup lang="ts">
// Import necessary libraries and composables
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useInfinitePosts } from "~/composables/useInfinitePosts";
import { useRouter } from "vue-router";
import { usePostStore } from "@/stores/posts";

// Constants and reactive variables
const { posts, fetchPosts, hasMore, loading, error, total } = useInfinitePosts();
const postStore = usePostStore();
const router = useRouter();
const search = ref("");
const showScrollTop = ref(false);

// 👇 Add viewMode with default as 'card'
const viewMode = ref<'card' | 'list'>('card');


// Filtered posts based on search input
const filteredPosts = computed(() => {
    if (!search.value.trim()) return posts.value;

    return posts.value.filter((post) =>
        post.title.toLowerCase().includes(search.value.toLowerCase()) ||
        post.description.toLowerCase().includes(search.value.toLowerCase())
    );
});
// Handle scroll events for infinite scrolling
const handleScroll = () => {
    const scrollBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (scrollBottom && hasMore.value) fetchPosts();
};

// Handle post click to navigate to post details
const handlePostClick = (post: any) => {
    postStore.setSelectedPost(post);
    router.push(`/posts/${post.id}`);
    localStorage.setItem("selectedPost", JSON.stringify(post));
};

// Scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// Check if scroll position is greater than 300px to show/hide scroll-to-top button
const checkScroll = () => {
    showScrollTop.value = window.scrollY > 300;
};

// Lifecycle hooks to fetch posts and manage scroll events
onMounted(() => {
    fetchPosts();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", checkScroll); // 👈 for scroll-to-top button
});

// Cleanup event listeners on component unmount
onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("scroll", checkScroll);
});
</script>
<style lang="scss">
.posts-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    &__item {
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1d4ed8; // Tailwind blue-700
        margin-bottom: 0.5rem;
    }

    &__desc {
        font-size: 0.95rem;
        color: #374151; // Tailwind gray-700
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #e5e7eb;
        padding-top: 0.75rem;
        font-size: 0.85rem;
        color: #6b7280; // Tailwind gray-500
    }

    &__date {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
}

.search-input {
    font-size: 1rem;
    background-color: #f9fafb;
    color: #1f2937; // gray-800
    transition: all 0.2s ease;

    &::placeholder {
        color: #9ca3af; // gray-400
    }

    &:focus {
        background-color: #ffffff;
        border: none;
    }
}

.scroll-top-btn {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    background-color: #2563eb; // blue-600
    color: white;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #1d4ed8; // darker blue
    }
}
</style>
