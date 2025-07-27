import { Types } from "mongoose";
export interface ITourType {
    name: string;}
export interface ITour {
    title: string;
    slug: string;
    thumbnail?: string;
    images?: string[];
    description?: string;
    location?: string;
    costFrom?: number;
    departureLocation?: string;
    arrivalLocation?: string;
    startDate?: Date;
    endDate?: Date;
    included?: string[];
    excluded?: string[];
    amenities?: string[];
    maxGuests?: number;
    minAge?: number;
    division:Types.ObjectId
    tourPlan?: string;
    tourType:Types.ObjectId
    createdAt?: Date;

}
