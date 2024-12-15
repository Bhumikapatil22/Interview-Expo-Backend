import companyModel from "../models/companyModel.js";

export const createCompany=async(req,res)=>{
    try{
        console.log("Received Data:", req.body); // Log the data received in the backend

       const {logo,name,location,industry,role}=req.body;

       const company=new companyModel({
        logo,name,location,industry,role
       })

       const savedCompany= await company.save();

       res.status(201).json({company:savedCompany,
       message:"Company created successfully"});
    }
    catch (error) {
        console.error("Error while creating company:", error); // Log the actual error to the console
        res.status(500).json({ message: "Error while creating company" });
    }
    
}

export const getAllCompanies = async (req, res) => {
   
    try {
        const companies = await companyModel
            .find()
            .populate("question"); // Populate questions here
        
        // Send the populated data
        return res.json({ companies });
    } catch (error) {
        console.error("Error while fetching companies:", error);
        return res.status(400).json({
            error: "Error while fetching companies",
        });
    }
};
