const express = require("express");
const router = express.Router();
const Company = require("../Models/Company");
const Ledger = require("../Models/LedgerSchema");

module.exports = {
  createLedger: async (req, res) => {
    try {
      console.log(req.body);
      const details = req.body;
      const { id } = req.params;
      console.log(id);

      const ledger = await new Ledger({
        ledger_name: details.ledger_name,
        customer_name: details.customer_name,
        Customer_address: details.Customer_address,
        group: details.group,
      }).save();
      console.log("hh");
      const addToledger = await Company.findByIdAndUpdate(id, {
        $push: { ledger: ledger._id },
      });

      res.status(200).json({ message: "Ledger created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getLedgerById: async (req, res) => {
    try {
      const { id } = req.params;
      const ledger = await Ledger.findById(id);
      res.status(200).json(ledger);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllLedger: async (req, res) => {
    try {
      const { id } = req.params;
      const ledgers = await Company.findById(id).populate("ledger").sort({ updatedAt: -1 });
      res.status(200).json(ledgers.ledger);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  editLedger: async (req, res) => {
    try {
      const { ledgerId } = req.params;
      const details = req.body;

      const updated = await Ledger.findByIdAndUpdate(
        ledgerId,
        {
          ledger_name: details.ledger_name,
          customer_name: details.customer_name,
          Customer_address: details.Customer_address,
          group: details.group,
        },
        {
          new: true,
        }
      );

      res.status(200).json({ message: "Ledger Updated Successfully" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  deleteLedger : async (req,res)=>{
    try {
        const {ledgerId} = req.params
        const {comId} = req.body
        const deleted = await Ledger.findByIdAndDelete(ledgerId)
        const removeFromLedgerArray = await Company.findByIdAndUpdate(comId, {
            $pull: { ledger: ledgerId },
        })

        res.status(200).json({ message: "Ledger deleted Successfully" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
  }
};
