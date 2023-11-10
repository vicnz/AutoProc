import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

//! MIGRATE THIS FUNCTION TO SERVER COMPONENT
//! WHEN SUPPLIER SELECTOR IS UPDATES TO THE NEW FILE APPROACH
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id");
        const isAll = searchParams.get("_all");

        if (isAll === "true") {
            const result = await db.suppliers.findMany({
                orderBy: {
                    updatedAt: "desc",
                },
            });

            return NextResponse.json(result);
        }
        //TODO
        const result = await db.suppliers.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        //TODO
        return NextResponse.json(result);
    } catch (err) {
        return new Response("", { status: 400 });
    }
};
