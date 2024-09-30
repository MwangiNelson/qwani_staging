import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

const ContactFormEmail = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto p-4 max-w-xl">
            <Section className="bg-white rounded-lg shadow-md p-6">
              <Text className="text-2xl font-bold text-gray-800 mb-4">
                New Contact Form Submission
              </Text>
              <Text className="text-gray-700 mb-2">
                <strong>Name:</strong> {name}
              </Text>
              <Text className="text-gray-700 mb-2">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-gray-700 mb-4">
                <strong>Message:</strong>
              </Text>
              <Text className="text-gray-600 bg-gray-100 p-3 rounded-lg whitespace-pre-wrap">
                {message}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactFormEmail;
