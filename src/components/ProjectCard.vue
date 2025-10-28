<script>
import { RouterLink } from 'vue-router';

export default {
    props: ['ProjectProps'],
}

</script>

<template>
    <article class="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
        <img src="C:\Users\An\Desktop\The_End_Test\projectManagment.webp" alt="Article" class="rounded-lg mb-4">
        <h3 class="text-xl font-semibold mb-2">{{ ProjectProps.name }}</h3>
        <p class="text-gray-600 mb-3">{{ ProjectProps.description }}</p>

    </article>
</template>