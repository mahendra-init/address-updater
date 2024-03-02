import { isValidObjectId } from "mongoose";
import Address from "../model/address.model.js";

const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json({
      status: "success",
      data: addresses,
      message: "All the addressess are fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      data: [],
      message: "Failed to fetch addressess!",
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const { street, city, state, zip } = req.body;
    let existingAddr = await Address.findOne({
      $and: [{ street }, { city }, { state }, { zip }],
    });
    if (existingAddr) {
      throw new Error();
    }

    const newAddress = await Address.create(req.body);

    res.status(201).json({
      status: "success",
      data: newAddress,
      message: "Address has been created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      status: "failure",
      data: [],
      message: "Failed to create new address!",
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    console.log(req.body);
    if (!isValidObjectId(req.body._id)) {
      throw new Error("Invalid address ID!");
    }

    const { street, city, state, zip } = req.body;
    let existingAddr = await Address.findOne({
      $and: [{ street }, { city }, { state }, { zip }],
    });
    if (existingAddr) {
      throw new Error();
    }

    const address = await Address.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!address) {
      throw new Error();
    }

    return res.status(200).json({
      status: "success",
      data: address,
      message: "Address updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failure",
      data: [],
      message: "Failed to update the address!",
    });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw new Error("Invalid address ID!");
    }
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      throw new Error("No such address found!");
    }
    return res.status(200).json({
      status: "success",
      data: [],
      message: "Address deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      data: [],
      message: "Failed to delete the address!",
    });
  }
};

export { getAddress, addAddress, updateAddress, deleteAddress };
