export default {
    name: 'intersection',
    mounted(el, bindings) {
        console.log(bindings);

        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }

        const callback = (entries, observer) => {
            console.log(bindings.value);
        if (entries[0].isIntersecting) {
            bindings.value()
        }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el)
    },
}