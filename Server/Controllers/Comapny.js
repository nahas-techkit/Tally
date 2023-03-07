const express = require("express");
const router = express.Router();
const Company = require("../Models/Company");

module.exports = {
  // create a new comapny
  createCompany: async (req, res) => {
    try {
      const details = req.body;

      const comapny = await new Company({
        company_name: details.company_name,
        company_address: details.company_address,
        phoneNo: details.phoneNo,
        email: details.email,
        country: details.Country,
      }).save();

      res.status(200).json({ message: "Company created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //get all companies
  getAllcompanies: async (req, res) => {
    try {
      const comapnies = await Company.find().sort({ updatedAt: -1 });
      res.status(200).json(comapnies);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //get Comapny By Id
  getCompanyById: async (req, res) => {
    try {
      const id = req.params.id;
      const comapny = await Company.findById(id);
      res.status(200).json(comapny);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //Delete a Comapny
  deleteCompany: async (req, res) => {
    try {
      const { id } = req.params;
      const comapny = await Company.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: ": Your company was  Successfully deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //   Edit Comapny Details
  editComapnyDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      console.log(newData);

      const updated = await Company.findByIdAndUpdate(
        id,
        {
          company_name: newData.company_name,
          company_address: newData.company_address,
          phoneNo: newData.phoneNo,
          email: newData.email,
          country: newData.Country,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Updated Successfully", updated });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
