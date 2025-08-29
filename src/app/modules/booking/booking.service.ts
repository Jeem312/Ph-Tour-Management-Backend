/* eslint-disable @typescript-eslint/no-non-null-assertion */

import AppError from "../../errorHelpers/AppError";
import User from "../user/user.models";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import httpStatus from "http-status-codes"
import Booking from "./booking.model";
import Payment from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.models";

const getTransactionId = () => {
    return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}


const createBooking = async (payload: Partial<IBooking>, userId: string) => {
        const transactionId = getTransactionId();
      const session = await Booking.startSession();
      session.startTransaction();
      try {
           const user = await User.findById(userId,session);


    if(!user?.phone || !user.address){
        throw new AppError(httpStatus.BAD_REQUEST, "please update your profile to book a Tour")
    }


    const tour = await Tour.findById(payload.tour,session).select("costFrom");
    if(!tour?.costFrom){
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid tour selected");
    }
    const amount = Number(tour.costFrom) * Number(payload.guestCount);

  const booking = await Booking.create([{
    user: userId,
    status: BOOKING_STATUS.PENDING,
    ...payload
  }],{session});

  const payment = await Payment.create([{
    booking: booking[0]._id,
    status: PAYMENT_STATUS.UNPAID,
    transactionId:transactionId,
    amount:amount,
  }],{session});
   const updatedBooking = await Booking.
   findByIdAndUpdate(booking[0]._id, { payment: payment[0]._id }, { new: true }).
   populate("user","name email phone address").populate("tour","title constFrom").populate("payment");
   await session.commitTransaction();
   session.endSession();

 return updatedBooking;
        
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
 
};


const getUserBookings = async () => {

    return {}
};

const getBookingById = async () => {
    return {}
};

const updateBookingStatus = async (

) => {

    return {}
};

const getAllBookings = async () => {

    return {}
};

export const BookingService = {
    createBooking,
    getUserBookings,
    getBookingById,
    updateBookingStatus,
    getAllBookings,
};