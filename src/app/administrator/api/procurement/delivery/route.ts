import db from "@lib/db";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import APIError, { METHOD } from "@lib/server/api-error";
import { computeDelivery, computeParcels, checkForCompleteFn } from "./utility";
import { ParcelItem, ParcelViewItem } from "./type";
import { logger } from "@logger";

//
const notifyWhen = 2; //TODO how many days before notifiying manager of the purchase request
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);

    try {
        const id = searchParams.get("_id") as string; //PR ID
        if (typeof id === "undefined" || id === null || id === "") throw new Error("ID Not Provided");

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

        if (po) {
            const result = await db.delivery.findFirst({
                where: {
                    poId: po.id,
                },
            });

            if (result !== null) {
                //compute delivery status
                const [status, progress] = await computeDelivery(result.parcels as ParcelItem[], result.endDate);
                const data = {
                    id: result.id,
                    number: po.number,
                    supplier: po.supplier,
                    startDate: result.startDate,
                    endDate: result.endDate,
                    parcels: result.parcels,
                    completed: false,
                    progress: progress,
                    status: status,
                    final: result.final,
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
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
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
        if (typeof id === "undefined" || id === null || id === "") throw new Error("No Purchase Order Id Sent");
        if (typeof body === "undefined" || body === null) throw new Error("No Request Body Sent");

        const pr = await db.purchase_requests.findFirst({
            select: {
                id: true,
                po: true,
            },
            where: {
                id,
                isDeleted: false,
            },
        });

        const po = await db.purchase_orders.findFirst({
            select: {
                id: true,
                number: true,
                duration: true,
                final: true,
                particulars: true,
            },
            where: {
                prId: id,
            },
        });

        if (!pr) {
            throw new APIError("No Referencing PR", req.url, METHOD.POST, "server");
        }
        if (!po) {
            throw new APIError("No Referencing PO", req.url, METHOD.POST, "server");
        }

        //

        if (po && pr) {
            const startDate = dayjs(body?.startDate); //Start Date of Delivery
            const endDate = startDate.add(po.duration, "day"); //Add Number of Days of DeliveryS

            const parcels = await computeParcels(po.particulars as ParcelViewItem[]);

            const parsed = {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                poId: po.id,
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
                data: { ...parsed, prId: pr.id },
            });

            return NextResponse.json({ ok: true });
        }
    } catch (err) {
        console.log(`ERROR:DELIVERY:POST:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
};

//
export const PUT = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id") as string;
        if (typeof id === "undefined" || id === null || id === "") throw new Error("PR ID Not Provided");
        const body = await req.json();
        if (typeof body === "undefined" || body === null) throw new Error("NO Send BODY");
        //
        const { parcels } = body;
        const parcelChecked = await checkForCompleteFn(parcels as ParcelItem[]);

        await db.delivery.update({
            data: {
                parcels: parcelChecked,
            },
            where: {
                id: id,
            },
        });
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERROR:DELIVERY:POST:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
};
export const PATCH = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id") as string;
        if (typeof id === "undefined" || id === null || id === "")
            throw new APIError("No ID Provide", req.url, METHOD.PATCH, "Invalid");
        //
        const body = await req.json();
        if (typeof body === "undefined" || body === null)
            throw new APIError("No Body Provided", req.url, METHOD.PATCH, "Invalid");
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
