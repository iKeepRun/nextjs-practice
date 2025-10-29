"use client"

import {useState} from "react";

const BookEvent = () => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">
                    Thank you for sigining up.
                </p>
            ) : (
                <form>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email"
                               placeholder="Email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               id="email"
                        />
                    </div>
                </form>
            )}
        </div>
    )
}
export default BookEvent
