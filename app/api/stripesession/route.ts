import { createStripeSession } from "@/actions/stripe"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get('id')
    if (!accountId) {
        return NextResponse.json({ staus: 400 })
    }
    const res = await createStripeSession(accountId)
    return NextResponse.json(res)
}
