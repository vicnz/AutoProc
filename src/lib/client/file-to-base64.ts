export default function main(file: File) {
    const reader = new FileReader()
    return new Promise((resolved, error) => {
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolved(reader.result)
        }
        reader.onerror = () => {
            console.log("AN Error Occured")
            error('profile image file reading... error')
        }
    })
}