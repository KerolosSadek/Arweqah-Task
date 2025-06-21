<template>
    <header class="header bg-white shadow border-b">
        <!-- Header Content -->
        <div @click="goToHome" class="container mx-auto flex justify-between items-center py-4 px-6 cursor-pointer  ">
            <h1 class="text-2xl font-extrabold text-blue-600">📜 Arweqah Feed</h1>
            <span class="text-sm text-gray-500 italic">Infinite Scroll Experience</span>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
    router.push('/');
};
</script>
<style lang="scss">
.header {
    background-color: #fff;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    h1 {
        font-size: 1.75rem;
        font-weight: 800;
        color: #2585eb;

        &:hover {
            opacity: 0.9;
        }
    }

    span {
        color: #6b7280;
        font-style: italic;
        font-size: 0.875rem;
    }
}
</style>
