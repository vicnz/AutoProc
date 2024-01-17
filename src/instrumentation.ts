/**process.env.NEXT_RUNTIME */
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        console.log('RUNNING ON NODEJS')
        // const { autoBackup } = await import('./jobs/backup')
        // const { MonitorDeliveries } = await import('./jobs/monitor')
        // const { NotificationFilter } = await import('./jobs/notification');
        // (await MonitorDeliveries()).start();
        // (await autoBackup()).start()
        // (await NotificationFilter()).start();
    }
    if (process.env.NEXT_RUNTIME === 'edge') {
        console.log('RUNNING ON EDGE')
    }
}

