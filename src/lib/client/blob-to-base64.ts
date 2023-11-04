/**
 * * CONVERT BLOB FIlE TO BASE64 FORMAT
 * ! RECOMMENDED FILE LIMIT SIZE <2MB
 */

export type BlobFromServer = {
    type: string,
    data: Array<number>
}

const blobToBase64 = (blob: Blob | BlobFromServer) => {
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

export default blobToBase64;