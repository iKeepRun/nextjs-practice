import { Schema, model, models, Document, Types } from 'mongoose';

/**
 * TypeScript interface for Booking document
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to verify that the referenced event exists
 */
BookingSchema.pre('save', async function (next) {
  // Only verify eventId if it's modified or document is new
  if (this.isModified('eventId')) {
    try {
      // Import Event model dynamically to avoid circular dependencies
      const Event = models.Event || (await import('./event.model')).default;
      
      // Check if the event exists
      const eventExists = await Event.exists({ _id: this.eventId });
      
      if (!eventExists) {
        return next(new Error('Referenced event does not exist'));
      }
    } catch (error) {
      return next(
        error instanceof Error ? error : new Error('Error validating event reference')
      );
    }
  }

  next();
});

// Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

BookingSchema.index({ eventId: 1, createdAt: -1 });

BookingSchema.index({ email: 1 });

BookingSchema.index({ eventId:1 , email: 1}, { unique: true,name: "unique_event_email" });

// Prevent model recompilation in development (Next.js hot reload)
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
