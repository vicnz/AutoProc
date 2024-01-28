import { NextRequest, NextResponse } from "next/server";
//route this is for the dashboard
export const GET = async (req: NextRequest) => {

    return NextResponse.json({ message: "Administrator API service" })
}