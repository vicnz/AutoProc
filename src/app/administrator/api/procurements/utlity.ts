export const computePRStatus = (status: boolean[]) => {
    const count = status.length;
    const countAccumelate = status.reduce((prev, curr) => {
        let isTrue = curr === true ? 1 : 0
        return prev + isTrue;
    }, 0)

    return (countAccumelate / count) * 100
}