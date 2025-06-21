<template>
    <div class="post-card" @click="$emit('click')">
        <v-card class="post-card__container" elevation="2" rounded="l">
            <!-- Post Image -->
            <v-img src="https://via.placeholder.com/400x250?text=No+Image" class="post-card__image" height="160" cover
                alt="Dummy image" />

            <v-card-item class="post-card__content">
                <!-- Post Title -->
                <v-card-title class="post-card__title">
                    {{ post.title }}
                </v-card-title>
            <!-- Post Description -->
                <v-card-subtitle class="post-card__description">
                    {{ post.description }}
                </v-card-subtitle>
            </v-card-item>
            <!-- Post Footer -->
            <v-card-actions class="post-card__footer">
                <span class="post-card__date">{{ formatDate(post.created_at) }}</span>
                <v-icon size="18" color="grey">mdi-calendar</v-icon>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup lang="ts">
// Props for the post card component
defineProps<{
    post: {
        id: number
        title: string
        description: string
        created_at: string
    }
}>()

// Utility function to format the date
const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
</script>

<style scoped lang="scss">
.post-card {
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    &__container {
        background-color: #f9fafb;
        border-radius: 16px;
        overflow: hidden;
    }

    &__image {
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
    }

    &__content {
        padding: 1rem;
    }

    &__title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1e3a8a;
        margin-bottom: 0.5rem;
        line-height: 1.4;
    }

    &__description {
        font-size: 0.875rem;
        color: #4b5563;
        line-height: 1.3;
        max-height: 3.6em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;

    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1rem;
        font-size: 0.75rem;
        color: #6b7280;
        border-top: 1px solid #e5e7eb;
    }

    &__date {
        font-style: italic;
    }
}
</style>
