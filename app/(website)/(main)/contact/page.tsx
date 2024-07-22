import { Button } from "@/components/ui/button";
import Image from "next/image";

const ContactPage = () => {
  return (
    <div>
      <HeroSection />
      <PublicationsImagesSection />
      <div className="flex flex-col md:flex-row web-px mt-10  gap-10">
        <AddresssDetails />
        <ContactForm />
      </div>
    </div>
  );
};
const HeroSection = () => {
  return (
    <div className="bg-foreground web-px h-screen text-background   pt-44">
      <div className="fx-col gap-3">
        <h1 className="ts3 font-bold">
          Wanna
          <span className="text-primary"> Talk</span>
        </h1>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Hello there! Ready to connect and bring ideas to life? Whether you
          have a project in mind, a collaboration to propose, or just want to
          chat about the latest tech trends, Im all ears. Drop me a line, and
          lets turn pixels into possibilities.
        </p>
        <div className="flex">
          <Button variant={"noEffect"} className="border border-background">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};
const PublicationsImagesSection = () => {
  return (
    <div className="-mt-[30vh]  web-px">
      <Image
        alt="CONTACT IMAGE"
        src="/contact.jpg"
        width={1920}
        height={1080}
        className="h-[50vh] md:h-[60vh] object-cover"
      />
    </div>
  );
};

const AddresssDetails = () => {
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
        <Content>
          <Heading title="Business Hours" />
          <Paragraph>Monday - Friday: 9am - 5pm</Paragraph>
          <Paragraph>Saturday: 9am - 1pm</Paragraph>
          <Paragraph>Sunday: Closed</Paragraph>
        </Content>
        <Content>
          <Heading title="Phone & Email" />
          <p className="text-lg opacity-80">+254 798 694000</p>
          <p className="text-lg opacity-80">
            <a href="mailto:chari.rightson@gmail.com">qwanitrust@gmail.com</a>
          </p>
        </Content>
        <Content>
          <Heading title="Social Media" />

          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg opacity-80"
            >
              Instagram
            </a>
          </p>
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg opacity-80"
            >
              Twitter
            </a>
          </p>
        </Content>
      </div>
    </div>
  );
};
const ContactForm = () => {
  return (
    <form className="flex-[2] w-full  fx-col gap-5">
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
export default ContactPage;
