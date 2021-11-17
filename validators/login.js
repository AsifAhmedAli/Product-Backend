const Validator = require("validator");

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}


module.exports = function validateLoginInput(data) {
    let errors = {};

    if (!data) {
        errors.message = "No data was sent";
        return errors;
    }

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !data.email ? "" : data.email;
    data.password = !data.password ? "" : data.password;

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
        throw errors;
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
        throw errors;
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
        throw errors;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};