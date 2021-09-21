const Validator = require("validator");

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !data.name ? "" : data.name;
    data.email = !data.email ? "" : data.email;
    data.password = !data.password ? "" : data.password;
    data.contact = !data.contact ? "" : data.contact;
    data.username = !data.username ? "" : data.username;

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
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

    if (!Validator.isLength(data.password, { min: 7, max: 30 })) {
        errors.password = "Password must be at least 7 characters";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};