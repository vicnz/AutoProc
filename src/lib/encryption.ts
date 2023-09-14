import bcryptjs from 'bcryptjs'
//hash-password
export const hashPassword = async function (password: string) {
    const result = await bcryptjs.hash(password, 10)
    return result
}

export const comparePassword = async function (hash: string, password: string) {
    const result = await bcryptjs.compare(password, hash)
    return result;
}