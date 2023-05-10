// 5. Create middleware controller that checks if req.body.password has at least one uppercase and special character. (There are two options for this, choose which is best for your student level)
const checkPasswordStrength = (req, res, next) => {
  try {
    const uppercaseRegex = /[A-Z]/;
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    const hasUppercase = uppercaseRegex.test(req.body.password);
    const hasSymbol = symbolRegex.test(req.body.password);

    if (hasUppercase && hasSymbol) {
      next();
    } else {
      throw new Error(
        "Password must contain at least one uppercase character and one special character"
      );
    }
  } catch (error) {
    next(error);
  }
};

// const checkPasswordStrength = (req, res, next) => {
//   try {
//     const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const symbols = '!@#$%^&*()_+-=[]{};\\:"|,.<>/?';

//     let hasUppercase = false;
//     let hasSymbol = false;

//     for (let i = 0; i < req.body.password.length; i++) {
//       const currentChar = req.body.password[i];

//       if (uppercaseLetters.includes(currentChar)) {
//         hasUppercase = true;
//       } else if (symbols.includes(currentChar)) {
//         hasSymbol = true;
//       }
//     }

//     if (hasUppercase && hasSymbol) {
//       next();
//     } else {
//       throw new Error(
//         "Password must contain at least one uppercase character and one special character"
//       );
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// 6. Export middleware
module.exports = checkPasswordStrength;
