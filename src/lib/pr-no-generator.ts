//test
function generator() {
    const date = new Date(Date.now())


    function* gen() {
        while (true) {
            yield date.getUTCDate()
        }
    }

    return (() => {
        return gen().next().value
    })()
}

console.log(generator())