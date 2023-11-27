export const fileToBuffer = async (file?: File | null) => {
    if (typeof file === 'undefined' || file === null) return null;
    const arryBuffer = await file.arrayBuffer()
    return Buffer.from(arryBuffer)
}