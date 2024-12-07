<template>
    <div :style="contStyle">
      <h3><RouterLink :to="routerLink" exact>{{ this.promotion.header }}</RouterLink></h3>
      <h2>{{ this.promotion.description }}</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: "PromotionTile",
    props: { promotion: Object },
    computed: {
      contStyle() {
        const { image } = this.promotion;
        let imageUrl;
  
        try {
          imageUrl = `/src/assets/${image}`;
        } catch (e) {
          console.log(e);
        }
       
        return {
          backgroundImage: `url(${imageUrl})`,
        };
      },
      routerLink(){
        return `/promotion/${this.promotion.id}`
      }
    },
  };
  </script>
  
  <style scoped>
    div{
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      padding: 100px;
    }
  </style>