import { Button } from "@/components/ui/button";
import {
  formatSanityText,
  pageMetadata,
} from "@/components/website/utils/functions";
import { fetchContactPage } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IContactPage } from "@/utils/data_types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const ContactPage = async () => {
  const contact = await fetchContactPage();
  return (
    <div>
      <HeroSection contact={contact} />
      <PublicationsImagesSection contact={contact} />
      <div className="flex flex-col md:flex-row web-px mt-10  gap-10">
        <AddresssDetails contact={contact} />
        <ContactForm />
      </div>
    </div>
  );
};
const HeroSection = ({ contact }: { contact: IContactPage }) => {
  return (
    <div className="bg-foreground web-px h-screen text-background   pt-44">
      <div className="fx-col gap-3">
        <h1 className="ts3 font-bold">
          {formatSanityText(contact.heroTitle, "text-primary")}
        </h1>
        <p className="">{contact.heroSubtitle}</p>
        <div className="flex">
          <Button variant={"noEffect"} className="border border-background">
            <Link href={"#form"}>Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
const PublicationsImagesSection = ({ contact }: { contact: IContactPage }) => {
  return (
    <div className="-mt-[30vh]  web-px">
      <Image
        alt="hero image"
        src={imageUrl(contact.heroImage)}
        width={1920}
        height={1080}
        className="h-[50vh] md:h-[60vh] object-cover"
      />
    </div>
  );
};

const AddresssDetails = ({ contact }: { contact: IContactPage }) => {
  const Line = () => <div className="w-[100px] p-[.5px] bg-black  my-3"></div>;
  const Heading = ({ title }: { title: string }) => (
    <h5 className="h5">{title}</h5>
  );
  const Content = ({ children }: { children: React.ReactNode }) => (
    <div className="fx-col w-ful flex">
      {children}
      <Line />
    </div>
  );
  const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg opacity-80">{children}</p>
  );
  return (
    <div className="">
      <div className="flex-1 flex flex-col gap-5">
        {contact.contactInformation.map((info, index) => {
          return (
            <Content key={index}>
              <Heading title={info.heading} />
              {info.items.map((item, index) => {
                return item.link ? (
                  <a
                    href={item.link}
                    key={index}
                    className="text-lg opacity-80"
                  >
                    {item.label}
                  </a>
                ) : (
                  <p key={index} className="text-lg opacity-80">
                    {item.label}
                  </p>
                );
              })}
            </Content>
          );
        })}
      </div>
    </div>
  );
};
const ContactForm = () => {
  return (
    <form className="flex-[2] w-full  fx-col gap-5" id="form">
      <div className="fx-col gap-2">
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full h-[50px] outline-none bg-transparent border-2 border-foreground px-3 py-2"
        />
      </div>
      <div className="fx-col gap-2">
        <label htmlFor="email">Email*</label>
        <input
          type="text"
          id="email"
          name="email"
          className="w-full h-[50px] outline-none bg-transparent border-2 border-foreground px-3 py-2"
        />
      </div>
      <div className="fx-col gap-2">
        <label htmlFor="message">Message*</label>
        <textarea
          name="message"
          id="message"
          className="w-full h-[150px] outline-none bg-transparent border-2 border-foreground px-3 py-2"
        ></textarea>
      </div>
      <div className=" flex-end">
        <Button
          size="lg"
          className=" bg-black text-white   w-auto rounded-none 
            "
          type="submit"
        >
          Send
        </Button>
      </div>
    </form>
  );
};
export async function generateMetadata(): Promise<Metadata> {
  const results = await pageMetadata("contact");
  return results;
}
export default ContactPage;
