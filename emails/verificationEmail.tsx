import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  username?: string;
  token?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const VerificationEmail = ({
  username,
  token,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Please Confirm your Email Address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/static/dropbox-logo.png`}
            width="40"
            height="33"
            alt="Dropbox"
          />
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              Thanks for getting started with TrimLinks!
              <br />
              We need a little more information to complete your registration,
              including a confirmation of your email address.
              <br />
              Click below to confirm your email address:
              <br />
            </Text>
            <Button style={button} href={token}>
              Confirm Email
            </Button>
            <Text style={text}>
              If you have problems, please paste the above URL into your web
              browser.
            </Text>
            <Text style={text}>
              This link will verify your email address, and then you&apos;ll
              officially be a part of the [customer portal] community.
              <br />
              See you there! Best regards, the [company] team
            </Text>
            <Text style={text}>
              Once again - thank you for joining our TrimLinks family!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

//   VerificationEmail.PreviewProps = {
//     userFirstname: "Alan",
//     resetPasswordLink: "https://dropbox.com",
//   } as VerificationEmailProps;

export default VerificationEmailProps;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
