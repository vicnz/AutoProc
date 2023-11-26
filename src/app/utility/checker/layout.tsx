import { getServerSession } from "next-auth/next";
import { options } from "@lib/auth/options";
import { redirect } from "next/navigation";

async function CheckerLayout(props: any) {
    const session = await getServerSession(options);
    if (session?.user.role !== "CHECKER") {
        redirect("/auth/unauthorized");
    } else {
        return <div style={{ padding: "10px 25px" }}>{props.children}</div>;
    }
}

export default CheckerLayout;
