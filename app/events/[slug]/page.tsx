import {Suspense} from "react";
import EventDetails from "@/app/components/EventDetails";


const EventDetail = async ({params}: { params: Promise<{ slug: string }> }) => {

   const slug=params.then((p)=>p.slug)

   return (
       <main>
           <Suspense fallback={<div>Loading...</div>}>
               <EventDetails params={slug} />
           </Suspense>
       </main>
   )
}


export default EventDetail
