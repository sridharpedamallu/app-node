const User = require("../models/user.model");

exports.signUp = async (req, res) => {
  try {
    const validation = signUpFormValidation(req, res);

    if (validation.error) {
      return res.status(500).send(validation.errorMessage);
    }

    const data = {
      fullName: req.body.fullName.trim(),
      email: req.body.email.trim().toLowerCase(),
      phone: req.body.phone.trim(),
      password: req.body.password.trim(),
    };

    const userExists = await User.findOne({ $or: [{ email: data.email }, { phone: data.phone }] });

    if(userExists) {
      return res.status(500).send('User Already exists');
    }

    const user = new User({ ...data });

    await user.save();
    return res.send(user);
  } catch (e) {
    return res.send(e);
  }
};

signUpFormValidation = (req, res) => {
  const postData = { ...req.body };
  let error = false;
  let errorMessage = "Insufficient data ";

  if (!postData.fullName || postData.fullName.trim() === "") {
    error = true;
    errorMessage = `${errorMessage} - Fullname `;
  }

  if (!postData.email || postData.email.trim() === "") {
    error = true;
    errorMessage = `${errorMessage} - Email `;
  }

  if (!postData.phone || postData.phone.trim() === "") {
    error = true;
    errorMessage = `${errorMessage} - Phone `;
  }

  if (!postData.password || postData.password.trim() === "") {
    error = true;
    errorMessage = `${errorMessage} - Password `;
  }

  return { error, errorMessage };
};
