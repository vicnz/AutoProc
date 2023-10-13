import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'
const JWT_SECRECT = process.env.JWT_SECRET as string


export const sign = (payload: any, options: SignOptions) => {
    return jwt.sign(payload, JWT_SECRECT, options)
}

export const decode = (token: string, options: VerifyOptions) => {
    return jwt.verify(token, JWT_SECRECT, options)
}
