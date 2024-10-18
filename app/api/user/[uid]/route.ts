import { getUserByEmail } from '@/actions/user'

export async function GET(request: Request, { params }: { params: { uid: string }}) {
    const uid = params.uid
    console.log(uid)
    let user = await getUserByEmail(uid)
    console.log(user)
    if (!user) {
        return new Response('User not found', {status: 404})
    }
    return new Response(JSON.stringify(user))
}

export async function POST(request: Request) {
    const data = await request.json()
}
