'use server';

import Booking from '@/database/booking.model';
import connectDB from "@/lib/mongodb";

export const createBooking = async ({eventId, slug, email}: { eventId: string, slug: string, email: string }): Promise<{
    success: boolean
}> => {
    try {
        await connectDB();


        console.log("creating booking", eventId, slug, email);
        await Booking.create({eventId, slug, email});
        return {success: true};
    } catch (e) {
        console.error("error creating booking", e);
        return {success: false};
    }
}