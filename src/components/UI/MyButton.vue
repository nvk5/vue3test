<template>
    <button class="post-button" :type="type" @click="handler">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'my-button',
    props: {
        handler: {
            type: Function
        },
        type: {
            type: String,
            default: 'button'
        },

    }
}
</script>
<style lang="scss" scoped>
    .post-button {
        padding: 10px 15px;
        border: 1px solid teal;
        background: none;
        cursor: pointer;
        transition: 0.3s ease;
        font-size: 16px;
        
        &:hover {
            background: teal;
            color: white;
        }
    }
</style>