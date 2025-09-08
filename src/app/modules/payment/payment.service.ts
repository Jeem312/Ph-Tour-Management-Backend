/* eslint-disable @typescript-eslint/no-explicit-any */



// const getTransactionId = () => {
//     return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
// }
import httpStatus from "http-status-codes";

import AppError from "../../errorHelpers/AppError";
import Booking from "../booking/booking.model";
import { ISSLCommerz } from "../sslCommerce/sslCommerce.interface";
import { SSLService } from "../sslCommerce/sslCommerce.service";
import Payment from "./payment.model";


const initPayment = async (bookingId: string) => {
    const payment = await Payment.findOne({ booking: bookingId })

    if (!payment) {
        throw new AppError(httpStatus.NOT_FOUND, "Payment Not Found. You have not booked this tour")
    }

    const booking = await Booking.findById(payment.booking)

    const userAddress = (booking?.user as any).address
    const userEmail = (booking?.user as any).email
    const userPhoneNumber = (booking?.user as any).phone
    const userName = (booking?.user as any).name

    const sslPayload: ISSLCommerz = {
        address: userAddress,
        email: userEmail,
        phoneNumber: userPhoneNumber,
        name: userName,
        amount: payment.amount,
        transactionId: payment.transactionId
    }

    const sslPayment = await SSLService.sslPaymentInit(sslPayload)

    return {
        paymentUrl: sslPayment.GatewayPageURL
    }

};




export const PaymentService = {
    initPayment
};