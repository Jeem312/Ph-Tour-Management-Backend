import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";

const tourTypeSchema = new Schema<ITourType>({
    name: { type: String, required: true, unique: true },
   
}, {
    timestamps: true,
});

export const TourType = model<ITourType>("TourType", tourTypeSchema);

const tourSchema = new Schema<ITour>({
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    images: { type: [String], default: [] },
    description: { type: String },
    location: { type: String },
    costFrom: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    departureLocation: { type: String },
    arrivalLocation: { type: String },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    maxGuests: { type: Number },
    minAge: { type: Number },
    division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    tourPlan: { type: [String], default: [] },
    tourType: { type: Schema.Types.ObjectId, ref: "TourType", required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });



tourSchema.pre("save",async function(next){
    if(this.isModified("title")){
         const baseSlug = this.title.toLowerCase().split(" ").join("-");
  let slug = `${baseSlug}-tour`;
  let counter = 0;

  while (await Tour.exists({ slug })) {
    slug = `${baseSlug}-tour-${++counter}`;
  }
  this.slug = slug;
  }
  next();
})
tourSchema.pre("findOneAndUpdate", async function(next) {
  const tour = this.getUpdate() as Partial<ITour>;
  if (tour.title) {
    const baseSlug = tour.title.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-tour`;
    let counter = 0;

    while (await Tour.exists({ slug })) {
      slug = `${baseSlug}-tour-${++counter}`;
    }
    tour.slug = slug;
  }
  this.setUpdate(tour);
  next();
})

export const Tour = model<ITour>("Tour", tourSchema);