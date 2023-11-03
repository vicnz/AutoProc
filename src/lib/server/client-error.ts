import { logger } from "@logger"

export class ClientError extends Error {
    public path: string
    public type: 'client' | 'server'
    public status: number
    constructor(message: string, path: string, type: 'client' | 'server', status: number) {
        super(message)
        this.path = path
        this.type = type
        this.status = status
        logger.error({ type, message })
    }
}
