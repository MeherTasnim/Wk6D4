const checkPasswordStrength = (req, res, next) => {
  try {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = '!@#$%^&*()_+-=[]{};\\:"|,.<>/?';

    let hasUppercase = false;
    let hasSymbol = false;

    //grab the password
    const password = req.body.password;
    //go over each character and find out if it's uppercase/lower/number/etc
    for (let i = 0; i < password.length; i++) {
      //check if character is either uppercase or a symbol
      const currChar = password[i];
      if (uppercaseLetters.includes(currChar)) {
        hasUppercase = true;
      } else if (symbols.includes(currChar)) {
        hasSymbol = true;
      }
    }

    //if it passes, let it go through
    if (hasUppercase && hasSymbol) {
      next();
    }
    //if it doesn't pass throw an error
    else {
      throw new Error(
        "Password must contain at least one uppercase character and one special character."
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = checkPasswordStrength;
