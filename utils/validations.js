

exports.signUpFormValidation = (req, res) => {
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
exports.updateFormValidation = (req, res) => {
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
  
  
    return { error, errorMessage };
  };

  exports.signInFormValidation = (req, res) => {
    const postData = { ...req.body };
    let error = false;
    let errorMessage = "Insufficient data ";
  
    if (!postData.email || postData.email.trim() === "") {
      error = true;
      errorMessage = `${errorMessage} - Email `;
    }
  
    if (!postData.password || postData.password.trim() === "") {
      error = true;
      errorMessage = `${errorMessage} - Password `;
    }
  
    return { error, errorMessage };
  };
