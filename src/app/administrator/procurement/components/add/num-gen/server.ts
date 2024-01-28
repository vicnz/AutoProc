'use server';

import db from "@lib/db";
import dayjs from "dayjs";

export const generatePRNumber = async function () {
    try {
        const settings = await db.settings.findFirst({
            select: {
                name: true,
                value: true
            },
            where: {
                name: { equals: 'prgen' }
            }
        })

        const resetDate = dayjs(settings?.value)
        let resetMonth = resetDate.get('month') //assume that it's June [Month No. 6]
        let resetMonthDate = resetDate.get('day')
        let resetHour = resetDate.set('hour', 12).get('hour')

        const getLatestNum = await db.purchase_requests.findFirst({
            select: { number: true },
            orderBy: {
                number: 'desc'
            },
            take: 1,
        })
        const currentDate = dayjs()

        if (!getLatestNum) {
            let pr_number = `${currentDate.get('year')}-${currentDate.format('MM')}-0001`
            return { number: pr_number }
        }

        const [year, date, series] = getLatestNum?.number?.split("-") as [string, string, string]

        if (currentDate.get('month') === resetMonth && currentDate.get('date') === resetMonthDate && currentDate.get('hour') === resetHour) {
            let pr_number = `${currentDate.get('year')}-${currentDate.format('MM')}-0001`
            return { number: pr_number }
        } else {
            let numSeries = Number.parseInt(series) + 1
            let pr_number = `${currentDate.get('year')}-${currentDate.format('MM')}-${numSeries.toString().padStart(4, "0")}`
            return { number: pr_number }
        }

    } catch (err) {
        return { error: true }
    }
}