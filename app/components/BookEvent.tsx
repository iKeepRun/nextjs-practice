"use client"

import {useState} from "react";
import {createBooking} from "@/lib/actions/booking.actions";
import posthog from "posthog-js";



interface BookingProps{
    eventId: string;
    slug: string;
}

const BookEvent = ({eventId, slug}:BookingProps) => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    console.log("组件接收参数：", eventId, slug, email)

    const handleSubmit = async (e: React.FormEvent) => {
        const {success}=await createBooking({eventId,slug, email})
        if (success) {
            setSubmitted(true)
            posthog.capture("event_booking", {
                eventId,
                slug,
                email
            })
        }else{
            console.error("booking created failed");
            posthog.captureException("booking created failed")
        }
        e.preventDefault()
    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">
                    Thank you for sigining up.
                </p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email"
                               placeholder="enter your email address"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               id="email"
                        />
                        <button type="submit" className="button-submit">Submit</button>
                    </div>
                </form>
            )}
        </div>
    )
}
export default BookEvent
