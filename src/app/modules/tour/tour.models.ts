import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";

const tourTypeSchema = new Schema<ITourType>({
    name: { type: String, required: true, unique: true },
   
}, {
    timestamps: true,
});

export const TourType = model<ITourType>("TourType", tourTypeSchema);

const tourSchema = new Schema<ITour>({
    title:{type: String, required: true, unique: true},
    slug:{type: String, required: true, unique: true},
    thumbnail:{type: String},
    images:{type: [String], default: []},
    description:{type: String},
    location:{type: String},
    costFrom:{type: Number},
    startDate:{type: Date},
    endDate:{type: Date},
    included:{type:String,default: []},
    excluded:{type: String,default: []},
    amenities:{type: String,default: []},
    maxGuests:{type: Number},
    minAge:{type: Number},
    division:{type: Schema.Types.ObjectId, ref: "Division",required: true},
    tourPlan:{type: String},
    tourType:{type: Schema.Types.ObjectId, ref: "TourType",required: true},
    createdAt: {type: Date, default: Date.now},
},{
    timestamps: true,
})
export const Tour = model<ITour>("Tour", tourSchema);