const User = require("../models/user.model");
const validation = require("../utils/validations");
const encription = require("../utils/encryptPassword");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const validateForm = validation.signUpFormValidation(req, res);

    if (validateForm.error) {
      return res.status(500).send(validateForm.errorMessage);
    }

    const otp = Math.round(Math.random() * 10000000)

    const data = {
      fullName: req.body.fullName.trim(),
      email: req.body.email.trim().toLowerCase(),
      phone: req.body.phone.trim(),
      password: encription.encryptPassword(req.body.password.trim()),
      emailOtp: 111111
    };

    const userExists = await User.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    if (userExists) {
      return res.status(501).send("User already exists");
    }

    const user = new User({ ...data });

    await user.save();
    return res.send(user);
  } catch (e) {
    return res.send(e);
  }
};

exports.signIn = async (req, res) => {
  try {
    const validateForm = validation.signInFormValidation(req, res);

    if (validateForm.error) {
      return res.status(500).send(validateForm.errorMessage);
    }

    const user = await User.findOne({
      email: req.body.email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (!encription.validatePassword(req.body.password.trim(), user.password)) {
      return res.status(401).send("Auth failed");
    }

    const payload = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const accessToken = jwt.sign(
      {
        data: payload,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ accessToken, fullName: user.fullName });
  } catch (e) {
    return res.send(e);
  }
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email.trim().toLowerCase(),
  });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const tUser = user;

  delete tUser.password;

  return res.send(tUser);
};

exports.updateUser = async (req, res) => {
  try {
    let data;

    if (req.body.fullName) {
      data = {
        fullName: req.body.fullName.trim(),
      };
    }

    if (req.body.email) {
      data = {
        ...data,
        email: req.body.email.trim().toLowerCase(),
      };
    }

    if (req.body.phone) {
      data = {
        ...data,
        phone: req.body.phone.trim(),
      };
    }

    if (data) {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          ...data,
        },
        { new: true }
      );

      return res.send(user);
    } else {
      return res.send("Nothing to update");
    }
  } catch (e) {
    return res.send(e);
  }
};

exports.changePassword = async (req, res) => {
  try{
    const user = User.findOne({email: req.body.email}, {
      password: encription.encryptPassword(req.body.password)
    })

    return res.send('Password updated successfully')
  } catch(e) {
    return res.send(e)
  }
}

exports.signUpOTP = async (req, res) => {

  try{

    if (req.body.email.trim() === "") {
      return res.status(500).send('Email is required')
    }
    
    const user = await User.findOne({email: req.body.email.trim().toLowerCase()})

    if (!user) {
      return res.status(404).send('User not found')
    }

    if (!user.emailConfirmed) {
      return res.status(500).send('Email already confirmed')
    }

    // const otp = Math.round(Math.random() * 10000000)
    user.emailConfirmed = true
    // user.emailOtp = 111111 //otp
    
    user.save()

    return res.send('OTP Sent')

  }catch (e) {
    return res.send('Error occurred')
    console.log(e)
  }


}
