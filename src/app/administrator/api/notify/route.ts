//TODO refactor this code

import { getSSEWriter, SampleNotificationType } from '@lib/stream'
import db from '@lib/db'
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
        //
        let responseStream = new TransformStream();
        const writer = responseStream.writable.getWriter()
        const encoder = new TextEncoder();
        const sseWriter = getSSEWriter(writer, encoder)

        const sampleEvent = async (notifier: SampleNotificationType) => {
            //@DEBUG compute deliveries delays
            const delays = await db.delivery.findFirst({
                where: {
                    //do not detect if its completed //TODO -> add a completed field
                    endDate: {
                        lte: new Date(getCurrentDate).toISOString() //compute delay by (notify before) computation
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            if (delays) {

                const exists = await db.notifications.findFirst({
                    where: {
                        source: {
                            equals: delays.id
                        }
                    }
                })

                if (!exists) {
                    const result = await db.notifications.create({
                        data: {
                            source: delays.id,
                            title: "New Incoming Deadline",
                            description: "Deadline of Delivery Procurement",
                            content: [
                                {
                                    type: 'delivery',
                                    referenceId: delays.poId
                                }
                            ]
                        },
                        select: {
                            source: true,
                            content: true,
                            title: true,
                            description: true,
                        }
                    })
                    //Notify for Recent Updates
                    notifier.update({
                        data: {
                            type: 'notif',
                            message: JSON.stringify(result)
                        },
                        event: 'notif'
                    })

                }
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

