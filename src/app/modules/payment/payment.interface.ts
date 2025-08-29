/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export enum PAYMENT_STATUS{
    PENDING = "PENDING",
    UNPAID = "UNPAID",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}

export interface IPayment{

    booking:Types.ObjectId,
    transactionId:string,
    amount:number,
    paymentGatewayData?:any,
    invoiceUrl?:string,
    status:PAYMENT_STATUS
}


