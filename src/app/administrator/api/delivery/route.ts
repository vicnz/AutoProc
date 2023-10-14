import db, { PrismaModels } from '@lib/db'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

//
const notifyWhen = 2 //how many days before notifiying manager of the purchase request
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const id = searchParams.get("_id") as string //PR ID

        const po = await db.purchase_orders.findFirst({
            select: {
                id: true,
                particulars: true,
                number: true,
                final: true,
                supplier: true
            },
            where: {
                prId: id
            }
        })

        if (po?.final && po.final === true) {
            const result = await db.delivery.findFirst({
                where: {
                    poId: po.id
                }
            })

            if (result) {
                //TODO identify which the date is picked [SERVER \ CLIENT] date
                let deliveryStatus = ''
                if (dayjs(result.endDate) <= dayjs()) {
                    deliveryStatus = `${Math.abs(dayjs(result.endDate).diff(dayjs(), 'day'))} Day(s) Delayed`
                } else {
                    deliveryStatus = `${Math.abs(dayjs(result.endDate).diff(dayjs(), 'day'))} Day(s) Remaining`
                }
                const data = {
                    number: po.number,
                    supplier: po.supplier,
                    startDate: result.startDate,
                    endDate: result.endDate,
                    parcels: result.parcels,
                    completed: false, //todo compute the delivery items if they are completed
                    progress: [], //TODO compute progress status
                    status: deliveryStatus

                }
                return NextResponse.json(data)
            } else {
                return NextResponse.json({ empty: true })
            }
        } else {
            return NextResponse.json({ requiredFinal: true })
        }
    } catch (err) {
        console.log(`ERROR:DELIVERY:GET:${req.url}`)
        console.log(err)
        return new Response("", { status: 500 })
    }
}

//THIS WILL BE CALLED UPON THE RELEASE OF DOCUMENT
export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const id = searchParams.get('_id') as string //PR ID
        const body: { startDate: string } = await req.json() // {date: datestring}
        if (id === null || typeof id === 'undefined') throw new Error("No Purchase Order Id Sent")
        if (body === null || typeof body === 'undefined') throw new Error("No Request Body Sent")

        const pr = await db.purchase_requests.findFirst({
            include: {
                po: true
            },
            where: {
                id,
                isDeleted: false
            }
        })

        if (!pr) {
            throw new Error("No Purchase Request Found")
        }
        if (pr.po.length < 1) {
            throw new Error("No Purchase Order Found")
        }

        //

        let { po } = pr;
        const startDate = dayjs(body?.startDate) //Start Date of Delivery
        const endDate = startDate.add(po[0].duration, 'day') //End Date Delivery
        const parcels = (po[0].particulars as any[]).map(item => {
            return {
                description: item.description,
                qty: item.qty,
                checked: {
                    count: 0,
                    condition: false,
                    compliant: false,
                },
                remarks: null
            }
        })
        const parsed = {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            poId: po[0].id,
            urgent: false,
            parcels
        }

        //Update Released
        await db.purchase_orders.update({
            data: { released: true },
            where: { prId: id }
        })
        //Create Delivery Tracking
        await db.delivery.create({
            data: parsed,
        })

        return NextResponse.json({ ok: true })

    } catch (err) {
        console.log(`ERROR:DELIVERY:POST:${req.url}`)
        console.log(err)
        return new Response("", { status: 500 })
    }
}