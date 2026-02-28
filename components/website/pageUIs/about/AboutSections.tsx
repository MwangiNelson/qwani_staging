"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  AnimatedCounter,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/website/shared/AnimationPrimitives";
import { IAboutPage } from "@/utils/data_types";
import { imageUrl } from "@/sanity/lib/client";
import Image from "next/image";
import { Heart, Target, Users, BookOpen, ArrowDown, Sparkles, Zap, Globe, Star } from "lucide-react";
import { formatSanityText } from "@/components/website/utils/functions";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Particles } from "@/components/ui/particles";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { MorphingText } from "@/components/ui/morphing-text";
import { Ripple } from "@/components/ui/ripple";

// Animated hero with editorial split layout instead of generic banner
export function AboutHero({ about }: { about: IAboutPage }) {
  return (
    <section className="relative overflow-hidden editorial-bg-charcoal">
      {/* Ambient particles layer */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={35}
        staticity={90}
        ease={60}
        color="#ffffff"
        size={0.5}
      />

      <div className="relative z-10 w-full web-px pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text side */}
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
                {about.heroTitle}
              </LineShadowText>
            </motion.h1>

            {/* Animated line */}
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
              {about.aboutDescription}
            </motion.p>
          </div>

          {/* Photo side — constrained so it never drives section height */}
          <div className="lg:col-span-5 relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Fixed-height image frame — avoids giant aspect-ratio stretching on ultra-wide */}
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

              {/* Decorative frame offset */}
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
          <a href="#story" className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
            <span className="font-dm-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Story section — replaces the boring AboutQwani section
export function AboutStory({ about }: { about: IAboutPage }) {
  return (
    <section id="story" className="bg-white py-24 md:py-32">
      <div className="web-px">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
              {/* Large section number */}
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
                      {about.aboutTitle}
                    </h2>
                    <div className="editorial-divider mb-8" />
                    <p className="font-dm-sans text-lg text-foreground/75 leading-relaxed">
                      {about.aboutDescription}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <blockquote className="relative font-playfair text-2xl md:text-3xl italic text-foreground/50 leading-snug pl-8 border-l-2 border-primary/40">
                      <span className="absolute -top-4 -left-2 text-primary/20 text-6xl font-serif select-none">&ldquo;</span>
                      Empowering young voices to tell stories that matter.
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

// Stats with animated counters + FlickeringGrid background
export function AboutStats({ about }: { about: IAboutPage }) {
  return (
    <section className="relative editorial-bg-charcoal py-20 md:py-28 overflow-hidden">
      {/* Flickering grid background */}
      <div className="absolute inset-0 z-0">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color="hsl(172, 32%, 37%)"
          maxOpacity={0.15}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 web-px">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="font-dm-sans text-primary text-xs font-medium tracking-[0.25em] uppercase">
                Our Impact
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-white mt-3">
                Numbers That Inspire
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer
            className="flex flex-wrap justify-center gap-8 md:gap-16"
            staggerDelay={0.15}
          >
            {about.statistics?.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="text-center group min-w-[160px]">
                  <div className="flex items-start justify-center">
                    <AnimatedCounter
                      value={stat.number}
                      className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-primary"
                    />
                    <span className="text-primary text-2xl mt-2 font-light">+</span>
                  </div>
                  <p className="font-dm-sans text-white/60 text-sm uppercase tracking-[0.15em] mt-3">
                    {stat.label}
                  </p>
                  {/* Subtle accent line under each stat */}
                  <div className="h-px w-0 group-hover:w-12 bg-primary/40 mx-auto mt-4 transition-all duration-500" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

// Values — light background, 3-card centered grid
export function AboutValues({ about }: { about: IAboutPage }) {
  const valueIcons = [Sparkles, Zap, Globe, Star, Heart, Target, Users, BookOpen];

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="web-px">
        {/* Centered header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <motion.span
              className="inline-block text-primary text-xs font-dm-sans font-medium tracking-[0.25em] uppercase mb-4"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              02 — What We Stand For
            </motion.span>
            <motion.h2
              className="font-playfair text-3xl md:text-5xl font-bold text-foreground mt-2 leading-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {about.valuesTitle}
            </motion.h2>
            <motion.div
              className="h-px w-12 bg-primary mx-auto mt-5 mb-5"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <motion.p
              className="font-dm-sans text-foreground/55 max-w-xl mx-auto text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {about.valuesDescription}
            </motion.p>
          </div>
        </ScrollReveal>

        {/* 3-column grid — always centered regardless of item count */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto"
          staggerDelay={0.1}
        >
          {about.values?.map((value, index) => {
            const Icon = valueIcons[index % valueIcons.length];
            return (
              <StaggerItem key={index}>
                <motion.div
                  className="group relative bg-[hsl(var(--editorial-ivory))] rounded-sm p-8 h-full cursor-default border border-transparent hover:border-primary/15 transition-colors duration-300"
                  whileHover={{ y: -5, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary">
                    <Icon className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Number watermark */}
                  <span className="absolute top-5 right-6 font-playfair text-5xl font-bold text-foreground/[0.04] leading-none select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-playfair text-xl font-semibold text-foreground mb-3 leading-snug">
                    {value.title}
                  </h3>
                  <p className="font-dm-sans text-foreground/55 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Explore More — spacious Ripple CTA
export function AboutExplore({ about }: { about: IAboutPage }) {
  return (
    <section className="relative editorial-bg-charcoal overflow-hidden py-32 md:py-48 flex items-center justify-center">
      {/* Ripple rings — large spread to fill horizontal space */}
      <Ripple
        mainCircleSize={280}
        mainCircleOpacity={0.22}
        numCircles={11}
        circleSpacing={120}
        className="text-primary"
      />

      <ScrollReveal className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.span
          className="inline-block text-primary text-xs font-dm-sans font-medium tracking-[0.25em] uppercase mb-5"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          Explore Qwani
        </motion.span>

        <motion.h2
          className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Dive Into Our World
        </motion.h2>

        <motion.div
          className="h-px w-10 bg-primary mx-auto mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        <motion.p
          className="font-dm-sans text-white/55 text-sm leading-relaxed mb-10 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Stories, comics, and creative expression — all in one place.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="/blogs"
            className="group relative px-8 py-3 bg-primary text-white rounded-full font-dm-sans text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(65,168,140,0.4)]"
          >
            <span className="relative z-10">Read Our Stories</span>
          </a>
          <a
            href="/contact"
            className="px-8 py-3 bg-transparent text-white border border-white/25 rounded-full font-dm-sans text-sm font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}

const DEPT_LABELS = [
  "Board of Directors",
  "Editorial Masthead",
  "Community Leads",
  "Event Leads",
  "Technical Team",
];

// Team section — dark header banner + white cards area
export function AboutTeam({
  about,
  children,
}: {
  about: IAboutPage;
  children: React.ReactNode;
}) {
  return (
    <section id="team" className="bg-white">
      {/* ── Section header — same white bg as the cards ── */}
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

            {/* Morphing text cycling through department names */}
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
              Meet the passionate individuals across every discipline who
              work tirelessly to empower young voices.
            </motion.p>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Cards area ── */}
      <div className="web-px pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto">{children}</div>
      </div>
    </section>
  );
}
