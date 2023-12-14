import { getSSEWriter, NotificationType } from "@lib/server/sse";
import { NextRequest } from "next/server";
import db, { PrismaModels } from '@lib/db'
import dayjs from 'dayjs'

/**
 * * Push Notification to Client
 * * This uses Server Sent Events (One Directional Messaging)
 * * This Route will continously run until an event is trigger
 * * which will be pushed to the client browser subscribe to this
 */
export const dynamic = "force-dynamic"; //REQUIRED for the streamable response to work

/**
 * * TIMELY FETCH ANY NEW NOTIFICATIONS EVERY MINUTE
 * * RETURN TITLE, DESCRIPTION
 */
const DetectNewNotifications = async () => {
    const new_notif = await db.notifications.findMany({
        where: {
            createdAt: {
                lte: dayjs().toISOString(),
                gte: dayjs().subtract(5, 'seconds').toISOString() //fetch notification every 10 seconds
            },
            read: false,
            resolved: false
        }
    })

    if (new_notif && new_notif.length > 0) {
        return new_notif.map(item => {
            const { title, description, source, type } = item
            return { title, description, source, type };
        })
    }
}

///
export async function GET(req: NextRequest) {
    try {
        /**
         * INITIALIZE STREAMS
         */
        let responseStream = new TransformStream();
        const writer = responseStream.writable.getWriter();
        const encoder = new TextEncoder();
        const sseWriter = getSSEWriter(writer, encoder); //CUSTOM STREAM HANDLER
        //

        const result = await DetectNewNotifications(); //CHECK IF NEW NOTIFICATIONS ARRIVED
        /**CREATE WRITTER */
        const WriterEvent = async (notifier: NotificationType) => {
            if (result) {
                //SEND TO CLIENT
                notifier.update({
                    data: {
                        type: "notif",
                        message: JSON.stringify(result || []),
                    },
                    event: "notif",
                });

            }

            notifier.complete({
                data: {
                    type: "completed",
                    message: "Completed Message",
                },
                event: "notif-complete",
            });

        };

        await WriterEvent(sseWriter); //RUN AWAIT RUNNER

        /**
         * ! NOTE
         * ! set headers for streaming to work
         * - Content-Type: text/event-stream
         * - Connection: keep-alive
         * - Cache-Control: no-cache, no-transform
         * - Access-Control-Allow-Origin: "*"
         * - X-Accel-Buffering: no
         */
        return new Response(responseStream.readable, {
            headers: {
                "Content-Type": "text/event-stream",
                Connection: "keep-alive",
                "Cache-Control": "no-cache, no-transform",
                "Access-Control-Allow-Origin": "*",
                "X-Accel-Buffering": "no",
            },
        });
    } catch (err) {
        console.log(`ERROR:STREAM:${req.url}`)
        console.log(err);
        return new Response("", { status: 500 });
    }
}


