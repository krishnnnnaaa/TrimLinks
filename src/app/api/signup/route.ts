import { sendVerificationEmail } from "@/backer/verificationEmail";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { createTokenGenerator } from "cybertoken";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUser = await UserModel.findOne({email});
    console.log(existingUser);
    const token = createTokenGenerator({
      prefixWithoutUnderscore: "userkey",
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const verificationToken = token.generateToken();
      const verificationExpiry = new Date();
      verificationExpiry.setHours(verificationExpiry.getHours() + 5);
    //   console.log(name);

      const newUser = new UserModel({
        username,
        email,
        password: encryptedPassword,
        createdAt: new Date().toString().split(" ").splice(1, 4).join(" "),
        verificationToken,
        verificationTokenExpiry: verificationExpiry,
        urls: [],
      });

      await newUser.save();

      // sending verification email
      const verifyemail = await sendVerificationEmail(
        email,
        username,
        verificationToken
      );
      console.log(verifyemail);
      

      if (!verifyemail.success) {
        return Response.json(
          {
            success: false,
            message: "Failed to send verification email!",
          },
          { status: 400 }
        );
      }

      return Response.json(
        {
          success: true,
          message: "User created successfully, please confirm your email!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Something wents wrongs, ", error);
    return Response.json(
      {
        success: false,
        message: "Something wents wrongs!",
      },
      { status: 500 }
    );
  }
}
