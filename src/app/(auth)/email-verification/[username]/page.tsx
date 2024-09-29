"use client";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import verifiedGif from "../../../verified.gif";
import unverified from "../../../notverified-removebg.png";
import Image from "next/image";
import { Loader2 } from "lucide-react";
const EmailPage = () => {
  const params = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const token = searchParams.get("token");

    const verifyOnMount = async () => {
      try {
        const response = await axios.post<ApiResponse>(
          `/api/verificationCode`,
          {
            username: params.username,
            token: token,
          }
        );

        if (response.data.success) {
          setIsVerified(true);
        }
      } catch (error) {
        console.error("Error in verifying user", error);
        const axiosError = error as AxiosError<ApiResponse>;
        setIsError(true);
        setErrorMsg(axiosError.response?.data.message as string);
      } finally {
        setLoading(false);
      }
    };
    verifyOnMount();
  }, []);

  return (
    <div>
      {errorMsg === "User email is already verified!" && (
        <div className="w-full min-h-screen flex flex-col justify-start items-center">
          <div className="py-28"></div>
          <Image
            src={verifiedGif}
            alt="verified"
            className="my-4"
            width={100}
            height={100}
            unoptimized
          />
          <h1 className="font-semibold texl-2xl my-2">
            Your Email is already verified!
          </h1>
          <p className="text-gray-500">
            You can continue using Trimlinks to shorten your URLs.
          </p>
          <p className="text-gray-500">
            If you&apos;re done here, feel free to close this window.
          </p>
        </div>
      )}
      {isVerified && (
        <div className="w-full min-h-screen flex flex-col justify-start items-center">
          <div className="py-28">
            <Image
              src={verifiedGif}
              alt="verified"
              className="my-4"
              width={100}
              height={100}
              unoptimized
            />
            <div>
              <h1 className="font-semibold texl-2xl my-2">
                Email Verified successfully.
              </h1>
              <p className="text-gray-500">
                Thanks for your patience! You can now continue using Trimlinks
                to shorten your URLs.
              </p>
              <p className="text-gray-500">
                If you&apos;re done here, feel free to close this window.
              </p>
            </div>
          </div>
        </div>
      )}
      {isError && errorMsg !== "User email is already verified!" && (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-8xl font-bold">Uh Oh!</h1>
          <h3 className="text-4xl font-semibold mt-4 mb-2 text-center">
            Your email address couldn&apos;t be verified.
          </h3>
          <p className="text-gray-500 md:px-0 px-6 text-center">
            We couldn&apos;t verify your email. This might happen if the link has
            expired or was incorrect.{" "}
          </p>
          <Image
            src={unverified}
            alt="verified"
            className="my-4 invert-[1] grayscale"
            width={500}
            height={500}
            unoptimized
          />
        </div>
      )}
      {loading && (
        <div className="flex flex-col h-screen items-center justify-center">
          <Loader2 className="animate-spin h-10 w-10 block" />{" "}
          <span className="text-white my-2">Please wait...</span>
        </div>
      )}
    </div>
  );
};

export default EmailPage
