/**
 * * SERVER SENT EVENTS INIT
 * * DEFINITION OF SSE UTILITY
 */

//MESSAGE TYPE
export interface Message<T = string | Record<string, unknown>> {
    data: T,
    comment?: string,
    event?: string,
    id?: string,
    retry?: string
}

//EVENT NOTIFIER TYPE
export interface EventNotifier<
    T extends {
        update: T['update'] extends Message ? Message<T['update']>['data'] : never
        complete: T['complete'] extends Message ?
        Message<T['complete']>['data'] : never
    } = any
> {
    update: (
        message: Message<T['update']>['data'],

    ) => void
    complete: (
        message: Message<T['complete']>['data']
    ) => void
}


//CONVERT DATA TO STRING
export function toDataString(data: string | Record<string, unknown>): string {
    if (typeof data === 'object') { //isObject()
        return toDataString(JSON.stringify(data))
    }
    //@ts-ignore
    return data?.split(/\r\n|\r|\n/).map((line: any) => `data: ${line}\n\n`).join(' ')
}

export function writeMessage(writer: WritableStreamDefaultWriter, encoder: TextEncoder, message: Message) {
    if (message.comment) {
        void writer.write(encoder.encode(`: ${message.comment}\n`))
    }
    if (message.event) {
        void writer.write(encoder.encode(`events: ${message.event}\n`))
    }
    if (message.id) {
        void writer.write(encoder.encode(`id: ${message.id}\n`))
    }
    if (message.retry) {
        void writer.write(encoder.encode(`retry: ${message.retry}\n`))
    }
    if (message.data) {
        void writer.write(encoder.encode(toDataString(message.data)))
    }
}

//WRITER CLASS
export class Writer implements EventNotifier {
    constructor(
        readonly writer: WritableStreamDefaultWriter,
        readonly encoder: TextEncoder
    ) { }

    writeMessage(writer: WritableStreamDefaultWriter, encoder: TextEncoder, message: Message) {
        if (message.comment) {
            void writer.write(encoder.encode(`: ${message.comment}\n`))
        }
        if (message.event) {
            void writer.write(encoder.encode(`events: ${message.event}\n`))
        }
        if (message.id) {
            void writer.write(encoder.encode(`id: ${message.id}\n`))
        }
        if (message.retry) {
            void writer.write(encoder.encode(`retry: ${message.retry}\n`))
        }
        if (message.data) {
            void writer.write(encoder.encode(toDataString(message.data)))
        }
    }

    update(message: Message) {
        this.writeMessage(this.writer, this.encoder, message)
    }

    complete(message: Message) {
        this.writeMessage(this.writer, this.encoder, message)
        void this.writer.close()
    }
}


//SSE WRITER
export const getSSEWriter = (
    writer: WritableStreamDefaultWriter,
    encoder: TextEncoder
) => new Writer(writer, encoder)


//sample event
export type NotificationType = EventNotifier<{
    update: {
        data: {
            type: string,
            message: string
        },
        event: 'notif'
    }
    complete: {
        data: {
            type: string,
            message: string
        },
        event: 'notif-complete'
    }
}>
