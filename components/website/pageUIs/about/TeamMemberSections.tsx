"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ITeamMember } from "@/utils/data_types";
import { Department, groupMembersByDepartment } from "./team-utils";
import { TeamMemberCard } from "@/components/website/shared/cards/common";

interface DeptGroup {
  department: Department;
  members: ITeamMember[];
}

// Staggered grid animation variants
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TeamMemberSections({
  teamMembers,
}: {
  teamMembers: ITeamMember[];
}) {
  const groups: DeptGroup[] = groupMembersByDepartment(teamMembers);
  const [activeTab, setActiveTab] = useState<Department>(
    groups[0]?.department ?? ("Core Team" as Department)
  );
  const tabsRef = useRef<HTMLDivElement>(null);

  // Smooth-scroll to the section when a tab is clicked
  const scrollToSection = (dept: Department) => {
    setActiveTab(dept);
    const el = document.getElementById(`dept-${dept.replace(/\s+/g, "-")}`);
    if (el) {
      const offset = 120; // account for sticky nav + tab bar
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Update active tab as user scrolls through sections
  useEffect(() => {
    const sectionEls = groups.map((g) =>
      document.getElementById(`dept-${g.department.replace(/\s+/g, "-")}`)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const dept = entry.target.getAttribute("data-dept") as Department;
            if (dept) setActiveTab(dept);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  if (groups.length === 0) {
    return (
      <p className="font-dm-sans text-muted-foreground text-center py-16">
        No team members found.
      </p>
    );
  }

  return (
    <div>
      {/* ── Sticky Department Tab Bar ─────────────────────────── */}
      <div
        ref={tabsRef}
        className="sticky top-[100px] z-30 bg-white/80 backdrop-blur-md border-b border-border/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-12 shadow-sm"
      >
        <div
          className="flex items-end gap-0 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {groups.map(({ department }) => {
            const isActive = activeTab === department;
            return (
              <button
                key={department}
                onClick={() => scrollToSection(department)}
                className={`relative flex-shrink-0 px-4 py-4 font-dm-sans text-sm font-medium transition-colors duration-200 focus-visible:outline-none ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {department}
                {isActive && (
                  <motion.div
                    layoutId="dept-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Department Sections ───────────────────────────────── */}
      <div className="space-y-20">
        {groups.map(({ department, members }, groupIdx) => (
          <section
            key={department}
            id={`dept-${department.replace(/\s+/g, "-")}`}
            data-dept={department}
            className="scroll-mt-[160px]"
          >
            {/* Section heading */}
            <motion.div
              className="mb-8 flex items-center gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.05 }}
            >
              {/* Dept number */}
              <span className="font-playfair text-6xl font-bold text-primary/10 leading-none select-none tabular-nums">
                {String(groupIdx + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground">
                  {department}
                </h3>
                <div className="h-px w-10 bg-primary mt-2" />
                <p className="font-dm-sans text-muted-foreground text-sm mt-1">
                  {members.length} {members.length === 1 ? "member" : "members"}
                </p>
              </div>
            </motion.div>

            {/* Cards grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {members.map((member) => (
                <motion.div key={member._id ?? member.name} variants={cardVariants}>
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}
