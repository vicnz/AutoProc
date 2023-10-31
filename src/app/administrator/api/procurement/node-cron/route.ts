/**
 * START MONITORING OF DELIVERIES
 * TODO create a sophisticated alternative for this
 */
import { MonitorDeliveries } from '@state/schedules/delivery'
import { NextResponse } from 'next/server'

const monitor = MonitorDeliveries()
monitor.start() //start monitoring deliveries

export const GET = () => {
    console.log("Started Delivery Monitoring")
    return NextResponse.json({ ok: true })
}
