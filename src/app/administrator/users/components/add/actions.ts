'use server';
import db, { PrismaModels, PrismaClientError } from '@lib/db'
import { hashPassword } from '@lib/server/password-hash'
import sharp from 'sharp';
import { revalidatePath } from 'next/cache';
import { fileToBuffer } from '@lib/converters/fileToBuffer'

export const addNewUser = async (data: FormData) => {
    let object: any = {};
    data.forEach(function (value, key) {
        if (value === 'undefined') {
            object[key] = undefined;
        } else if (value === 'null') {
            object[key] = null;
        } else {
            object[key] = value;
        }
    });

    let departmentId = null
    let sectionId = null
    const office = object['office'].split(',')
    if (office.length > 1) {
        departmentId = office[0]
        sectionId = office[1]
    } else {
        departmentId = office[0]
    }

    //convert password to 
    const password = await hashPassword(object.password)

    let profile = await fileToBuffer(object.profile)
    if (profile) {
        profile = await sharp(profile).resize({ height: 500, width: 500 }).toBuffer()
    }

    const mapped: Partial<PrismaModels['users']> = {
        username: object.username,
        fname: object.fname,
        mname: object.mname,
        lname: object.lname,
        suffix: object.suffix,
        departmentId: departmentId,
        sectionId: sectionId,
        email: object.email,
        link: object.link,
        phone: object.phone,
        password: password,
        userType: object.userType,
        profile: profile
    }

    try {
        await db.users.create({
            data: {
                ...mapped as PrismaModels['users'],
            },
        })
        revalidatePath('/administrator/users')
        return { ok: true }
    } catch (err) {
        console.error(err)
        if (err instanceof PrismaClientError) {
            if (err.code === 'P2002') {
                return { error: true, message: 'Duplicate User, Matching Username or Email to an Existing User' }
            }
            return { error: true, message: 'database error' }
        }
        return { error: true, message: 'server error' }
    }
}