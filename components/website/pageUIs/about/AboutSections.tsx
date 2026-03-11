"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AnimatedCounter,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/website/shared/AnimationPrimitives";
import { IAboutPage } from "@/utils/data_types";
import { imageUrl } from "@/sanity/lib/client";
import Image from "next/image";
import {
  ArrowDown,
  MapPin,
  BookOpen,
  Palette,
  ChevronDown,
  Mail,
  Mountain,
  Pencil,
  Mic2,
  Music2,
  Film,
  Bike,
  Scissors,
  Camera,
  MessageCircle,
  Clapperboard,
  PenLine,
  TreePine,
  Brain,
  Popcorn,
} from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Particles } from "@/components/ui/particles";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { MorphingText } from "@/components/ui/morphing-text";

/* ─────────────────────────────────────────────
   1. HERO
   ───────────────────────────────────────────── */
export function AboutHero({ about }: { about: IAboutPage }) {
  return (
    <section className="relative overflow-hidden editorial-bg-charcoal">
      <Particles
        className="absolute inset-0 z-0"
        quantity={30}
        staticity={90}
        ease={60}
        color="#ffffff"
        size={0.4}
      />

      <div className="relative z-10 w-full web-px pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <div className="lg:col-span-7 space-y-6">
            <motion.span
              className="inline-block text-primary text-sm font-dm-sans font-medium tracking-[0.2em] uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Qwani
            </motion.span>

            <motion.h1
              className="font-playfair text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <LineShadowText
                shadowColor="hsl(172, 42%, 50%)"
                className="text-white font-playfair text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1]"
              >
                A Youth-Led Creative Collective
              </LineShadowText>
            </motion.h1>

            <motion.div
              className="h-px bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ width: "120px" }}
            />

            <motion.p
              className="font-dm-sans text-white/60 text-lg max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Qwani is a youth-led collective which was initially started with the
              purpose of providing a platform for young writers to get their works
              published.
            </motion.p>
          </div>

          {/* Photo */}
          <div className="lg:col-span-5 relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative h-[420px] md:h-[520px] lg:h-[560px] rounded-sm overflow-hidden">
                <Image
                  src={imageUrl(about.heroImage)}
                  alt="About Qwani"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-primary/30 rounded-sm -z-10" />
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <a
            href="#story"
            className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
          >
            <span className="font-dm-sans text-[10px] uppercase tracking-[0.3em]">
              Scroll
            </span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   2. OUR STORY
   ───────────────────────────────────────────── */
export function AboutStory() {
  return (
    <section id="story" className="bg-white py-24 md:py-32">
      <div className="web-px">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
              {/* Section number */}
              <div className="col-span-12 md:col-span-2">
                <span className="font-playfair text-8xl md:text-9xl font-bold text-primary/10 leading-none select-none">
                  01
                </span>
              </div>

              {/* Content */}
              <div className="col-span-12 md:col-span-10">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                  <div>
                    <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-foreground mb-6">
                      Our Story
                    </h2>
                    <div className="editorial-divider mb-8" />
                    <p className="font-dm-sans text-lg text-foreground/75 leading-relaxed mb-6">
                      Over time, we have grown into a community that encompasses all
                      kinds of creatives, including writers, poets, spoken-word
                      artists, musicians, photographers, visual artists, sketchers,
                      playwrights, actors, film-makers, illustrators, craft-makers,
                      as well as any other type of creative.
                    </p>
                    <p className="font-dm-sans text-base text-foreground/60 leading-relaxed">
                      With the expansion into the diverse creative groups, we have
                      decided to focus our guns on how to help them all find a way to
                      create a sustainable career out of their art. In a country
                      whose economy isn&apos;t expanding proportionately to accommodate
                      all the graduates, the best we can do is to try and absorb and
                      provide a pipeline for them to alternative sources of income.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <blockquote className="relative font-playfair text-2xl md:text-3xl italic text-foreground/50 leading-snug pl-8 border-l-2 border-primary/40">
                      <span className="absolute -top-4 -left-2 text-primary/20 text-6xl font-serif select-none">
                        &ldquo;
                      </span>
                      Our community has grown, over the years, to the point where we
                      now have 10,000 members. And we&apos;re always looking to have
                      more people, and expand further!
                      <span className="block mt-4 text-base not-italic text-primary/70 font-dm-sans font-medium">
                        So, you who&apos;s reading this: You&apos;re very much welcome!
                      </span>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   3. LOCATIONS
   ───────────────────────────────────────────── */
const LOCATIONS = [
  { name: "Nairobi", country: "Kenya" },
  { name: "Eldoret", country: "Kenya" },
  { name: "Mombasa", country: "Kenya" },
  { name: "Kisumu", country: "Kenya" },
  { name: "Nakuru", country: "Kenya" },
  { name: "Nyeri", country: "Kenya" },
  { name: "Northampton", country: "United Kingdom" },
];

export function AboutLocations() {
  return (
    <section className="editorial-bg-ivory py-20 md:py-28">
      <div className="web-px">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="font-dm-sans text-primary text-xs font-medium tracking-[0.25em] uppercase">
                Where We Are
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
                Our Regions
              </h2>
              <div className="editorial-divider mx-auto mb-6" />
              <p className="font-dm-sans text-foreground/55 text-sm max-w-md mx-auto leading-relaxed">
                We are currently based in numerous regions around the country — and
                beyond.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            staggerDelay={0.07}
          >
            {LOCATIONS.map((loc, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="group relative bg-white rounded-sm p-5 text-center border border-transparent hover:border-primary/15 transition-all duration-300"
                  whileHover={{
                    y: -3,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <MapPin className="h-4 w-4 text-primary mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <p className="font-playfair text-lg font-semibold text-foreground">
                    {loc.name}
                  </p>
                  <p className="font-dm-sans text-xs text-foreground/40 mt-1 tracking-wide uppercase">
                    {loc.country}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   4. WHAT WE DO
   ───────────────────────────────────────────── */
const CORE_SERVICES = [
  { label: "Book Publishing", icon: BookOpen },
  { label: "Literary Workshops", icon: PenLine },
  { label: "Art & Photo Exhibitions", icon: Palette },
];

const EVENTS = [
  { label: "Hikes", icon: Mountain },
  { label: "Sketch Tours", icon: Pencil },
  { label: "Poetry & Letter Reading", icon: Mic2 },
  { label: "Karaoke Sessions", icon: Music2 },
  { label: "Book Discussions", icon: BookOpen },
  { label: "Cycling Tours", icon: Bike },
  { label: "Art & Craft Sessions", icon: Scissors },
  { label: "Picnics", icon: TreePine },
  { label: "Open Mics", icon: MessageCircle },
  { label: "Trivia Nights", icon: Brain },
  { label: "Film Screenings", icon: Film },
  { label: "Play Readings", icon: Clapperboard },
  { label: "Photowalks", icon: Camera },
  { label: "Zine Making", icon: Popcorn },
];

export function AboutWhatWeDo() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="web-px">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
              <div className="col-span-12 md:col-span-2">
                <span className="font-playfair text-8xl md:text-9xl font-bold text-primary/10 leading-none select-none">
                  02
                </span>
              </div>

              <div className="col-span-12 md:col-span-10">
                <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-foreground mb-2">
                  What We Do
                </h2>
                <div className="editorial-divider mb-10" />

                {/* Core Services */}
                <div className="grid sm:grid-cols-3 gap-5 mb-14">
                  {CORE_SERVICES.map((svc, i) => {
                    const Icon = svc.icon;
                    return (
                      <motion.div
                        key={i}
                        className="group relative bg-[hsl(var(--editorial-ivory))] rounded-sm p-7 border border-transparent hover:border-primary/15 transition-all duration-300"
                        whileHover={{
                          y: -4,
                          transition: {
                            type: "spring",
                            stiffness: 350,
                            damping: 22,
                          },
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                          <Icon className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="font-playfair text-lg font-semibold text-foreground">
                          {svc.label}
                        </h3>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Events */}
                <div>
                  <span className="font-dm-sans text-primary text-xs font-medium tracking-[0.25em] uppercase mb-6 block">
                    Running various events, including
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {EVENTS.map((evt, i) => {
                      const Icon = evt.icon;
                      return (
                        <motion.div
                          key={i}
                          className="group flex items-center gap-2.5 px-4 py-2.5 bg-[hsl(var(--editorial-ivory))] rounded-full border border-transparent hover:border-primary/20 hover:bg-white transition-all duration-300 cursor-default"
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                        >
                          <Icon className="h-3.5 w-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                          <span className="font-dm-sans text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                            {evt.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   5. BIG STATS — "huge figure"
   ───────────────────────────────────────────── */
export function AboutStats() {
  return (
    <section className="relative editorial-bg-charcoal py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color="hsl(172, 32%, 37%)"
          maxOpacity={0.12}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 web-px">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Members */}
            <ScrollReveal>
              <div className="text-center md:text-right">
                <div className="flex items-start justify-center md:justify-end">
                  <AnimatedCounter
                    value={10000}
                    className="font-playfair text-7xl sm:text-8xl md:text-9xl font-bold text-primary leading-none"
                  />
                  <span className="text-primary text-3xl md:text-4xl mt-2 font-light">
                    +
                  </span>
                </div>
                <p className="font-dm-sans text-white/50 text-sm uppercase tracking-[0.2em] mt-4">
                  Members
                </p>
              </div>
            </ScrollReveal>

            {/* Divider line (vertical on md+) */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-24 bg-primary/25" />

            {/* Events */}
            <ScrollReveal>
              <div className="text-center md:text-left">
                <div className="flex items-start justify-center md:justify-start">
                  <AnimatedCounter
                    value={220}
                    className="font-playfair text-7xl sm:text-8xl md:text-9xl font-bold text-primary leading-none"
                  />
                  <span className="text-primary text-3xl md:text-4xl mt-2 font-light">
                    +
                  </span>
                </div>
                <p className="font-dm-sans text-white/50 text-sm uppercase tracking-[0.2em] mt-4">
                  Events Successfully Held
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   6. MISSION & VISION
   ───────────────────────────────────────────── */
export function AboutMissionVision() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="web-px">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-4 md:gap-8 items-start mb-16">
              <div className="col-span-12 md:col-span-2">
                <span className="font-playfair text-8xl md:text-9xl font-bold text-primary/10 leading-none select-none">
                  03
                </span>
              </div>
              <div className="col-span-12 md:col-span-10">
                <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-foreground mb-2">
                  Our Purpose
                </h2>
                <div className="editorial-divider" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-5xl mx-auto">
            {/* Mission */}
            <ScrollReveal>
              <motion.div
                className="group relative bg-[hsl(var(--editorial-ivory))] rounded-sm p-8 md:p-10 h-full border border-transparent hover:border-primary/15 transition-all duration-300"
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 350, damping: 22 },
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="font-dm-sans text-primary text-xs font-medium tracking-[0.25em] uppercase mb-5 block">
                  Mission
                </span>
                <h3 className="font-playfair text-xl md:text-2xl font-semibold text-foreground mb-4 leading-snug">
                  Empowering Young Creatives
                </h3>
                <p className="font-dm-sans text-foreground/60 text-sm leading-relaxed">
                  To empower and support young creatives in Kenya by fostering
                  sustainable projects that enhance their talents, promote
                  innovation, and provide opportunities for economic growth, while
                  ensuring environmental and social responsibility.
                </p>
              </motion.div>
            </ScrollReveal>

            {/* Vision */}
            <ScrollReveal>
              <motion.div
                className="group relative bg-[hsl(var(--editorial-ivory))] rounded-sm p-8 md:p-10 h-full border border-transparent hover:border-primary/15 transition-all duration-300"
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 350, damping: 22 },
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="font-dm-sans text-primary text-xs font-medium tracking-[0.25em] uppercase mb-5 block">
                  Vision
                </span>
                <h3 className="font-playfair text-xl md:text-2xl font-semibold text-foreground mb-4 leading-snug">
                  Leading Creative Talent
                </h3>
                <p className="font-dm-sans text-foreground/60 text-sm leading-relaxed">
                  To be the leading organization in Kenya that nurtures the next
                  generation of creative talent, driving sustainable growth in the
                  arts, culture, and creative industries while contributing to the
                  country&apos;s social and economic development.
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   7. FAQ
   ───────────────────────────────────────────── */
function FAQItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-foreground/8 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-playfair text-lg md:text-xl font-semibold text-foreground pr-4 group-hover:text-primary transition-colors duration-200">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-foreground/30" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 font-dm-sans text-foreground/60 text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AboutFAQ() {
  return (
    <section className="editorial-bg-ivory py-24 md:py-32">
      <div className="web-px">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="font-dm-sans text-primary text-xs font-medium tracking-[0.25em] uppercase">
                Questions?
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
                Frequently Asked
              </h2>
              <div className="editorial-divider mx-auto" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-white rounded-sm p-6 md:p-10">
              <FAQItem question="How Do I Join Qwani?" defaultOpen>
                <ol className="list-decimal list-inside space-y-2.5">
                  <li>
                    Check out our monthly calendar of events on our socials.
                  </li>
                  <li>Attend any event that you&apos;re interested in.</li>
                  <li>You&apos;re in!</li>
                </ol>
              </FAQItem>

              <FAQItem question="I have an idea — how do I reach you?">
                <p className="mb-3">
                  In case you want to share an idea with us, reach out to us via
                  email:
                </p>
                <a
                  href="mailto:qwanitrust@gmail.com"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4 transition-all"
                >
                  <Mail className="h-4 w-4" />
                  qwanitrust@gmail.com
                </a>
              </FAQItem>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   8. TEAM
   ───────────────────────────────────────────── */
const DEPT_LABELS = [
  "Board of Directors",
  "Editorial Masthead",
  "Community Leads",
  "Event Leads",
  "Technical Team",
];

export function AboutTeam({
  about,
  children,
}: {
  about: IAboutPage;
  children: React.ReactNode;
}) {
  return (
    <section id="team" className="bg-white">
      <div className="web-px pt-20 md:pt-24 pb-10 md:pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <motion.span
              className="inline-block text-primary text-xs font-dm-sans font-medium tracking-[0.25em] uppercase mb-6"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our People
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5"
            >
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {about.teamTitle}
              </h2>
            </motion.div>

            <motion.div
              className="h-px w-12 bg-primary mx-auto mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <MorphingText
                texts={DEPT_LABELS}
                className="text-primary h-10 md:h-12 text-xl md:text-2xl font-dm-sans font-normal w-full max-w-full"
              />
            </motion.div>

            <motion.p
              className="font-dm-sans text-foreground/50 text-sm mt-6 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Meet the passionate individuals across every discipline who work
              tirelessly to empower young voices.
            </motion.p>
          </ScrollReveal>
        </div>
      </div>

      <div className="web-px pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto">{children}</div>
      </div>
    </section>
  );
}
