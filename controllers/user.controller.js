const User = require("../models/user.model");

exports.signUp = async (req, res) => {
  try {
    const validation = signUpFormValidation(req, res);

    if (validation.error) {
      return res.status(500).send(validation.errorMessage);
    }

    const user = new User({
      ...req.body,
    });

    await user.save();

    return res.send(user);
  } catch (e) {
    console.log(e);
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
