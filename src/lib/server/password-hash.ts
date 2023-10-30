/**
 * * PASSWORD HASHER USING BCRYPTJS
 * * TEXT TO HASHED STRING
 * * HASHED STRING TO TEXT
 */
import bcryptjs from 'bcryptjs'

//HASH PASSWORD
export const hashPassword = async function (password: string) {
    const result = await bcryptjs.hash(password, 10)
    return result
}
//COMPARE PASSWORD
export const comparePassword = async function (hash: string, password: string) {
    const result = await bcryptjs.compare(password, hash)
    return result;
}