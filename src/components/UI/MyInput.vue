<template >
    <input class="my-input" type="text" @input="updateInput" :value="modelValue">
</template>
<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>
<style lang="scss" scoped>
    .my-input {
        width: 100%;
        border: 1px solid teal;
        margin-top: 10px;
        padding: 10px 15px;
    }
</style>