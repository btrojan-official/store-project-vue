<template>
    <header>
        <div class="menu">
            <RouterLink to="/" exact>Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/register">Register</RouterLink>
            <RouterLink to="/asdklfksdf">Not found</RouterLink>
        </div>
    </header>
</template>

<style lang="css" scoped>
    header{
        padding: 20px;
        width: 100%;
        background-color: rgb(19, 19, 19);
        display: flex;
    }
    .menu{
        display: flex;
        gap: 20px;
    }

    .menu > a{
        color: rgb(219, 219, 219);
        padding: 10px;
        text-decoration: none;
    }
</style>