import Image from "next/image";
import {notFound} from "next/navigation";
import BookEvent from "@/app/components/BookEvent";
import {getSimilarEventsBySlug} from "@/lib/actions/event.actions";

import EventCard from "@/app/components/EventCard";
import {IEvent} from "@/database";

const EventDetailItem = ({icon, alt, label}: { icon: string, alt: string, label: string }) => (
    <div className="flex-row-gap-2">
        <Image src={icon} alt={alt} width={17} height={17}/>
        <p>{label}</p>
    </div>
)

const EventAgenda = ({agendaItems}: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({tags}: { tags: string[] }) => (
    <div className="flex flex-row gap-2 flex-wrap">
        {tags.map((item, index) => (
            <div className="pill" key={index}>{item}</div>
        ))}
    </div>
)

const EventDetail = async ({params}: { params: Promise<{ slug: string }> }) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const {slug} = await params

    const bookings = 10

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug)
    console.log({similarEvents})

    let event
    try {
        const res = await fetch(`${BASE_URL}/api/events/${slug}`, {next: {revalidate: 60}})
        const {data} = await res.json()
        event = data

        // console.log("event:",event)
        if (!data) return notFound()
    } catch (e) {
        console.error("Error Fetch Event:", e);
        return notFound()
    }

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{event.description}</p>
            </div>

            <div className="details">
                <div className="content">
                    <Image src={event.image} alt="Event Banner" width={800} height={800} className="banner"/>

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{event.overview}</p>
                    </section>
                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="Calendar" label={event.date}/>
                        <EventDetailItem icon="/icons/clock.svg" alt="Clock" label={event.time}/>
                        <EventDetailItem icon="/icons/pin.svg" alt="Location" label={event.location}/>
                        <EventDetailItem icon="/icons/mode.svg" alt="Mode" label={event.mode}/>
                        <EventDetailItem icon="/icons/audience.svg" alt="Audience" label={event.audience}/>
                    </section>

                    <EventAgenda agendaItems={event.agenda}/>

                    <section className="flex-col-gap-2">
                        <h2>About Organizer</h2>
                        <p>{event.organizer}</p>
                    </section>

                    <EventTags tags={event.tags}/>
                </div>
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} other people who have already booked their spot!
                            </p>
                        ) : (
                            <p className="text-sm ">Be the first to book your spot!</p>
                        )}
                        <BookEvent/>
                        {/*<p className="text-lg font-semibold">Book Event</p>*/}
                    </div>
                </aside>
            </div>
            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {
                        similarEvents.length > 0 && similarEvents.map(
                            (similarEvent) => (
                                <EventCard {...similarEvent} key={similarEvent.title}/>
                            )
                        )
                    }
                </div>
            </div>
        </section>

    )
}
export default EventDetail
