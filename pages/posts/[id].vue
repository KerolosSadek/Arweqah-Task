<template>
    <div class="post-details ">
        <!-- Post Details -->
        <v-container>
            <!-- Back Link -->
            <NuxtLink to="/posts" class="post-details__back-link">
                ← Back to posts
            </NuxtLink>
            <!-- Post Details Card -->
            <div v-if="post" class="post-details__card">
                <h1 class="post-details__title">{{ post.title }}</h1>
                <p class="post-details__desc">{{ post.description }}</p>
                <p class="post-details__date">
                    Published on
                    {{
                        new Date(post.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                    }}
                </p>
            </div>
            <!-- Loading Spinner -->
            <div v-else class="post-details__empty">
                <!-- Spinner -->
                <span class="spinning-circle"></span>
            </div>
        </v-container>
    </div>
</template>
<script setup lang="ts">
// Import necessary libraries and composables
import { ref, onMounted } from "vue";
import { usePostStore } from "@/stores/posts";

// Constants and reactive variables
const postStore = usePostStore();
const post = ref<any>(null);

// Fetch post details
onMounted(() => {
    // First try to get post from Pinia
    if (postStore.selectedPost) {
        post.value = postStore.selectedPost;
    } else {
        // Fallback: Try to get it from localStorage
        const storedPost = localStorage.getItem("selectedPost");
        if (storedPost) {
            try {
                post.value = JSON.parse(storedPost);
            } catch (e) {
                console.error("Error parsing localStorage post:", e);
            }
        }
    }
});
</script>


<style scoped lang="scss">
.post-details {
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: 100vh;

    &__back-link {
        display: inline-block;
        color: #3b82f6; // Tailwind blue-500
        font-weight: 500;
        margin-bottom: 1rem;
        transition: color 0.3s;

        &:hover {
            color: #2563eb; // blue-600
            text-decoration: underline;
        }
    }

    &__card {
        background: #ffffff;
        padding: 2rem;
        border-radius: 0.5rem;
    }

    &__title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #1d4ed8; // Tailwind blue-700
        margin-bottom: 1rem;
    }

    &__desc {
        font-size: 1rem;
        color: #374151; // Tailwind gray-700
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    &__date {
        font-size: 0.875rem;
        color: #6b7280; // Tailwind gray-500
    }

    &__empty {
        text-align: center;
        color: #3b82f6; // red-600
        font-weight: 500;
        padding-top: 2rem;

        .spinning-circle {
            display: inline-block;
            width: 24px;
            height: 24px;
            border: 2px solid #3b82f6; // Tailwind blue-500
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    }

    &__retry {
        color: #3b82f6;
        margin-left: 0.5rem;
        text-decoration: underline;

        &:hover {
            color: #2563eb;
        }
    }

    @media (max-width: 640px) {
        padding: 1rem;

        &__title {
            font-size: 1.4rem;
        }

        &__desc {
            font-size: 0.95rem;
        }

    }
}
</style>
