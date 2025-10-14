const mongoose = require('mongoose');

// Define the schema for the Driver model
const driverSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false
  },
  // Section 1: Company and Vehicle Details
  companyDetails: {
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    regIdNumber: {
      type: String,
      required: true,
      trim: true
    },
    licenseDiskDate: {
      type: Date,
      required: true
    },
    vatNumber: {
      type: String,
      required: false, // This field is optional
      trim: true
    },
    vehicleType: {
      type: String,
      required: true,
      trim: true
    },
    vehicleMake: {
      type: String,
      required: true,
      trim: true
    },
    vehicleModel: {
      type: String,
      required: true,
      trim: true
    },
    vinNumber: {
      type: String,
      required: true,
      unique: true, // VIN numbers are unique identifiers
      trim: true
    },
    vehicleColor: {
      type: String,
      required: true,
      trim: true
    }
  },

  // Section 2: User Details
  userDetails: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email addresses must be unique
      trim: true,
      lowercase: true // Store emails in lowercase for consistency
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  bankDetails: {
    accountHolderName: {type: String},
    bankName: {type: String},
    accountNumber: {type: Number},
    branchCode: {type: String},
    accountType: {type: String},
  }
}, {timestamps: true});

// Export the Driver model
const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
