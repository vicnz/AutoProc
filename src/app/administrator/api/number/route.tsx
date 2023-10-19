/**
 * * PR NUMBER GENERATOR
 * * GENERATE PR-NUMBER WITH AUTO-RESET
 * * AND AUTO-VALIDATE FOR DE-DUPLICATION
 */

import db from '@lib/db'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'


class PRGENERROR extends Error {
    constructor(message: string) {
        super(message)
        this.name = "PRGENERROR"
    }
}

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const currentDate = searchParams.get('date') as string
        if (typeof currentDate === 'undefined' || currentDate === null) {
            throw "No Date Provided"
        }
        const getLatestNum = await db.purchase_requests.findFirst({
            select: { number: true },
            orderBy: {
                number: 'desc'
            }
        })

        let id = ''
        let currDate = dayjs(currentDate)
        if (getLatestNum) {
            const [year, date, series] = getLatestNum?.number?.split("-") as [string, string, string]
            //TODO get reset date setting from table Settings
            let resetMonth = 6 //assume that it's June [Month No. 6]
            let resetMonthDate = 1
            if (dayjs(currentDate).get('month') === resetMonth && dayjs(currentDate).get('date') === resetMonthDate) {
                //TODO run this once!
                //reset series
                id = `${currDate.get('year')}-${currDate.format('MM')}-0001`
                return NextResponse.json({ number: id })
            } else {
                //continue incrementing id
                let numSeries = Number.parseInt(series) + 1
                id = `${currDate.get('year')}-${currDate.format('MM')}-${numSeries.toString().padStart(4, "0")}`
                return NextResponse.json({ number: id })
            }
        } else {
            //create the very first generated id
            id = `${currDate.get('year')}-${currDate.format('MM')}-0001`
            return NextResponse.json({ number: id })
        }


    } catch (err) {
        console.log(err)
        if (err instanceof PRGENERROR) {
            return new Response("Duplication Error", { status: 500 })
        }
        return new Response("", { status: 500 })
    }
}