import db, { PrismaModels } from "@lib/db";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import APIError, { METHOD } from "@lib/server/api-error";

//
const notifyWhen = 2; //how many days before notifiying manager of the purchase request
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);

    try {
        const id = searchParams.get("_id") as string; //PR ID

        const po = await db.purchase_orders.findFirst({
            select: {
                id: true,
                particulars: true,
                number: true,
                final: true,
                supplier: true,
            },
            where: {
                prId: id,
            },
        });

        if (po?.final && po.final === true) {
            const result = await db.delivery.findFirst({
                where: {
                    poId: po.id,
                },
            });

            if (result) {
                const checkCompleted = await Promise.all(
                    (result.parcels as Array<{ verified: any; qty: number; completed: boolean }>).map(async (item) => {
                        // item.verified.aligned && item.verified.quality && item.verified.count === item.qty
                        return [item.verified.aligned && item.verified.quality, item.verified.count === item.qty];
                    })
                );

                const status = checkCompleted.flat().filter((item) => item).length / checkCompleted.flat().length;
                const deliveryProgress = Math.floor(status * 100);

                //TODO identify which the date is picked [SERVER \ CLIENT] date
                let deliveryStatus = "";
                if (dayjs(result.endDate) <= dayjs()) {
                    deliveryStatus = `${Math.abs(dayjs(result.endDate).diff(dayjs(), "day"))} Day(s) Delayed`;
                } else {
                    deliveryStatus = `${Math.abs(dayjs(result.endDate).diff(dayjs(), "day"))} Day(s) Remaining`;
                }
                //
                const data = {
                    id: result.id,
                    number: po.number,
                    supplier: po.supplier,
                    startDate: result.startDate,
                    endDate: result.endDate,
                    parcels: result.parcels,
                    completed: false,
                    progress: deliveryProgress,
                    status: deliveryStatus,
                    final: result.final
                };
                return NextResponse.json(data);
            } else {
                return NextResponse.json({ empty: true });
            }
        } else {
            return NextResponse.json({ requiredFinal: true });
        }
    } catch (err) {
        console.log(`ERROR:DELIVERY:GET:${req.url}`);
        console.log(err);
        if (err instanceof APIError) {
            const error = err.message;
            return new Response(error, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
};

//THIS WILL BE CALLED UPON THE RELEASE OF DOCUMENT
export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id") as string; //PR ID
        const body: { startDate: string } = await req.json(); // {date: datestring}
        if (id === null || typeof id === "undefined") throw new Error("No Purchase Order Id Sent");
        if (body === null || typeof body === "undefined") throw new Error("No Request Body Sent");

        const pr = await db.purchase_requests.findFirst({
            include: {
                po: true,
            },
            where: {
                id,
                isDeleted: false,
            },
        });

        if (!pr) {
            throw new APIError("No Referencing PR", req.url, METHOD.POST, "pr");
        }
        if (pr.po.length < 1) {
            throw new APIError("No Referencing PO", req.url, METHOD.POST, "po");
        }

        //

        let { po } = pr;
        const startDate = dayjs(body?.startDate); //Start Date of Delivery
        const endDate = startDate.add(po[0].duration, "day"); //Add Number of Days of DeliveryS

        const parcels = (po[0].particulars as any[]).map((item, idx) => {
            return {
                id: `delivery_id_${idx.toString().padStart(4, "0")}`,
                completed: false,
                description: item.description,
                price: item.price,
                total: item.total,
                qty: item.qty,
                verified: {
                    count: 0, //*check the delivered amount
                    quality: false, //*check if the product quality is satisfying
                    aligned: false, //*if the presented delivered item is aligned with the PR presented
                },
                remarks: null, //checker remarks and stuff
            };
        });

        const parsed = {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            poId: po[0].id,
            urgent: false,
            parcels,
        };

        //Update Released
        await db.purchase_orders.update({
            data: { released: true },
            where: { prId: id },
        });
        //Create Delivery Tracking
        await db.delivery.create({
            data: parsed,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERROR:DELIVERY:POST:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};

export const PATCH = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    try {
        const body = await req.json();
        if (typeof body === "undefined" || body === null)
            throw new APIError("No Body Provided", req.url, METHOD.PATCH, "Invalid");
        const id = searchParams.get("_id") as string;
        if (typeof id === "undefined" || id === null)
            throw new APIError("No ID Provide", req.url, METHOD.PATCH, "Invalid");
        //
        if (searchParams.get("update_delivery") === "true") {
            const { parcels } = body;
            const checkForComplete = await Promise.all(
                (
                    parcels as Array<{
                        completed: boolean;
                        qty: number;
                        verified: { count: number; quality: boolean; aligned: boolean };
                    }>
                ).map(async (item) => {
                    let isCompleted = false;
                    if (item.verified.aligned && item.verified.quality && item.verified.count === item.qty) {
                        isCompleted = true;
                    }
                    return {
                        ...item,
                        completed: isCompleted,
                    };
                })
            );

            await db.delivery.update({
                data: {
                    parcels: checkForComplete,
                },
                where: {
                    id: id,
                },
            });
            return NextResponse.json({ ok: true });
        }
        /**
         * * SET DELIVERY AS FINAL
         */
        if (searchParams.get("final") === "true") {
            //check if all parcels are all completed
            const result = await db.delivery.findFirstOrThrow({
                where: {
                    id: id,
                },
            });

            const checkIfFinal = (result.parcels as Array<{ completed: boolean }>).every((item) => {
                return item.completed;
            });

            if (!checkIfFinal) {
                throw new APIError("Complete First The Deliveries", req.url, METHOD.PATCH, "Invalid");
            }

            await db.delivery.update({
                data: { final: true },
                where: { id },
            });

            return NextResponse.json({ ok: true });
        }

        /**
         * * EXTEND DEADLINE DATE
         * * REQUIRES NUMBER OF DAYS OF EXTENSIONp
         */

        if (searchParams.get("extend") === "true") {
            const { extension, endDate } = body;

            const extended = dayjs(endDate).add(extension, "days").toISOString(); //convert

            await db.delivery.update({
                data: {
                    endDate: extended,
                },
                where: {
                    id: id,
                },
            });

            return NextResponse.json({ ok: true });
        }

    } catch (err) {
        console.log(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
};
