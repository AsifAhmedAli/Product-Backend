const Validator = require("validator");

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

module.exports = function validateRegisterInput(data) {
    let errors = {};

    if (!data) {
        errors.message = "No data was sent";
        return errors;
    }

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !data.email ? "" : data.email;
    data.password = !data.password ? "" : data.password;
    data.confirmPassword = !data.confirmPassword ? "" : data.confirmPassword;
    data.contact = !data.contact ? "" : data.contact;
    data.username = !data.username ? "" : data.username;

    // Username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "username field is required";
    }
    // COntact checks
    if (Validator.isEmpty(data.contact)) {
        errors.contact = "contact field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = "Password must be at least 8 characters";
    }

    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};