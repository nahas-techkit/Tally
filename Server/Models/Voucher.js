const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const voucherSchema = mongoose.Schema(
  {
    voucher_name: {
      type: String,
      required: [true, "ledger name is required"],
      trim: true,
    },
    customer_name: {
      type: String,
      required: true,
      trim: true,
    },
    Customer_address: {
      type: String,
      required: true,
    },

    group: {
      type: String,
      required: [true, "group is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Voucher", voucherSchema);
