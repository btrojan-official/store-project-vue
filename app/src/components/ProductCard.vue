<template>
    <div class="card">
        <img :src="getPath" alt="img" class="product-img">
        <h3><a href="#">{{ this.item.name }}</a></h3>
        <div class="rate">
            <div class="stars">
                <div class="star" v-for="star in getStars">
                    <img src="/src/assets/gold_star.png" alt="gs" v-if="star">
                    <img src="/src/assets/black_star.png" alt="gs" v-if="!star">
                </div>
            </div>
            <span>(<a href="#">{{ this.item.ratesNumber }}</a>)</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:["item"],
        computed:{
            getPath(){
                return `/src/assets/${this.item.image}`
            },
            getStars(){
                return Array(5).fill(true, 0, Math.round(this.item.rate)).fill(false, Math.round(this.item.rate));
            }
        }
    }
</script>

<style lang="css" scoped>
    .card{
        padding: 20px;
        border-radius: 10px;
        border: 2px solid black;
        display: flex;
        flex-direction: column;
    }
    .product-img{
        width: 120px;
        height: 140px;
        margin-top: 5px;
    }
    .rate{
        width: 100%;
        display: flex;
        margin-top: 5px;
        align-items: center;
        gap: 5px;
    }
    .rate > .stars{
        flex: 1;
        border-radius: 5px;
        padding: 5px;
        background-color: rgb(175, 175, 175);

        display: flex; 
        align-items: center;
        justify-content: center;
    }

    .star > img{
        width: 15px;
    }
</style>