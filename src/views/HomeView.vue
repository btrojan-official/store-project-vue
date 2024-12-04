<script setup>
  import Promotion from "@/components/Promotion.vue"

  export default{
    computed:{
      getData(){
        return this.$modules.getters.GET_PROMOTIONS_LIST
      }
    }
  }
</script>

<template>
  <div class="home">
    Welcome
  </div>
  <div v-for="img in getData">
    Img
  </div>
</template>

<style scoped>

</style>
