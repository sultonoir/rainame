import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
  Tailwind,
  Section,
} from "@react-email/components";

export interface EmailOtpProps {
  code: string;
  username: string;
}

export const EmailOtp = ({ code, username }: EmailOtpProps) => {
  const previewText = "Your OTP code for Rainame"; // Define previewText

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Your OTP Code for <strong>Rainame</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Here is your One-Time Password (OTP) to complete the verification
              process:
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Text className="text-[24px] font-bold text-black">{code}</Text>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              If you did not request this code, please ignore this email.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Thank you for using our service!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
