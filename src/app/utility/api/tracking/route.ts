import { NextRequest, NextResponse } from "next/server";
import { decode } from "@lib/server/jwt";
import db, { PrismaClientError } from "@lib/db";

export type BodyType = {
    token: string;
    officeId: string;
    timestamp: string;
};

export async function PUT(req: NextRequest) {
    try {
        const data: BodyType = await req.json(); //fetch data

        if (data === null || typeof data === "undefined") throw "No Body Provided"; //throw an error if they were no sent body data

        const { token, officeId, timestamp } = data;
        const decoded = decode(token, { complete: true }); //decode token string

        if (typeof decode !== "undefined") {
            const { payload } = decoded as { payload: any }; //pick payload data
            const { id } = payload; // get Purchase Request ID from token

            //? GET PR TRACKING INFORMATION
            const pr = await db.purchase_requests.findFirst({
                select: { final: true, tracking: true },
                where: { id },
            });

            if (!pr) {
                throw "None Existing PR";
            } //IF PR DOESNT EXIST THROW AN ERROR

            //? GET RECOMMENDATION TRACKING INFORMATION
            const recommendation = await db.purchase_recommendations.findFirst({
                select: { final: true, tracking: true },
                where: { prId: id },
            });

            //? GET RFQ TRACKING INFORMATION
            const rfq = await db.purchase_price_quotations.findFirst({
                select: { final: true, tracking: true, id: true },
                where: { prId: id },
            });

            //?GET ABSTRACT TRACKING INFO
            const abstract = await db.purchase_quotation_abstracts.findFirst({
                select: { final: true, tracking: true, id: true },
                where: { prId: id },
            });

            //?GET AWARDING TRACKING INFO
            const award = await db.purchase_awards.findFirst({
                select: { final: true, tracking: true, id: true },
                where: { prId: id },
            });

            //?GET PURCHASE ORDER TRACKING INFO
            const po = await db.purchase_orders.findFirst({
                select: { final: true, tracking: true, id: true },
                where: { prId: id },
            });

            //RESOLVE
            const tracking = await Promise.all([
                { ...pr, name: "pr" },
                { ...recommendation, name: "recommend" },
                { ...rfq, name: "rfq" },
                { ...abstract, name: "abstract" },
                { ...award, name: "award" },
                { ...po, name: "po" },
            ]);

            //@GET ACTIVE DOCUMENT
            //? ? -> PICK THE FIRST DOCUMENT THAT IS'NT COMPLETED YET `final`
            //? ? -> ASSUMED THAT THIS IS THE CURRENTLY TRACKED DOCUMENT
            const getActiveDocument = tracking.find((item) => item.final == false); //GET ACTIVE DOCUMENT

            if (typeof getActiveDocument === 'undefined') {
                //return when all documents are completed
                return new Response(JSON.stringify({ type: 'completed', message: 'This Document Is Already Completed' }), { status: 500 })
            }
            //IF NONE ASSUMED THAT PR IS THE ONLY EXISTSING DOCUMENT
            if (getActiveDocument) {
                //TODO - [IN/OUT] DOCUMENT
                //TODO - In/Out feature is yet to be implemented
                //TODO - For the mean time tracking only the office it walked on is
                //TODO - is the only plausible solution for now.

                let activeTracked = getActiveDocument.tracking as Array<{
                    id: string;
                    timestamp: string;
                    name?: string | null; //! @DEBUG
                    //tracking
                }>;

                //? SELECT OFFICE INFORMATION
                const officeName = await db.departments.findFirst({
                    select: { name: true, description: true },
                    where: { id: officeId },
                });

                //ADD NEWLY TRACKED OFFICE WITH THE CURRENT TIMESTAMP
                activeTracked.push({
                    id: officeId,
                    timestamp: timestamp,
                    name: officeName?.description,
                });

                //? -> REMOVE SIMILAR ENTRIES
                let mutatedTracking = Array.from(new Set(activeTracked));

                //? -> IDENTIFY WHICH DOCUMENT SHALL BE UPDATED
                switch (getActiveDocument.name) {
                    case "pr":
                        //* SET TRACKING FOR PR
                        await db.purchase_requests.update({
                            data: { tracking: mutatedTracking },
                            where: { id: id },
                        });
                        break;
                    case "recommend":
                        //* SET TRACKING FOR RECOMMENDATION
                        await db.purchase_recommendations.update({
                            data: { tracking: mutatedTracking },
                            where: { prId: id },
                        });
                        break;
                    case "rfq":
                        //* SET TRACKING FOR RFQ
                        await db.purchase_price_quotations.update({
                            data: { tracking: mutatedTracking },
                            where: { prId: id },
                        });
                        break;
                    case "abstract":
                        //* SET TRACKING FOR ABSTRACT
                        await db.purchase_quotation_abstracts.update({
                            data: { tracking: mutatedTracking },
                            where: { prId: id },
                        });
                        break;
                    case "award":
                        //* SET TRACKING FOR AWARD
                        await db.purchase_awards.update({
                            data: { tracking: mutatedTracking },
                            where: { prId: id },
                        });
                        break;
                    case "po":
                        //* SET TRACKING FOR PURCHASE ORDER
                        await db.purchase_orders.update({
                            data: { tracking: mutatedTracking },
                            where: { prId: id },
                        });
                        break;
                }
                return NextResponse.json({ tracking }); //RETURN TRACKING DATA
            }
        } else {
            throw "Traking TODO"; //SOME ERROR OCCURED
        }
    } catch (err) {
        if (err instanceof PrismaClientError) {
            console.log(err);
        }
        return new Response("{}", { status: 500 });
    }
}
