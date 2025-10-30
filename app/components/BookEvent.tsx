"use client"

import {useState} from "react";

const BookEvent = () => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
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
