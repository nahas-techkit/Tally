const express = require("express");
const router = express.Router();
const Company = require("../Models/Company");
const Voucher = require("../Models/Voucher");

module.exports = {
  createVoucher: async (req, res) => {

    try {
      
      const details = req.body;
      const { id } = req.params;
      console.log(id);

      const voucher = await new Voucher({
        voucher_name: details.voucher_name,
        customer_name: details.customer_name,
        Customer_address: details.Customer_address,
        group: details.group,
      }).save();
      console.log("hh");
      const addToVoucher = await Company.findByIdAndUpdate(id, {
        $push: { voucher: voucher._id },
      });

      res.status(200).json({ message: "Voucher created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getVoucherById: async (req, res) => {

    try {
      const { id } = req.params;
      console.log(id);
      const voucher = await Voucher.findById(id);
      res.status(200).json(voucher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllVouchers: async (req, res) => {
    try {
      const { id } = req.params;
      const vouchers = await Company.findById(id).populate("voucher").sort({ updatedAt: -1 });

      res.status(200).json(vouchers.voucher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  editVoucher: async (req, res) => {
    try {
      const { voucherId } = req.params;
      const details = req.body;

      const updated = await Voucher.findByIdAndUpdate(
        voucherId,
        {
          voucher_name: details.voucher_name,
          customer_name: details.customer_name,
          Customer_address: details.Customer_address,
          group: details.group,
        },
        {
          new: true,
        }
      );

      res.status(200).json({ message: "Voucher Updated Successfully" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  deleteVoucher : async (req,res)=>{
    try {
        const {voucherId} = req.params
        const {comId} = req.body
        const deleted = await Voucher.findByIdAndDelete(voucherId)
        const removeFromVoucherArray = await Company.findByIdAndUpdate(comId, {
            $pull: { voucher: voucherId },
        })

        res.status(200).json({ message: "Voucher deleted Successfully" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
  }
};
