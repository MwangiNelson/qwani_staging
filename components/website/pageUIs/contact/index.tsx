"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
export const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const name = data.name as string;
    const email = data.email as string;
    const message = data.message as string;
    try {
      await axios.post("/api/email", {
        name,
        email,
        message,
      });
      setLoading(false);
      toast.success("Message sent successfully");
    } catch (e) {
      console.log(e);
      toast.error("An error occured");
      setLoading(false);
    }
  };

  return (
    <form
      className="flex-[2] w-full  fx-col gap-5"
      id="form"
      onSubmit={handleSubmit}
    >
      <div className="fx-col gap-2">
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          required
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
          required
          className="w-full h-[50px] outline-none bg-transparent border-2 border-foreground px-3 py-2"
        />
      </div>
      <div className="fx-col gap-2">
        <label htmlFor="message">Message*</label>
        <textarea
          name="message"
          required
          id="message"
          className="w-full h-[150px] outline-none bg-transparent border-2 border-foreground px-3 py-2"
        ></textarea>
      </div>
      <div className=" flex-end">
        <Button
          size="lg"
          className=" bg-black text-white   w-auto rounded-none 
            "
          disabled={loading}
          type="submit"
        >
          {loading ? "Sending" : " Send"}
        </Button>
      </div>
    </form>
  );
};
