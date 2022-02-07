<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue3</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">Посты</my-button>
            <my-button @click="$router.push('/about')">О сайте</my-button>
            <my-button @click="$router.push('/composition')">Composition API</my-button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .navbar {
        height: 50px;
        background-color: lightgray;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;

        &__btns {
            margin-left: auto;
        }
    }
</style>