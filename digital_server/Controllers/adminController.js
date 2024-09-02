const providermodels = require("../Models/providerModel");
const authmodels = require("../Models/authModel");
const servicesmodels = require("../Models/servicesModel");
const customermodels = require("../Models/userModel");
const entrepreneursmodels = require("../Models/entrepreneurModel");
const ordermodels = require("../Models/orderModel");
const bcrypt = require("bcrypt");

const providerModel = providermodels.provider;
const authModel = authmodels.auth;
const serviceModel = servicesmodels.services;
const customerModel = customermodels.user;
const entrepreneurModel = entrepreneursmodels.entrepreneur;
const orderModel = ordermodels.Order;


// -----------------------Add Service Providers------------------------------//

exports.AddServiceProvider = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const loginparam = {
      email: req.body.email,
      password: hashedPassword,
      usertype: req.body.usertype,
    };
    const auth = await authModel.create(loginparam);

    const providerparam = {
      providername: req.body.providername,
      contact: req.body.contact,
      type: req.body.type,
      address: req.body.address,
      authid: auth._id,
    };
    await providerModel.create(providerparam);
    res.json("success");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// -----------------------View/Fetch Servie Providers------------------------------//
exports.viewServiceProviders = async (req, res) => {
  try {
    const providers = await providerModel.find().populate("authid");
    res.json(providers);
  } catch (error) {
    console.error("Error fetching providers :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------Delete Servie Providers------------------------------//

exports.deleteServiceProvider = async (req, res) => {
  try {
    const providerId = req.body.id;
    const provider = await providerModel.findById(providerId);

    if (!provider) {
      return res.status(404).json({ error: "State not found" });
    }

    // Delete associated auth details
    await authModel.findByIdAndDelete(provider.authid);

    // Delete the state
    await providerModel.findByIdAndDelete(providerId);

    res.json({
      message: "State and associated auth details deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting state:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the state" });
  }
};

// -----------------------Update Servie Providers by ID------------------------------//

exports.updateServiceProviderById = async (req, res) => {
  try {
    const providerDetails = await providerModel
      .findById(req.body.id)
      .populate("authid");
    if (!providerDetails) {
      return res.status(404).json({ error: "Service provider not found" });
    }

    res.json({
      providerDetails,
      authDetails: providerDetails.authid,
    });
  } catch (error) {
    console.error("Error in fetching provider details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the provider details" });
  }
};

// -----------------------edit And Update Servie Providers by ID------------------------------//

exports.editAndUpdateServiceProvider = async (req, res) => {
  try {
    const providerDetails = {
      providername: req.body.providername,
      contact: req.body.contact,
      type: req.body.type,
      address: req.body.address,
    };
    await providerModel.findByIdAndUpdate(req.body.id, providerDetails);

    const loginDetails = {
      email: req.body.email,
      userstatus: req.body.userstatus,
    };
    await authModel.findByIdAndUpdate(req.body.authid, loginDetails);

    res.json("updated");
  } catch (error) {
    console.error("Error in updating provider:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the provider" });
  }
};

// -----------------------Add Services------------------------------//
exports.AddServices = async (req, res) => {
    try {
        const servicesparam = {
            servicename: req.body.servicename,
        };
        await serviceModel.create(servicesparam);
        res.json("success");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// -----------------------Delete Services------------------------------//

exports.deleteService = async (req, res) => {
    try {
        const serviceId = req.body.id;
        const service = await serviceModel.findById(serviceId);
        
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        
        // Delete the Service
        await serviceModel.findByIdAndDelete(serviceId);
        
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error("Error in deleting Service:", error);
        res.status(500).json({ error: "An error occurred while deleting the Service" });
    }
};


// -----------------------View Services------------------------------//
exports.viewServices = async (req, res) => {
    try {
      const services = await serviceModel.find();
      res.json(services);
    } catch (error) {
      console.error("Error fetching Services :", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // -----------------------Update Servie Providers by ID------------------------------//

exports.updateServiceById = async (req, res) => {
  try {
    const serviceDetails = await serviceModel
      .findById(req.body.id)
      .populate();
    if (!serviceDetails) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({
      serviceDetails
    });
  } catch (error) {
    console.error("Error in fetching Service details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Service details" });
  }
};


// -----------------------edit And Update Servie Providers by ID------------------------------//

exports.editAndUpdateServiceCategory = async (req, res) => {
  try {
    const serviceDetails = {
      servicename: req.body.servicename,
    };
    await serviceModel.findByIdAndUpdate(req.body.id, serviceDetails);

    res.json("updated");
  } catch (error) {
    console.error("Error in updating provider:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the provider" });
  }
};



// --------------------Customers CRUD------------------------

exports.viewcustomers = async (req, res) => {
  try {
    const customers = await customerModel.find({}).populate("authid");
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// --------------------Entrepreneurs CRUD------------------------

exports.viewEntrepreneurs = async (req, res) => {
  try {
    const entrepreneur = await entrepreneurModel.find().populate("authid");
    res.json(entrepreneur);
  } catch (error) {
    console.error("Error fetching entrepreneurs :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.vieworders = async (req, res) => {
  try {
    const entrepreneur = await orderModel.find().populate("authid");
    res.json(entrepreneur);
  } catch (error) {
    console.error("Error fetching entrepreneurs :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


