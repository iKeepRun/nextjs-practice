import ExploreBtn from "@/app/components/ExploreBtn";
import EventCard from "@/app/components/EventCard";
import {IEvent} from "@/database";
import {cacheLife} from "next/cache";



const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
    "use cache"
    cacheLife("hours")
    const resp=await  fetch(`${BASE_URL}/api/events`)
    const {events} = await resp.json()

    return (
        <section>

            <h1 className="text-center">The Hub for Every Dev <br/> Event you Can&apos;t Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences,All in One Place ExploreBtn </p>

            <ExploreBtn/>

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                <ul className="events">
                    {events && events.length>0 && events.map((event :IEvent) => (
                            <div key={event.title}>
                                <EventCard  {...event}/>
                            </div>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Home
