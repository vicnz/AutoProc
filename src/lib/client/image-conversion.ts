export type BlobFromServer = {
    type: string,
    data: Array<number>
}
/**
 * From Blob | Buffer Type to Base64
 * @param blob 
 * @returns 
 */
export const fromBlobToBase64 = (blob: Blob | BlobFromServer) => {
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

/**
 * From Blob Type to Buffer
 * @param file 
 * @returns 
 */
export const fromBlobToBuffer = async (file: Blob) => {
    const buffer = await file.arrayBuffer()
    return Buffer.from(buffer)
}

/**
 * From File Type to Base64 Type
 * @param file 
 * @returns 
 */
export const fromFileToBase64 = async (file: File) => {
    const reader = new FileReader()
    return new Promise((resolved, error) => {
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolved(reader.result)
        }
    })
}
