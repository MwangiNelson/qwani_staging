"use client";
import React from "react";
import { motion } from "framer-motion";
import { useWebsiteContext } from "./utils/WebsiteContext";
import Image from "next/image";
import Link from "next/link";
import { JoinCommunityButton } from "./shared/atoms";
import FooterVideo from "./shared/footer_video";

export default function Footer() {
  const { minimalFooter } = useWebsiteContext();
  return (
    <div className="">
      {/* — Community section — */}
      {!minimalFooter && (
        <section className="relative editorial-bg-charcoal overflow-hidden py-20 md:py-24">
          {/* Faint noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 web-px">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left — text */}
              <div>
                <motion.span
                  className="inline-block text-primary text-xs font-dm-sans font-medium tracking-[0.25em] uppercase mb-5"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                >
                  Our Community
                </motion.span>

                <motion.h2
                  className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                >
                  Join Our<br />Community
                </motion.h2>

                <div className="h-px w-10 bg-primary mb-6" />

                <motion.p
                  className="font-dm-sans text-white/55 text-sm leading-relaxed mb-8 max-w-md"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Step into Qwani&apos;s vibrant circle of creatives. Here, every voice
                  matters, every story thrives, and camaraderie blooms. Become a
                  part of our literary mosaic today.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.3 }}
                >
                  <JoinCommunityButton size="sm" />
                </motion.div>
              </div>

              {/* Right — decorative quote block */}
              <motion.div
                className="hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative p-10 border border-white/10 rounded-sm max-w-sm bg-white/[0.03]">
                  {/* Large decorative quote mark */}
                  <span
                    className="absolute -top-5 -left-2 font-playfair text-8xl leading-none text-primary/30 select-none"
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <p className="font-playfair text-xl text-white/75 leading-relaxed italic mb-6">
                    Stories have the power to bring us together like nothing else can.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="font-dm-sans text-xs text-white/40 tracking-widest uppercase">
                      Qwani
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* — Video section — */}
      {!minimalFooter && (
        <section className="relative bg-white py-16 md:py-20 overflow-hidden">
          <div className="web-px">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left — editorial text */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block text-primary text-xs font-dm-sans font-medium tracking-[0.25em] uppercase mb-5">
                  Our Story
                </span>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                  Watch Our<br />Story Unfold
                </h2>
                <div className="h-px w-10 bg-primary mb-6" />
                <p className="font-dm-sans text-muted-foreground text-sm leading-relaxed max-w-sm">
                  A glimpse into the world of Qwani — the people, the passion,
                  and the purpose behind every word we publish.
                </p>
              </motion.div>

              {/* Right — video player */}
              <motion.div
                className="relative rounded-sm overflow-hidden shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <FooterVideo />
              </motion.div>
            </div>
          </div>
        </section>
      )}
      <div className="bg-foreground py-10 web-px border-background/50 border-t-[1px]">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full text-background gap-5">
          <Image
            src="/logo-white.png"
            alt="Qwani Logo"
            width={500}
            height={500}
            className=" w-32 col-span-2 md:col-span-1 "
          />
          <div className="w-full col-span-3 mb:grid mb:grid-cols-2 flex md:justify-between  ">
            <Links links={footer_quickLinks} title={"Quick Links"} />
            <Links links={footer_links} title={"Links"} />
            <Links links={socials} title={"Socials"} />
            <Links links={books_amazonLinks} title={"Books on Amazon"} />
          </div>
        </div>
        <div className="text-background mt-10 text-sm">
          <p>
            &copy; 2025 Qwani. All rights reserved. Designed by Qwani. Powered
            by{" "}
            <Link
              className="text-primary"
              target="_blank"
              href="https://rightson.xyz"
            >
              Chari Designs
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
type LinkType = {
  link: string;
  name: string;
};

type LinkProps = {
  links: LinkType[];
  title: string;
};

const Links: React.FC<LinkProps> = ({ links, title }) => (
  <div className="fx-col mb:mb-5 ">
    <h4 className="text-xl font-semibold">{title}</h4>
    {links.map((link) => (
      <Link key={link.link} href={link.link} className="  md:text-lg">
        {link.name}
      </Link>
    ))}
  </div>
);

const footer_quickLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Contact Us",
    link: "/contact",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
];
const footer_links = [
  {
    name: "Events",
    link: "/events",
  },
  // {
  //   name: "Gallery",
  //   link: "/gallery",
  // },
  {
    name: "Publications",
    link: "/publications",
  },
];
const socials = [
  {
    name: "Twitter",
    link: "https://x.com/qwanibok",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/qwanibok",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/qwani/",
  },
];
const books_amazonLinks = [
  {
    name: "Qwani Book One'",
    link: "https://www.amazon.co.uk/dp/B0FVPMFFL2",
  },
];
