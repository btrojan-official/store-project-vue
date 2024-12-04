<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
 <div id="main-app">
    <Header></Header>
    <main>
        <RouterView/>
    </main>
    <Footer></Footer>
</div>
</template>