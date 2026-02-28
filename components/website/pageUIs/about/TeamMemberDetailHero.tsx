"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaXTwitter,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaBehance,
} from "react-icons/fa6";
import { ArrowLeft, Share2 } from "lucide-react";
import { ITeamMember } from "@/utils/data_types";
import { imageUrl } from "@/sanity/lib/client";
import { Particles } from "@/components/ui/particles";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { PixelImage } from "@/components/ui/pixel-image";
import Portable_Text_Editor from "@/components/website/shared/portable_text_editor";
import { inferDepartment } from "./team-utils";

// Social platform link row
const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-primary hover:bg-primary/10 text-white/60 hover:text-primary transition-all duration-300 text-sm font-dm-sans"
    aria-label={label}
  >
    <Icon className="h-4 w-4 flex-shrink-0" />
    <span className="hidden sm:inline">{label}</span>
  </a>
);

export function TeamMemberDetailHero({ member }: { member: ITeamMember }) {
  const socials = member.socialLinks;
  const dept = inferDepartment(member.role);

  return (
    <>
      {/* ── Hero: dark + particles ───────────────────────────── */}
      <section className="relative editorial-bg-charcoal overflow-hidden pt-28 pb-0 min-h-screen flex flex-col">
        {/* Particles background */}
        <Particles
          className="absolute inset-0 z-0"
          quantity={50}
          staticity={75}
          ease={55}
          color="#ffffff"
          size={0.4}
        />

        {/* Radial glow behind photo */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 75% 45%, rgba(65,168,140,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Top-bar: back + share */}
        <div className="relative z-10 web-px flex items-center justify-between mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/about#team"
              className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 font-dm-sans text-sm"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to team
            </Link>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => navigator.share?.({ title: member.name, url: window.location.href })}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all duration-200"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Main split layout */}
        <div className="relative z-10 web-px flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end pb-0">
          {/* ── Left: identity ── */}
          <div className="order-2 lg:order-1 pb-16 lg:pb-24 flex flex-col">
            {/* Department badge */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="h-px w-8 bg-primary" />
              <span className="font-dm-sans text-primary text-xs font-medium tracking-[0.2em] uppercase">
                {dept}
              </span>
            </motion.div>

            {/* Role */}
            <motion.p
              className="font-dm-sans text-white/50 text-sm uppercase tracking-[0.18em] mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {member.role}
            </motion.p>

            {/* Name with LineShadowText */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
                <LineShadowText
                  shadowColor="hsl(172, 42%, 50%)"
                  className="text-white font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]"
                >
                  {member.name}
                </LineShadowText>
              </h1>
            </motion.div>

            {/* Accent divider */}
            <motion.div
              className="h-px bg-primary origin-left mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ width: "80px" }}
            />

            {/* Social links */}
            {socials && (
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {socials.twitter && (
                  <SocialLink href={socials.twitter} icon={FaXTwitter} label="Twitter" />
                )}
                {socials.instagram && (
                  <SocialLink href={socials.instagram} icon={FaInstagram} label="Instagram" />
                )}
                {socials.tiktok && (
                  <SocialLink href={socials.tiktok} icon={FaTiktok} label="TikTok" />
                )}
                {socials.linkedIn && (
                  <SocialLink href={socials.linkedIn} icon={FaLinkedinIn} label="LinkedIn" />
                )}
                {socials.behance && (
                  <SocialLink href={socials.behance} icon={FaBehance} label="Behance" />
                )}
              </motion.div>
            )}
          </div>

          {/* ── Right: PixelImage photo ── */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <PixelImage
              src={imageUrl(member.image)}
              alt={member.name}
              grid="8x8"
              grayscaleAnimation={true}
              pixelFadeInDuration={900}
              maxAnimationDelay={1100}
              colorRevealDelay={1200}
              className="w-full aspect-[3/4] max-h-[680px] rounded-sm"
            />
            {/* Decorative offset frame */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-primary/20 rounded-sm -z-10 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ── Bio: light ivory section ────────────────────────── */}
      <section className="editorial-bg-ivory py-20 md:py-28">
        <div className="web-px">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Section eye-brow */}
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-primary" />
                <span className="font-dm-sans text-primary text-xs font-medium tracking-[0.2em] uppercase">
                  About {member.name.split(" ")[0]}
                </span>
              </div>

              <div className="prose prose-lg max-w-none prose-headings:font-playfair prose-p:font-dm-sans prose-p:text-foreground/75 prose-p:leading-relaxed prose-a:text-primary prose-blockquote:border-l-primary prose-blockquote:font-playfair prose-blockquote:italic prose-blockquote:text-foreground/60">
                <Portable_Text_Editor
                  body={member.description}
                  classNames="text-foreground"
                />
              </div>

              {/* Bottom back link */}
              <motion.div
                className="mt-16 pt-8 border-t border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="/about#team"
                  className="group inline-flex items-center gap-3 font-dm-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span className="w-8 h-8 rounded-full border border-border group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all duration-300">
                    <ArrowLeft className="h-3.5 w-3.5 group-hover:text-white transition-colors duration-200" />
                  </span>
                  Back to all team members
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
