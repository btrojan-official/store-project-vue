<script>
import Promotion from "@/components/Promotion.vue"
import AppLoader from "@/components/AppLoader.vue";

export default {
  components:{
    Promotion,
    AppLoader
  },
  computed:{
    getData(){
      return this.$store.getters.GET_PROMOTIONS_LIST
    },
    promotionsLoading(){
      return this.$store.getters.GET_PROMOTIONS_LOADING
    }
  }
}
</script>

<template>
  <div class="home">
    <div v-for="prdct in getData">
      <Promotion :promotion="prdct" :key="prdct.id"/>
    </div>
  </div>
  <AppLoader v-show="promotionsLoading"/>
</template>

<style scoped>
.home{
  width: 100%;
  padding: 20px;
}
</style>
