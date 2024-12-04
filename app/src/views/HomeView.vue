<script>
import Promotion from "@/components/Promotion.vue"

export default {
  components:{
    Promotion
  },
  computed:{
    getData(){
      return this.$store.getters.GET_PROMOTIONS_LIST
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
</template>

<style scoped>
.home{
  padding: 20px;
}
</style>
