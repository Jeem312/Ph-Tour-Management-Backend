import { model, Schema } from "mongoose";
import { IPayment, PAYMENT_STATUS } from "./payment.interface";

const paymentSchema = new Schema<IPayment>({

    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    paymentGatewayData: { type: Schema.Types.Mixed },
    invoiceUrl: { type: String },
    status: { type: String, enum: Object.values(PAYMENT_STATUS), default: PAYMENT_STATUS.PENDING }
}, { timestamps: true });

const Payment = model<IPayment>("Payment", paymentSchema);

export default Payment;
