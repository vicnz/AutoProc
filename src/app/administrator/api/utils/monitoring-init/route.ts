import { NextRequest, NextResponse } from "next/server";
import { MonitorDeliveries } from '@state/schedules/delivery'
//route this is for the dashboard
const monitor = MonitorDeliveries()
export const GET = async (req: NextRequest) => {
    monitor.start() //start executing monitoring....
    return NextResponse.json({ ok: true, message: 'Start ... Monitor Deliveries' })
}