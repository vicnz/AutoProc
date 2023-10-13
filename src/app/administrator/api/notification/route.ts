import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (req: NextRequest) {
    const data = dayjs().get('seconds') + Math.random() * 100
    return NextResponse.json({ number: data, changed: data % 2 === 0 });
}