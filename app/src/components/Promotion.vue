<template>
    <div :style="contStyle">
      <RouterLink :to="routerLink" exact><h2>{{ this.promotion.header }}</h2></RouterLink>
      <h3>{{ this.promotion.description }}</h3>
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      color: white;
    }

    h2{
      font-size: 2em;
      color: white;
      text-align: center;
      text-decoration: underline;
    }

  </style>