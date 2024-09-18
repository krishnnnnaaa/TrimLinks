import dbConnect from "@/lib/dbConnect";
import { User, UserModel } from "@/model/User";

export async function POST(request: Request) {
  dbConnect();

  try {
    const { email, urlID } = await request.json();

    const user = (await UserModel.findOne({ email })) as User;

    const modifiedObj = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { urls: { _id: urlID } } }
    );

    if (modifiedObj.modifiedCount > 0) {
      return Response.json(
        {
          success: true,
          message: "Url deleted!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error in deleting shortid",
      },
      { status: 500 }
    );
  }
}
