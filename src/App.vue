<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default{
    mounted() {
      this.$store.dispatch("GET_POSTS_ACTION");
    }
}
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