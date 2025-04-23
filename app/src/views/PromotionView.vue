<script>
    import AppLoader from '@/components/AppLoader.vue';
    import ProductCard from '@/components/ProductCard.vue'

    export default {
        components:{
            AppLoader,
            ProductCard
        },
        created() {
            const id = this.$route.params.id
            this.$store.dispatch("FETCH_PROMOTION", id);
        },
        computed: {
            promotionData() {
                return this.$store.getters.GET_PROMOTION_OBJECT;
            },
            promotionLoading(){
                return this.$store.getters.GET_PROMOTION_LOADING
            },

            contStyle() {
                const { image } = this.promotionData;
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
            finishDate(){
                if(this.promotionData.finishCondition != undefined) return this.promotionData.finishCondition;
                else {
                    const date = new Date(this.promotionData.finishDate);

                    const day = String(date.getDate()).padStart(2, '0'); 
                    const month = date.toLocaleString('en-US', { month: 'long' });
                    const year = date.getFullYear();

                    return `${day} ${month} ${year}`;
                };
            }
        }
    }
</script>

<template>
    <AppLoader v-show="promotionLoading"/>
    <div>
        <div :style="contStyle" class="top">
            <h1>{{ promotionData.header }}</h1>
            <h2>{{ promotionData.description }}</h2>
        </div>
        <div class="bottom">
            <div class="description">
                <p>{{ promotionData.longDescription }}</p>
            </div>
            <div class="dueDate">
                <span>Ends: {{ finishDate }}</span>
            </div>
            <div class="items">
                <ProductCard v-for="item in promotionData.items" :item="item"/>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .top{
        padding: 20px;
        color: white;

        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .bottom{
        display: flex;
        flex-direction: column;
    }

    h2, h1{
        width: 100%;
        text-align: center;
    }

    .description{
        width: 100%;
        padding: 50px;
    }
    .description > p{
        width: 100%;
        text-align: center;
    }

    .dueDate{
        width: 100%;
        padding: 20px;
        background-color: lightgray;
        display: flex;
        text-align: center;
        justify-content: flex-end;
    }

    .items{
        display: flex;
        flex-wrap: wrap;
        padding: 50px;
        justify-content: space-between;
    }
</style>