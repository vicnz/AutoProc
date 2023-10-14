import { getSSEWriter, SampleNotificationType } from '@lib/stream'
import { randomRange } from '@lib/random'
import db from '@lib/db'
import dayjs from 'dayjs'
import { NextRequest } from 'next/server'
// import Notification from '@lib/broadcast'
export const dynamic = 'force-dynamic' //required for the streamable response to work

// const notif = Notification

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
///
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const getCurrentDate = searchParams.get('_client_date') as string
        let responseStream = new TransformStream();
        const writer = responseStream.writable.getWriter()
        const encoder = new TextEncoder();
        const sseWriter = getSSEWriter(writer, encoder)
        //Test
        const random = randomRange(1, 100) as number

        const sampleEvent = async (notifier: SampleNotificationType) => {

            ///
            if (random % 2 === 0) {
                notifier.update({
                    data: {
                        type: 'notif',
                        message: "New Notification"
                    },
                    event: 'notif'
                })
            }
            ///
            notifier.complete({
                data: {
                    type: 'completed',
                    message: 'Completed Message'
                },
                event: 'notif-complete'
            })
        }

        await sampleEvent(sseWriter)

        return new Response(responseStream.readable, {
            headers: {
                'Content-Type': 'text/event-stream',
                Connection: 'keep-alive',
                'Cache-Control': 'no-cache, no-transform',
                'Access-Control-Allow-Origin': '*',
                'X-Accel-Buffering': 'no'
            }
        })

    } catch (err) {
        console.log("Printed Out", err)
        return new Response("", { status: 500 })
    }
}

