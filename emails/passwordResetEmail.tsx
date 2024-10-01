import {
    Body,
    Container,
    Column,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  import logofull from '../src/app/trimlinks_logo_full-removebg-preview.png'
  
  interface ResetPasswordEmailProps {
    name?: string;
    updatedDate?: Date;
    token?: string;
    email?:string
  }
  
  const baseUrl = process.env.ORIGIN_KEY
    ? `${process.env.ORIGIN_KEY}`
    : "";
  
  export const ResetPasswordEmail = ({
    name,
    updatedDate,
    token,
    email
  }: ResetPasswordEmailProps) => {
    const formattedDate = new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(updatedDate);
  
    return (
      <Html>
        <Head />
        <Preview>You updated the password for your Twitch account</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={logo}>
              <Img width={114} src={'https://trim-links.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftrimlinks_logo_full-removebg-preview.eab81d47.png&w=128&q=75'} />
            </Section>
            <Section style={sectionsBorders}>
              <Row>
                <Column style={sectionBorder} />
                <Column style={sectionCenter} />
                <Column style={sectionBorder} />
              </Row>
            </Section>
            <Section style={content}>
              <Text style={paragraph}>Hi {name},</Text>
              <Text style={paragraph}>
                You have requested to reset the password for your TrimLinks account on{" "}
                {formattedDate}. If this was you, then no further action is
                required.
              </Text>
              <Text style={paragraph}>
                However if you did NOT applied for this password change request, please{" "}
                <Link href={`${baseUrl}reset-password/${name}?email=${email}&token=${token}`} style={link}>
                  reset your account password
                </Link>{" "}
                immediately.
              </Text>
              <Text style={paragraph}>
                Remember to use a password that is both strong and unique to your
                Twitch account. To learn more about how to create a strong and
                unique password,{" "}
                <Link href={`${baseUrl}reset-password/${name}?email=${email}&token=${token}`} style={link}>
                  click here.
                </Link>
              </Text>
              <Text style={paragraph}>
                Still have questions? Please contact{" "}
                <Link href="#" style={link}>
                  Triminks Support
                </Link>
              </Text>
              <Text style={paragraph}>
                Thanks,
                <br />
                TrimLinks Support Team
              </Text>
            </Section>
          </Container>
  
          <Section style={footer}>
            <Row>
              <Text style={{ textAlign: "center", color: "#706a7b" }}>
                © 2022 TrimLinks, All Rights Reserved <br />
                350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA
              </Text>
            </Row>
          </Section>
        </Body>
      </Html>
    );
  };
  
  
  export default ResetPasswordEmail;
  
  const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";
  
  const main = {
    backgroundColor: "#efeef1",
    fontFamily,
  };
  
  const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
  };
  
  const container = {
    maxWidth: "580px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
  };
  
  const footer = {
    maxWidth: "580px",
    margin: "0 auto",
  };
  
  const content = {
    padding: "5px 20px 10px 20px",
  };
  
  const logo = {
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    padding: 30,
  };
  
  const sectionsBorders = {
    width: "100%",
    display: "flex",
  };
  
  const sectionBorder = {
    borderBottom: "1px solid rgb(238,238,238)",
    width: "249px",
  };
  
  const sectionCenter = {
    borderBottom: "1px solid rgb(145,71,255)",
    width: "102px",
  };
  
  const link = {
    textDecoration: "underline",
  };
  
