import { db } from '@/lib/db';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';



export async function GET(
    request: Request,
    { params }: { params: { documentId: number } }
) {


    try {
        
        const documentId = parseInt(params.documentId.toString(), 10)

        const document = await db.document.findUnique({
            where: {
                id: documentId,
                isPublished:true,
                isArchived:false
            }

        });


        return NextResponse.json(document);
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
