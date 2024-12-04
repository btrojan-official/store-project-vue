<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default{
    components:{
        Header, Footer
    },
    mounted() {
      this.$store.dispatch("FETCH_PROMOTIONS");
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