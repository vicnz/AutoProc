/**process.env.NEXT_RUNTIME */
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        //! MIGRATE ALL LONG RUNNING SERVER CODE HERE
        // const { MonitorDeliveries } = await import('@state/schedules/delivery')
        // const delivery = MonitorDeliveries()
        // delivery.start()
    }
    // if (process.env.NEXT_RUNTIME === 'edge') {
    //     console.log('running edge')
    // }
}

