'use server';

import { formToObject } from '@lib/converters/formData'
import { updateAdminPassword } from '@lib/auth'

export const updatePassword = async (formData: FormData) => {
    try {
        const object: { id: string, password: string } = formToObject(formData)
        const result = await updateAdminPassword(object.id, object.password)
        if (!result) throw "Error Occured"
        return { ok: true }
    } catch (err) {
        console.log(err)
        return { error: true, message: "Server Error" }
    }
}