<template>
    <router-link :to="item.to" class="block px-4 py-2 rounded hover:bg-gray-100 transition"
        active-class="bg-blue-100 text-blue-600 font-medium">
        {{ item.label }}
    </router-link>
</template>

<script setup>
defineProps({
    item: Object,
})
</script>
