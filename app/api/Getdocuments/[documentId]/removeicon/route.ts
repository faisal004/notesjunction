import { db } from '@/lib/db';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
export async function PATCH(
    request: Request,
    { params }: { params: { documentId: number } }
) {


    try {
        const supabase = createRouteHandlerClient({
            cookies
        }); const {
            data: { user }
        } = await supabase.auth.getUser();


        if (!user) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        const userId = user?.id
        if (!userId) {
            throw new Error("Unauthorised")
        }
        const documentId = parseInt(params.documentId?.toString(), 10)
        const {title,icon} = await request.json()
        const document = await db.document.update({
            where: {
                id: documentId,

                isArchived: false
            },
            data: {
                
                icon:null
            }

        });


        return NextResponse.json(document);
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}