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
        const userId = user?.id
        const documents = await db.document.findMany({
            where: {
              userId: userId,
              isArchived: true,
            },
            orderBy: {
              id: "asc",
            },
          });
          


        return NextResponse.json(documents);
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}