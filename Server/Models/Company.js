const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const companySchema = mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, "comapny name is required"],
      trim: true,
    },
    company_address: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
    },

    country: {
      type: String,
      require: true,
    },

    voucher: [
      {
        type: ObjectId,
        ref: "Voucher",
      },
    ],

    ledger: [
      {
        type: ObjectId,
        ref: "Ledger",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);
