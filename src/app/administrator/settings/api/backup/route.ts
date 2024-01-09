import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { ReadableOptions } from "stream";

function streamFile(path: string, options?: ReadableOptions): ReadableStream<Uint8Array> {
    const downloadStream = fs.createReadStream(path, options);

    return new ReadableStream({
        start(controller) {
            downloadStream.on("data", (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
            downloadStream.on("end", () => controller.close());
            downloadStream.on("error", (error: NodeJS.ErrnoException) => controller.error(error));
        },
        cancel() {
            downloadStream.destroy();
        },
    });
}


export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const searchParams = req.nextUrl.searchParams
        if (!searchParams.has('download')) throw new Error("No Download Param Sent")
        const filePath = searchParams.get('download') as string

        const stats = await fs.promises.stat(filePath)
        const data = streamFile(filePath)

        const res = new NextResponse(data, {
            status: 200,
            headers: new Headers({                                                          //Headers
                "content-disposition": `attachment; filename=${path.basename(filePath)}`,           //State that this is a file attachment
                "content-type": "application/tgz",                                              //Set the file type to an iso
                "content-length": stats.size + "",                                              //State the file size
            }),
        })

        return res;
    } catch (err) {
        return new NextResponse("", { status: 400 })
    }                                                              // Return the NextResponse with the file so NextJS can send the file to the user
}