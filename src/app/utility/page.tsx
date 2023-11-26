import { getServerSession } from "next-auth/next";
import { options } from "@lib/auth/options";
import { notFound, redirect } from "next/navigation";

async function UtilityPage() {
    const session = await getServerSession(options);
    if (session?.user.role === "TRACKER") {
        redirect("/utility/tracker");
    } else if (session?.user.role === "CHECKER") {
        redirect("/utility/checker");
    } else {
        notFound();
    }
}

export default UtilityPage;
