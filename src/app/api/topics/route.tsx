import { NextResponse } from "next/server";
import { TOPICS } from "../../../../config";

export async function GET() {
    const topics = TOPICS; 

    return NextResponse.json({ topics: topics }, {status: 200});
}