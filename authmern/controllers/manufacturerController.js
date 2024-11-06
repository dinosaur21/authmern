const Manufacturer = require('../models/Manufacturer');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const { companyName, registrationNumber, businessEmail, address, password } = req.body;

  // Check if manufacturer already exists
  const manufacturerExists = await Manufacturer.findOne({ businessEmail });
  if (manufacturerExists) {
    throw new BadRequestError('Email already registered');
  }

  const manufacturer = await Manufacturer.create({
    companyName,
    registrationNumber,
    businessEmail,
    address,
    password,
  });

  const token = manufacturer.createJWT();
  res.status(StatusCodes.CREATED).json({
    manufacturer: {
      companyName: manufacturer.companyName,
      businessEmail: manufacturer.businessEmail,
      verificationStatus: manufacturer.verificationStatus,
    },
    token,
  });
};

const login = async (req, res) => {
  const { businessEmail, password } = req.body;

  if (!businessEmail || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const manufacturer = await Manufacturer.findOne({ businessEmail });
  if (!manufacturer) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await manufacturer.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = manufacturer.createJWT();
  res.status(StatusCodes.OK).json({
    manufacturer: {
      companyName: manufacturer.companyName,
      businessEmail: manufacturer.businessEmail,
      verificationStatus: manufacturer.verificationStatus,
    },
    token,
  });
};

const updateManufacturerProfile = async (req, res) => {
  const { companyName, address } = req.body;
  const manufacturerId = req.user.userId;

  const manufacturer = await Manufacturer.findByIdAndUpdate(
    manufacturerId,
    { companyName, address },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({
    manufacturer: {
      companyName: manufacturer.companyName,
      businessEmail: manufacturer.businessEmail,
      address: manufacturer.address,
      verificationStatus: manufacturer.verificationStatus,
    },
  });
};

module.exports = {
  register,
  login,
  updateManufacturerProfile,
};