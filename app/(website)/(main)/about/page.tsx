import { Button } from "@/components/ui/button";
import { TeamMemberWrapper } from "@/components/website/shared/Wrappers";
import {
  formatSanityText,
  pageMetadata,
} from "@/components/website/utils/functions";
import { fetchAboutPageContent } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IAboutPage } from "@/utils/data_types";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { ArrowDown, Sparkles, Heart, Users, Target, BookOpen } from "lucide-react";
import Link from "next/link";

async function AboutPage() {
  const about = await fetchAboutPageContent();

  return (
    <div className="min-h-screen">
      <HeroSection about={about} />
      <AboutQwaniSection about={about} />
      <StatisticsSection about={about} />
      <OurValuesSection about={about} />
      <ExploreMoreSection about={about} />
      <OurTeamSection about={about} />
    </div>
  );
}

// Dramatic Hero Section with Parallax Effect
const HeroSection = ({ about }: { about: IAboutPage }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl(about.heroImage)}
          alt="About Qwani"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center web-px py-32">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 text-primary text-sm font-dm-sans font-medium tracking-wider uppercase mb-6">
            <Sparkles className="h-4 w-4" />
            Our Story
          </span>
        </div>

        <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] max-w-5xl mx-auto animate-slide-up">
          {formatSanityText(about.heroTitle, "text-primary")}
        </h1>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
            <span className="font-dm-sans text-xs uppercase tracking-widest">Discover</span>
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

// About Qwani Section with Large Typography
const AboutQwaniSection = ({ about }: { about: IAboutPage }) => {
  return (
    <section id="about" className="bg-white py-20 md:py-32">
      <div className="web-px">
        <div className="max-w-6xl mx-auto">
          {/* Section Number */}
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center font-playfair font-semibold text-primary">
              01
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-foreground">
              {about.aboutTitle}
            </h2>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <div className="editorial-divider mb-8" />
              <p className="font-dm-sans text-lg md:text-xl text-foreground/80 leading-relaxed">
                {about.aboutDescription}
              </p>
            </div>
            <div className="hidden md:block">
              <blockquote className="font-playfair text-2xl md:text-3xl italic text-foreground/60 border-l-4 border-primary pl-6">
              &quot;Empowering young voices to tell stories that matter.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Statistics Section with Large Numbers
const StatisticsSection = ({ about }: { about: IAboutPage }) => {
  return (
    <section className="editorial-bg-charcoal py-20 md:py-28">
      <div className="web-px">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-dm-sans text-primary text-sm font-medium tracking-wider uppercase">
              Our Impact
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-white mt-2">
              Numbers That Inspire
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {about.statistics?.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start justify-center">
                  <span className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-primary">
                    {stat.number}
                  </span>
                  <span className="text-primary text-2xl mt-2">+</span>
                </div>
                <p className="font-dm-sans text-white/70 text-sm md:text-base uppercase tracking-wider mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Values Section with Cards
const OurValuesSection = ({ about }: { about: IAboutPage }) => {
  const valueIcons = [Heart, Target, Users, BookOpen];

  return (
    <section className="bg-editorial-ivory py-20 md:py-32">
      <div className="web-px">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center font-playfair font-semibold text-primary">
                  02
                </span>
                <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-foreground">
                  {about.valuesTitle}
                </h2>
              </div>
              <div className="editorial-divider" />
            </div>
            <p className="font-dm-sans text-muted-foreground max-w-md">
              {about.valuesDescription}
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values?.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <div
                  key={index}
                  className="group bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="font-dm-sans text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Explore More Section with Dramatic Image
const ExploreMoreSection = ({ about }: { about: IAboutPage }) => {
  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl(about.exploreMoreImage)}
          alt="Explore more about Qwani"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
          <span className="block">Explore More</span>
          <span className="block text-primary mt-2">About Qwani</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="font-dm-sans rounded-full px-8"
            asChild
          >
            <Link href="/blogs">Read Our Stories</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="font-dm-sans rounded-full px-8 bg-white/10 text-white border-white/30 hover:bg-white hover:text-foreground"
            asChild
          >
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Team Section
const OurTeamSection = ({ about }: { about: IAboutPage }) => {
  return (
    <section id="team" className="bg-white py-20 md:py-32">
      <div className="web-px">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center font-playfair font-semibold text-primary">
                03
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-foreground">
                {about.teamTitle}
              </h2>
            </div>
            <div className="editorial-divider mx-auto mt-4" />
            <p className="font-dm-sans text-muted-foreground mt-6 max-w-2xl mx-auto">
              Meet the passionate individuals behind Qwani who work tirelessly to empower young writers.
            </p>
          </div>

          {/* Team Grid */}
          <TeamMemberWrapper teamMembers={about.teamMembers} />
        </div>
      </div>
    </section>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const results = await pageMetadata("about");
  return results;
}

export default AboutPage;
