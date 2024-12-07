<template>
    <div class="background">
        <div class="loader">
            <Loader />
        </div>
    </div>
</template>

<script>
    import Loader from "@/assets/loader.svg"
    export default {
        components:{
            Loader
        }
    }
</script>

<style lang="css" scoped>
    .background{
        position: fixed;
        background-color: rgba(0,0,0,0.2);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
    }
    .loader{
        width: 100px;
        height: 100px;
    }
</style>