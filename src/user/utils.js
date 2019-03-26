const bcrypt = require("bcrypt");
const { isNil } = require("ramda");
const jwt = require("jsonwebtoken");
const { findUserById } = require("./model");

const areFieldsMissing = ({ firstName, lastName, pseudo }) =>
  isNil(firstName) || isNil(lastName) || isNil(pseudo);

const arePasswordsTheSame = (password, checkPassword) =>
  password === checkPassword;

const hashPassword = password => bcrypt.hash(password, process.env.SALT);

const checkPassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

const generateJWT = userId => jwt.sign({ userId }, process.env.JWT_SECRET_KEY);

const checkJWT = async token => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await findUserById(userId);
    return user ? true : false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  areFieldsMissing,
  arePasswordsTheSame,
  hashPassword,
  checkPassword,
  generateJWT,
  checkJWT
};
