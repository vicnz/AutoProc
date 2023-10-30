/**
 * RANDOM Number By range
 */

function randomRange(min: number, max: number) {
    try {
        if (min >= max) throw Error("Max cannot be lower than Min")
        return Math.floor(Math.random() * (max - min + 1) + min)
    } catch (err) {
        console.error(err)
    }

}

export { randomRange }