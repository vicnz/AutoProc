import fullname from "@lib/client/fullname";
import db from "@lib/db";
import { comparePassword, hashPassword } from "@lib/server/password-hash";
export interface UserCredential {
    username: string; //can be the user email
    password: string;
}


//? PASSWORD VERIFIER FOR ADMIN [FOR VERIFICATION PURPOSE]
export const validateAdmin = async (id: string, password: string) => {
    const user = await db.users.findUnique({
        select: {
            id: true,
            password: true,
        },
        where: {
            id,
            AND: [{ userType: "ADMIN" }],
        },
    });

    if (!user) return null;
    const compare = await comparePassword(user.password, password);
    if (!compare) return null;
    return { ok: true };
};

//? LOGIN USER [ADMIN, USER, TRACKER, CHECKER]
export const loginUser = async (credentials: UserCredential) => {
    try {
        const user = await db.users.findFirst({
            select: {
                id: true,
                email: true,
                username: true,
                fname: true,
                mname: true,
                lname: true,
                suffix: true,
                password: true,
                userType: true,
            },
            where: {
                OR: [{ email: credentials?.username }, { username: credentials?.username }],
                isDeleted: false,
            },
        });

        if (!user) {
            return null; //no username or email matching
        }
        const compare = await comparePassword(user?.password, credentials?.password);
        if (!compare) {
            return null; //invalid password
        }

        return {
            id: user.id,
            fullname: fullname(
                { fname: user?.fname, mname: user?.mname, lname: user?.lname, suffix: user?.suffix },
                true
            ),
            username: user.username,
            role: user.userType,
        };
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const updateAdminPassword = async (id: string, password: string) => {
    const adminUsers = await db.users.findFirst({
        select: {
            id: true,
            password: true,
        },
        where: {
            id,
            AND: [{ userType: "ADMIN" }]
        }
    })

    if (!adminUsers) return null;
    try {
        const hashed = await hashPassword(password)
        await db.users.update({
            data: {
                password: hashed
            },
            where: {
                id,
                userType: 'ADMIN',
            }
        })
        return { ok: true }
    } catch (err) {
        console.log(err)
        return null
    }
}