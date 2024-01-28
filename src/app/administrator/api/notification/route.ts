export const revalidate = 0;
import db, { PrismaModels } from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import APIError from "@lib/server/api-error";
import { randomRange } from "@lib/client/random-range";
import { logger } from "@logger";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    try {
        const type = searchParams.get("type") as string;
        const count = searchParams.get("count") as string;
        const day = (searchParams.get("days") as string) || "1"; //REQUIRED NUMBER OF DAYS OF NOTIFICATION
        let days;

        if (typeof type === "string" && type === "today") {
            days = dayjs().set("hour", 0).toISOString();
            //fetch all notification MAX -> 30 Days
            const result = await db.notifications.findMany({
                where: {
                    createdAt: {
                        gte: days,
                    },
                    updatedAt: {
                        gte: days,
                    },
                    resolved: false,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            if (result.length > 0) {
                const resultingmap = result.map((item) => {
                    const parse: Pick<
                        PrismaModels["notifications"],
                        "id" & "title" & "description" & "level" & "content" & "source" & "type"
                    > = item;
                    return parse;
                });
                return NextResponse.json({ data: resultingmap });
            }
            return NextResponse.json({ data: [] });
        }

        if (typeof type === "string" && type === "month") {
            days = dayjs().subtract(Number.parseInt(day), "day").toISOString();
            let monthEnd = dayjs().subtract(0, 'hour').toISOString(); //
            const result = await db.notifications.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    level: true,
                    content: true,
                    source: true,
                    type: true,
                    createdAt: true,
                },
                where: {
                    createdAt: {
                        gte: days,
                        lte: monthEnd,
                    },
                    updatedAt: {
                        gte: days,
                        lte: monthEnd,
                    },
                    resolved: false,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            if (result.length > 0) {
                const resultingmap = result.map((item) => {
                    const parse: Pick<
                        PrismaModels["notifications"],
                        "id" & "title" & "description" & "level" & "content" & "source" & "type"
                    > = item;
                    return parse;
                });
                return NextResponse.json({ data: resultingmap });
            }
            return NextResponse.json({ data: [] });
        }

        if (typeof count === "string") {
            const count = await db.notifications.count({
                orderBy: {
                    createdAt: "desc",
                },
            });

            return NextResponse.json({ count });
        }
        return NextResponse.json([]);
    } catch (err) {
        //@ts-ignore
        logger.error(err?.message)
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("Server Error", { status: 500 });
    }
};

//TODO - TEST
export const POST = async function () {
    await db.notifications.create({
        data: {
            content: [],
            title: `Notification Test ${randomRange(10, 100)}`,
            description: "Development Test, This Notification is Triggered Manually For API Testing",
            source: "notset",
        },
    });

    return NextResponse.json({ ok: true });
};
//TODO - TEST

//DELETE A NOTIFICATION
export const DELETE = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("id") as string;
        const clear = searchParams.get("clear") as string;
        if (typeof id === "undefined") throw new Error("No ID Provided");

        if (typeof clear === "string" && clear === "true") {
            await db.notifications.deleteMany(); //! RISKY CODE USE AT MOST CARE : DELETES ALL DATA IN NOTIFICATION SECTION
        } else {
            await db.notifications.delete({
                where: {
                    id: id,
                },
            });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        //@ts-ignore
        logger.error(err?.message);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
};
