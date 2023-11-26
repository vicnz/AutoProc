import db from '@lib/db'
import { decode } from '@lib/server/jwt'

export const preload = async (token: string, officeId: string, timeStamp: string) => {
    try {
        const decodedToken = decode(token, { complete: true })

        if (!decodedToken) {
            return { error: true, message: "Invalid Token" }
        }
        const { payload } = decodedToken as { payload: any }

        const pr = await db.purchase_requests.findFirst({
            select: { final: true, tracking: true, number: true },
            where: { id: payload.id }
        })

        if (!pr) return { error: true, message: "PR Does Not Exist" }

        //? GET RECOMMENDATION TRACKING INFORMATION
        const recommendation = await db.purchase_recommendations.findFirst({
            select: { final: true, tracking: true },
            where: { prId: payload.id },
        });

        //? GET RFQ TRACKING INFORMATION
        const rfq = await db.purchase_price_quotations.findFirst({
            select: { final: true, tracking: true, id: true },
            where: { prId: payload.id },
        });

        //?GET ABSTRACT TRACKING INFO
        const abstract = await db.purchase_quotation_abstracts.findFirst({
            select: { final: true, tracking: true, id: true },
            where: { prId: payload.id },
        });

        //?GET AWARDING TRACKING INFO
        const award = await db.purchase_awards.findFirst({
            select: { final: true, tracking: true, id: true },
            where: { prId: payload.id },
        });

        //?GET PURCHASE ORDER TRACKING INFO
        const po = await db.purchase_orders.findFirst({
            select: { final: true, tracking: true, id: true },
            where: { prId: payload.id },
        });


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
            return { completed: true, tracking, number: pr.number }  //return when all documents are completed
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
                timestamp: timeStamp,
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
                        where: { id: payload.id },
                    });
                    break;
                case "recommend":
                    //* SET TRACKING FOR RECOMMENDATION
                    await db.purchase_recommendations.update({
                        data: { tracking: mutatedTracking },
                        where: { prId: payload.id },
                    });
                    break;
                case "rfq":
                    //* SET TRACKING FOR RFQ
                    await db.purchase_price_quotations.update({
                        data: { tracking: mutatedTracking },
                        where: { prId: payload.id },
                    });
                    break;
                case "abstract":
                    //* SET TRACKING FOR ABSTRACT
                    await db.purchase_quotation_abstracts.update({
                        data: { tracking: mutatedTracking },
                        where: { prId: payload.id },
                    });
                    break;
                case "award":
                    //* SET TRACKING FOR AWARD
                    await db.purchase_awards.update({
                        data: { tracking: mutatedTracking },
                        where: { prId: payload.id },
                    });
                    break;
                case "po":
                    //* SET TRACKING FOR PURCHASE ORDER
                    await db.purchase_orders.update({
                        data: { tracking: mutatedTracking },
                        where: { prId: payload.id },
                    });
                    break;
            }
        }
        return { tracking, active: getActiveDocument.name, number: pr.number }
    } catch (err) {
        console.log(err)
        return { error: true, message: "Server Error" }
    }
}
