import ExploreBtn from "@/app/components/ExploreBtn";
import EventCard from "@/app/components/EventCard";
import {events} from "@/lib/constants";

// const events = [
//     {title: "Event 1", image: "/images/event1.png"},
//     {title: "Event 2", image: "/images/event2.png"},
//
// ]

const Home = () => {
    return (
        <section>

            <h1 className="text-center">The Hub for Every Dev <br/> Event you Can&apos;t Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences,All in One Place ExploreBtn </p>

            <ExploreBtn/>

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                <ul className="events">
                    {events.map(event => (
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
