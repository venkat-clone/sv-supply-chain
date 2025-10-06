const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (data) => {
  const { name, phone, password } = data;
  const existingUser = await UserRepository.getUserByPhone(phone);
  if (existingUser) {
    throw new Error("User with this phone number already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  data.password = hashedPassword;
  const newUser = await UserRepository.createUser({ name, phone, password,
    role:{
    connect:{
      name:'user'
    }
    }
  });
  const token = jwt.sign(
    {
      userId: newUser.id,
    },
    process.env.JWT_SECRET || "your_jwt_secret_key",
    {
      expiresIn: "1h",
      subject: String(newUser.id),
      issuer: "yourappname",
    }
  );
  newUser.token = token;
  return newUser;
};

const login = async (phone, password) => {
  const user = await UserRepository.getUserByPhone(phone, {
    includePassword: true,
  });
  console.debug(user);
  if (!user) {
    throw new Error("Invalid phone number ");
  }
  bcrypt.compare(password, user.password);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.token = token;
  return user;
};

module.exports = {
  register,
  login,
};
