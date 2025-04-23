<script>
import { registerUser } from "@/api";
import AppLoader from "@/components/AppLoader.vue";

export default {
    data() {
        return {
        error: "",
        email: "",
        password:"",
        repeat_password:"",
        status: "register",
        loading: false
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

            const user = this.$store.getters.GET_CURRENT_USER;

            if (this.password.length < 3) {
                this.error = "Password needs to be at least 3 characters long!";
            } 
            else if (this.password !== this.repeat_password) {
                this.error = "Passwords do not match!";
            }
            else if(user !== null){
                this.error = "You are already logged in. Log out first.";
            }
            else {
                this.error = "";

                // do funkcji przekazujemy obiekt z danymi usera
                this.loading = true;
                registerUser({ email: this.email, password: this.password })
                .then((data) => {
                    this.status = data.status;
                    /* 
                    tu kluczowa sprawa, do zsynchronizowania z odpowiedzią serwera:
                    na jej podstawie decydujemy czy formularz ma pozostać czy zniknąć
                    bo user istnieje już lub nie            
                    this.exists = true;            
                    this.registered = true;
                    */

                
                })
                .catch((err) => {
                    // w wypadku błędu zakładamy, że user się nie zarejestrował
                    this.registered = false;
                    this.status = "register";
                    this.error = "Cannot register user! Try again later";
                })
                .finally(() => {
                    // w obu wypadkach zatrzymujemy loader
                    this.loading = false;
                });
            }
        }
    }
}
</script>

<template>
    <AppLoader v-show="loading"/>

    <div v-show="status=='exist'" class="box">
        <h1>Info</h1>
        <p>User already exists</p>
    </div>

    <div v-show="status=='success'" class="box">
        <h1>Success</h1>
        <p>Thank you for registering</p>
    </div>

    <form @submit="onSubmit" v-show="status=='register'" class="box">
        <h2>Register</h2>
        <div class="error" v-show="error">{{ error }} </div>
        <input v-model="email" placeholder="example@email.com" />
        <input type="password" v-model="password" placeholder="password"/>
        <input type="password" v-model="repeat_password" placeholder="repeat password"/>

        <button type="submit" :disabled="disabled">register</button>
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
