//Convert a Blob Image to Base64 Format
type BlobFromServer = {
    type: string,
    data: Array<number>
}
export default (blob: Blob | BlobFromServer) => {
    if (blob instanceof Blob) {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result)
            }
        })
    } else {
        return Buffer.from(blob.data).toString('base64')
    }
}