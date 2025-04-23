<script>
import { loginUser, registerUser } from "@/api";
import AppLoader from "@/components/AppLoader.vue";

export default {
    data() {
        return {
        logged: false,
        email: "",
        password: "",
        error: "",
        };
    },

    components:{
        AppLoader,
    },

    computed: {
        disabled() {
            return this.email.length <= 3;
        },
    },

    methods: {
        onSubmit(e) {
            e.preventDefault();
            
            /* po przejściu walidacji (minimalna ilość znaków)
            uruchamiamy funkcję ze store User
            jeśli otrzymamy z serwera email zalogowanego usera
            to znaczy że można wykonywać działania na kliencie
            np przekierować się na inny adres
            logika pozostałych komunikatów musi być oparta o serwer
            */

            this.$store.dispatch("LOGIN_USER", {email: this.email, password: this.password })
                .then(() => {

                    const user = this.$store.getters.GET_CURRENT_USER;

                    if (user.email){
                        this.logged = true;
                        this.error = "";
                    } 
                    else this.logged = false;

                })
                .catch(() => {
                    this.error = "niepoprawne dane logowania";
                    this.logged = false;
                })
        }
    }
}
</script>

<template>
    <AppLoader v-show="this.$store.getters.GET_USER_LOADING"/>

    <form @submit="onSubmit" class="box">
        <h1 v-show="logged">Success</h1>
        <p v-show="logged">You are logged in</p>

        <h2>Login</h2>
        <div class="error" v-show="error">{{ error }} </div>
        <input v-model="email" placeholder="example@email.com" />
        <input type="password" v-model="password" placeholder="password"/>

        <button type="submit" :disabled="disabled">login</button>
    </form>
</template>

<style scoped>
    .box{
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 50px;
        border-radius: 20px;
        border: 5px solid black;
        width: 400px;
        background-color: lightgray;
    }
    .error{
        width: fit-content;
        background-color: rgb(255, 178, 178);
        border: 2px solid rgb(255, 92, 92);
        color: rgb(255, 92, 92);
        border-radius: 10px;
        padding: 10px;
        width: 100%;
    }
    h2{
        margin-bottom: 10px;
    }
    input{
        padding: 5px;
        font-size: 1.2em;
    }
    button{
        padding: 5px;
        cursor: pointer;
    }
</style>
