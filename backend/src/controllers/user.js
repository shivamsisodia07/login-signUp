import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (user_id) => {
  try {
    const user = await User.findById(user_id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    // console.log({accessToken,refreshToken});
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const RegisterUser = asyncHandler(async (req, res) => {
  const { email, fullName, password } = req.body;
  console.log(req.body);
  if ([email, password, fullName].some((feild) => feild?.trim() === "")) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "User with email already exists"));
  }

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // let coverImageLocalPath;
  // if (
  //   req?.files &&
  //   Array.isArray(req.files.coverImage) &&
  //   req.files.coverImage.length > 0
  // ) {
  //   coverImageLocalPath = req?.files.coverImage[0].path;
  // }

  // if (!avatarLocalPath) {
  //   throw new ApiError(400, "Avatar file is required");
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath);
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  // if (!avatar) {
  //   throw new ApiError(400, "Avatar file is required");
  // }
  // // const avatar = "";
  // // const coverImage = "";

  console.log("started ");
  const user = await User.create({
    email:email,
    fullName:fullName,
    password:password,
    avatar:"",
    coverImage:"",
  });
  console.log("ended ");
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          {},
          "Something went wrong while registering the user"
        )
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    // console.log("email is required!!");
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "email is required!!"));
  }

  // const user = await User.findOne({
  //   $or: [{ email }, { userName }],
  // });

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "user doesn't exits!!"));
  }
  // console.log(user);
  const ValidatePassword = await user.isPasswordCorrect(password);

  if (!ValidatePassword) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid user credentails!!"));
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "--password --refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully"
      )
    );
});

const LogOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully!!"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingToken) {
    throw new ApiError(401, "unauthorized request");
  }
  try {
    const decodedToken = Jwt.verify(
      incomingToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    // console.log(decodedToken);
    if (!decodedToken) {
      throw new ApiError(401, "unauthorized request");
    }

    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) {
      throw new ApiError(401, "unauthorized refresh");
    }
    // console.log(user);
    if (user?.refreshToken !== incomingToken) {
      throw new ApiError(401, "refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);
    // console.log(accessToken,newRefreshToken);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            refreshToken: newRefreshToken,
            accessToken,
          },
          "access token is refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, "something went wrong while refreshing token");
  }
});

//http://localhost:8000/api/v1/users/register
export { RegisterUser, LoginUser, LogOutUser, refreshAccessToken };
