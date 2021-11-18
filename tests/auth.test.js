const validateRegisterInput = require("../validators/register");
const validateLoginInput = require("../validators/login");

describe('User Registration Tests', () => {
    test('throw an error if no input is provided', () => {
        expect(validateRegisterInput({
            username: "Awais",
            email: "awais@gmail.com",
            password: "12345678",
            confirmPassword: "12345678",
            contact: "12345678",
        }));
    });

    test('throw an error if Any single input is not provided', () => {
        expect(validateRegisterInput({
            username: "Awais",
            email: "awais@gmail.com",
            password: "12345678",
            confirmPassword: "12345678",
            contact: "12345678",
        }))
    })

    test("throw an error if email is not valid", () => {
        expect(validateRegisterInput({
            username: "Awais",
            email: "awais123@mexil.com",
            password: "12345678",
            confirmPassword: "12345678",
            contact: "12345678",
        }))
    })

    test("throw an error if password is less than 8 characters", () => {
        expect(validateRegisterInput({
            username: "Awais",
            email: "awais@gmail.com",
            password: "12345678",
            confirmPassword: "12345678",
            contact: "12345678",
        }))
    });

});

describe('User Login Tests', () => {
    test('throw an error if no input is provided', () => {
        expect(validateLoginInput({
            email: "awais@gmail.com",
            password: "12345678",
        }));
    });

    test('throw an error if Any single input is not provided', () => {
        expect(validateLoginInput({
            email: "awais@asd.com",
            password: "12345678",
        }))
    });

    test("throw an error if email is not valid", () => {
        expect(validateLoginInput({
            email: "awais@gmail.com",
            password: "12345678",
        }))
    })

})