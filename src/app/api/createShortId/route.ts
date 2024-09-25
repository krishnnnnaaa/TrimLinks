import dbConnect from "@/lib/dbConnect";
import { Url, UrlModel, UserModel } from "@/model/User";
import ShortUniqueId from "short-unique-id";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const baseUrl = process.env.ORIGIN_KEY || "";

    const { url, email } = await request.json();

    const user = await UserModel.findOne({ email });

    const id = new ShortUniqueId().randomUUID(6);

    if (user) {
      const shortId = `${baseUrl}${id}`;

      const newUrl = new UrlModel({
        shortId,
        redirectUrl: url,
        createdAt: new Date(),
      });

      user.urls.push(newUrl as Url);

      user.save();
      await newUrl.save();

      return Response.json({
        success: true,
        message: "Short Url has been generated successfully!",
        url: newUrl,
      });
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error in generating shortid",
      },
      { status: 500 }
    );
  }
}
