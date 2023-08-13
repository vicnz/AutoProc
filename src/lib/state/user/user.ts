import { PB_CLIENT } from "../pb/client.config";
import { PBUserRecord, TUserSignUpFormFields } from "./types";

const PB_USER_COLLECTION = process.env.NEXT_PUBLIC_USER_COLLECTION || 'clients'

interface ILoginUser {
    pb: PB_CLIENT;
    user: string;
    password: string;
}


/**GET USER */
export async function getUser(pb: PB_CLIENT) {
    try {
        pb.authStore.loadFromCookie(document?.cookie ?? "");
        return pb.authStore.model;
    } catch (error) {
        throw error;
    }
}


export async function loginUser({ pb, user, password }: ILoginUser) {
    try {
        const authData = await pb.collection(PB_USER_COLLECTION).authWithPassword(user, password);
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
        return authData;
    } catch (error) {
        throw error;
    }
}


export interface ISignupuser {
    pb: PB_CLIENT;
    user: TUserSignUpFormFields;
}

export async function createUser({ pb, user }: ISignupuser) {
    try {
        await pb.collection(PB_USER_COLLECTION).create(user);
        const logged_in_user = await loginUser({
            pb, user: user.email, password: user.password,
        });
        return logged_in_user;
    } catch (error) {
        throw error;
    }
}

/**Logout User */
export function logoutUser({ pb }: { pb: PB_CLIENT }) {
    try {
        pb.authStore.clear();
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    } catch (error) {
        throw error;
    }
}




