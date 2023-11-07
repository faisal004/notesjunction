"use client"
import { useSessionContext } from "@supabase/auth-helpers-react";

const DocumentPage = () => {
    const { session,isLoading } = useSessionContext()
    console.log(session)
    return ( <div>Heelo worlld</div> );
}
 
export default DocumentPage;