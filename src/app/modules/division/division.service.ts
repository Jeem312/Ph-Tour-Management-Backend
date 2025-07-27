import { QueryBuilder } from "../../utils/QueryBuilder";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {
//   const baseSlug = payload.name.toLowerCase().split(" ").join("-");
//   let slug = `${baseSlug}-division`;
//   let counter = 0;
  
//   while (await Division.exists({ slug })) {
//     slug = `${baseSlug}-division-${++counter}`;
//   }


 

    const existingDivision = await Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new Error("A division with this name already exists.");
    }


// payload.slug = slug;
    const division = await Division.create(payload);

    return division
};

const getAllDivisions = async (query: Record<string, string>) => {
   const queryBuilder = new QueryBuilder(Division.find(),query);
   const searchAbleFields = ["name", "description"];
   const divisions = await queryBuilder
   .filter()
   .sort()
   .paginate()
   .fields()
    .search(searchAbleFields)

    const [data,meta] = await Promise.all([
    divisions.build(),
    queryBuilder.getMeta()
])
  
   return {
       data: data,
       meta: meta
   };
};

const getSingleDivision = async (slug:string) => {
    const division = await Division.findOne({ slug });
    if (!division) {
        throw new Error("Division not found.");
    }
    return {
        data: division,
       
    }
};

const updateDivision = async (id: string, payload: Partial<IDivision>) => {

    const existingDivision = await Division.findById(id);
    if (!existingDivision) {
        throw new Error("Division not found.");
    }

    const duplicateDivision = await Division.findOne({
        name: payload.name,
        _id: { $ne: id },
    });

    if (duplicateDivision) {
        throw new Error("A division with this name already exists.");
    }

//  const baseSlug = payload.name.toLowerCase().split(" ").join("-");
//   let slug = `${baseSlug}-division`;
//   let counter = 0;
  
//   while (await Division.exists({ slug })) {
//     slug = `${baseSlug}-division-${++counter}`;
//   }
// payload.slug = slug;

    const updatedDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

    return updatedDivision

};

const deleteDivision = async (id: string) => {
    await Division.findByIdAndDelete(id);
    return null;
};

export const DivisionService = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};