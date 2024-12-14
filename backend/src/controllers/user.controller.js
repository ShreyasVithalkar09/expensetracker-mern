import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

// register user
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, fullname } = req.body;

  if (
    [username, email, fullname, password].some((field) => field?.trim === "")
  ) {
    throw new ApiError(400, "All fields are required!", []);
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists!", []);
  }

  const avatar = `https://avatar.iran.liara.run/username?username=${fullname}`;

  //     create user
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fullname,
    avatar
  });

  const userCreated = await User.findById(user?._id).select("-password");

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: userCreated },
        "User registered successfully!"
      )
    );
});

// login
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  if ([username, email, password].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are required!", []);
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist!", []);
  }

  //     validate the pwd
  const isValidatedPassword = await user.validatePassword(password);
  if (!isValidatedPassword) {
    throw new ApiError(403, "Invalid credentials!", []);
  }

  const accessToken = await user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  //    cookie options
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).cookie("accessToken", accessToken, options).json(
    new ApiResponse(
      200,
      {
        loggedInUser,
        accessToken,
      },
      "User logged In successfully!"
    )
  );
});

// logout
const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", undefined, options)
    .json(new ApiResponse(200, {}, "User logged Out successfully!"));
});

export { registerUser, loginUser, logoutUser };
