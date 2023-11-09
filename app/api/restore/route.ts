import { db } from '@/lib/db';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';



export async function PATCH(
    request: Request
) {


    try {
        const supabase = createRouteHandlerClient({
            cookies
        }); const {
            data: { user }
        } = await supabase.auth.getUser();

        const { id } = await request.json()
        if (!user) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        const userId = user?.id
        const existingDocument = await db.document.findUnique({
            where: {
                id: id,
            }
        });
        if (!existingDocument) {
            throw new Error("Not found");
        }
        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }
       
        const archiveDocument = await db.document.update({
            where: {
                id: id
            },
            data: {
                isArchived: false
            }
        })

        return NextResponse.json(archiveDocument);
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}