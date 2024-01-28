/**PRELOAD DATA */
import fullname from '@lib/client/fullname';
import db from '@lib/db'

export const preload = async function (param: { page: number, size: number }) {
    try {
        const page: number = param.page
        const result = await db.purchase_requests.findMany({
            select: {
                number: true,
                reference: true,
                id: true,
                purpose: true,
                particulars: true,
                user: {
                    select: {
                        id: true,
                        fname: true,
                        mname: true,
                        lname: true,
                        suffix: true,
                        department: { select: { description: true } },
                        section: { select: { description: true } },
                    },
                },
                final: true,
                abstract: {
                    select: { final: true },
                },
                recomend: {
                    select: { final: true },
                },
                award: {
                    select: { final: true },
                },
                rfq: {
                    select: { final: true },
                },
                po: {
                    select: { final: true },
                },
                delivery: {
                    select: { final: true }
                }
            },
            skip: page,
            take: param.size || 8,
            orderBy: {
                updatedAt: "desc",
            },
            where: {
                isDeleted: false,
            },
        });

        const ListFormatter = new Intl.ListFormat("en");

        const parsed = result.map(async (item, idx) => {

            const status = [
                item.final || false, //PR is Final?
                item.recomend[0]?.final || false, //Recommendation is Final?
                item.rfq[0]?.final || false, //RFQ is Final?
                item.abstract[0]?.final || false, //Abstract is Final?
                item.award[0]?.final || false, //Awarding is Final?
                item.po[0]?.final || false, //PO is Final,
                item.delivery[0]?.final || false //delivery is final
            ]
            const progress = computePRStatus(status) //compute progresss
            return {
                id: item.id,
                key: item.id,
                number: item.number,
                reference: `${item.reference}`,
                purpose: item.purpose,
                particulars: ListFormatter.format(
                    (item.particulars as Array<{ description: string }>).map((item) => item.description)
                ),
                enduser: fullname(
                    {
                        fname: item.user?.fname,
                        mname: item.user?.mname,
                        lname: item.user?.lname,
                        suffix: item.user?.suffix,
                    },
                    true
                ),
                enduserId: item.user?.id,
                department: item.user?.department?.description,
                section: item.user?.section?.description,
                status: progress,
            };
        });

        const response = await Promise.all(parsed)

        return response;
    } catch (err) {
        throw new Error("Failed to Load Page");

    }
};

const computePRStatus = (status: boolean[]) => {
    const count = status.length;
    const countAccumelate = status.reduce((prev, curr) => {
        let isTrue = curr === true ? 1 : 0
        return prev + isTrue;
    }, 0)

    return (countAccumelate / count) * 100
}

/**FETCH SETTINGS */
export const fetchSetting = async () => {
    try {
        const setting = await db.settings.findFirst({
            select: {
                name: true,
                value: true,
            },
            where: {
                name: 'paginate'
            }
        })

        if (!setting) return { size: 8 }
        return {
            size: Number(setting.value)
        }
    } catch (err) {
        return { size: 8 }
    }
}
