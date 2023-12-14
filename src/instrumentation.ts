/**process.env.NEXT_RUNTIME */
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        console.log('running in nodejs')
        //! MIGRATE ALL LONG RUNNING SERVER CODE HERE
        const { MonitorDeliveries } = await import('./jobs/monitor')
        const { NotificationFilter } = await import('./jobs/notification')
        const monitor = (await MonitorDeliveries()).start()
        const notifStrip = (await NotificationFilter()).start()
    }
    if (process.env.NEXT_RUNTIME === 'edge') {
        console.log('running on edge')
    }
}

