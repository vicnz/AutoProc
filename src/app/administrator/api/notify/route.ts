import { getSSEWriter, NotificationType } from "@lib/server/sse";
import { NextRequest } from "next/server";
import { DetectNewNotifications } from "./utilty";

/**
 * * Push Notification to Client
 * * This uses Server Sent Events (One Directional Messaging)
 * * This Route will continously run until an event is trigger
 * * which will be pushed to the client browser subscribe to this
 */
export const dynamic = "force-dynamic"; //REQUIRED for the streamable response to work

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

        //TODO create an alternative way to trigger notification popup
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
