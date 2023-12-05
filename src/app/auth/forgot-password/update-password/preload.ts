import { verify } from "jsonwebtoken";
import { notFound } from "next/navigation";

export const preload = async (token: string) => {
    try {
        const decoded: any = verify(token, process.env.JWT_SECRET as string);
        if (decoded?.exp < Math.floor(Date.now() / 1000)) {
            throw "Token Expired";
        } else {
            return { ok: true, userid: decoded.userid }
        }
    } catch (err) {
        console.log(err);
        notFound();
    }
};
