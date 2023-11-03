export default async function BlobToBuffer(file: Blob) {
    const buffer = await file.arrayBuffer()
    return Buffer.from(buffer)
}