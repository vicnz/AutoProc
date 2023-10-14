//TODO refactor this code
import notif from '@lib/broadcast'
import { getSSEWriter, SampleNotificationType } from '@lib/stream'
import db from '@lib/db'
import { NextRequest } from 'next/server'
// import Notification from '@lib/broadcast'
import { NotifyOutdateDelivery } from './utilty'

export const dynamic = 'force-dynamic' //required for the streamable response to work

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
///
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const getCurrentDate = searchParams.get('_client_date') as string
        //
        let responseStream = new TransformStream();
        const writer = responseStream.writable.getWriter()
        const encoder = new TextEncoder();
        const sseWriter = getSSEWriter(writer, encoder)

        const sampleEvent = async (notifier: SampleNotificationType) => {

            const result = await NotifyOutdateDelivery(getCurrentDate);
            if (typeof result !== 'undefined') {
                notifier.update({
                    data: {
                        type: 'delivery',
                        message: JSON.stringify(result || {})
                    },
                    event: 'notif'
                })
            }

            //TEST - ASYNC FUNCTION
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

