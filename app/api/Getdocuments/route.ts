import { db } from '@/lib/db';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';



export async function GET(
    request: Request
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
        const userId=user?.id
        const document = await db.document.findMany({
            where:{
                userId:userId
            }
            
        });


        return NextResponse.json(document);
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}