import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: Request) {
    return NextResponse.json({success: true, path: 'https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg'})
}
