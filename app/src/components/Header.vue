<template>
    <header>
        <div class="menu">
            <RouterLink to="/" exact>Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/random-subpage">Not found</RouterLink>
            <div class="right-box">
                <RouterLink v-show="!user" to="/login">
                    <button>Login</button>
                </RouterLink>
                <RouterLink v-show="!user" to="/register">
                    <button>Register</button>
                </RouterLink>
                <span v-if="user">{{ user.email }}</span>
                <button v-show="user" @click="logout">Logout</button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.GET_CURRENT_USER;
        },
        userLoading() {
            return this.$store.getters.GET_USER_LOADING;
        },
    },

    methods:{
        logout() {
             this.$store.dispatch("LOGOUT_USER")
                .then(() => {
                    this.$router.push("/login"); // redirect
                });
        }
    }
}
</script>

<style lang="css" scoped>
    header{
        padding: 20px;
        width: 100%;
        background-color: rgb(19, 19, 19);
        display: flex;
    }
    .menu{
        display: flex;
        align-items: center;
        gap: 20px;
        width: 100%;
    }

    .right-box{
        display: flex;
        gap: 20px;
        margin-left: auto;
    }

    .menu a{
        color: rgb(219, 219, 219);
        padding: 10px;
        text-decoration: none;
    }

    span{
        color: white;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    button{
        padding: 10px;
        background-color: red;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 10px;
        font-size: 1.2em;
    }
</style>