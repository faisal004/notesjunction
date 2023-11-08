import { db } from '@/lib/db';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';



export async function POST(
    request: Request
) {


    try {
        const supabase = createRouteHandlerClient({
            cookies
        }); const {
            data: { user }
        } = await supabase.auth.getUser();
        const { title } = await request.json()

        if (!user) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        const document = await db.document.create({
            data: {
                title: title,
                parentDocumentId: null,
                userId: user.id,
                isArchived: false,
                isPublished: false,
            },
        });


        return NextResponse.json(document);
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}