const authmodels = require("../Models/authModel");
const usermodels = require("../Models/userModel");
const providermodels = require("../Models/providerModel");
const entrepreneurmodels = require("../Models/entrepreneurModel");

const userModel = usermodels.user; 
const authModel = authmodels.auth;
const providerModel = providermodels.provider;
const entrepreneurModel = entrepreneurmodels.entrepreneur;

const bcrypt = require("bcrypt");

// -------------------------------Registration ------------------------------//
exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const authparam = {
      email: req.body.email,
      password: hashedPassword,
      usertype: req.body.usertype,
    };
    const auth = await authModel.create(authparam);

    const userparam = {
      // User Details
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      contact: req.body.contact,
      authid: auth._id, //fetching authentication details into userparam
    };
    await userModel.create(userparam);
    res.json("success");
  } catch (error) {
    console.error("Error Occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// -------------------------------Logging In ------------------------------//
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the auth document based on email
    const authenticate = await authModel.findOne({ email });

    if (authenticate) {
      // Check if password matches
      const isPasswordValid = await bcrypt.compare(
        password,
        authenticate.password
      );
      if (isPasswordValid) {
        let user;
        if (authenticate.usertype === 1) {
          // Service Provider
          user = await providerModel
            .findOne({ authid: authenticate._id })
            .populate("authid");
        } else if (authenticate.usertype === 2) {
          user = await entrepreneurModel
            .findOne({ authid: authenticate._id })
            .populate("authid");
        } else {
          // Admin user
          user = await userModel
            .findOne({ authid: authenticate._id })
            .populate("authid");
        }

        if (user) {
          // Set session with user details
          req.session.user = user;
          // Return user
          res.json(user);
        } else {
          // User not found
          res.status(404).json("User not found");
        }
      } else {
        // Invalid password
        res.status(401).json("Invalid password");
      }
    } else {
      // Invalid email
      res.status(404).json("Invalid email");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ----------------------------- Service Provider Registration -------------------------------------

exports.providerSignup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const authparam = {
      email: req.body.email,
      password: hashedPassword,
      usertype: req.body.usertype,
    };
    const auth = await authModel.create(authparam);

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
    console.error("Error Occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.entrepreneurSignup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const authparam = {
      email: req.body.email,
      password: hashedPassword,
      usertype: req.body.usertype,
    };
    const auth = await authModel.create(authparam);

    const entrepreneurparam = {
      entrepreneurname: req.body.entrepreneurname,
      contact: req.body.contact,
      address: req.body.address,
      authid: auth._id,
    };
    await entrepreneurModel.create(entrepreneurparam);
    res.json("success");
  } catch (error) {
    console.error("Error Occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
