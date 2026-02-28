import { ITeamMember } from "@/utils/data_types"

// Canonical department display order
export const DEPARTMENT_ORDER = [
  "Board of Directors",
  "Editorial Masthead",
  "Community Leads",
  "Event Leads",
  "Technical Team",
  "Core Team",
] as const

export type Department = (typeof DEPARTMENT_ORDER)[number]

/**
 * Maps a member's role string to one of the six department buckets.
 * Uses keyword matching — no schema changes required.
 */
export function inferDepartment(role: string): Department {
  const r = role.toLowerCase()

  if (
    r.includes("director") ||
    r.includes("chairman") ||
    r.includes("chairperson") ||
    r.includes("founder") ||
    r.includes("president") ||
    r.includes("ceo") ||
    r.includes("coo") ||
    r.includes("board") ||
    r.includes("patron")
  ) {
    return "Board of Directors"
  }

  if (
    r.includes("editor") ||
    r.includes("editorial") ||
    r.includes("writer") ||
    r.includes("author") ||
    r.includes("content") ||
    r.includes("journalist") ||
    r.includes("reporter") ||
    r.includes("creative") ||
    r.includes("copywriter") ||
    r.includes("masthead")
  ) {
    return "Editorial Masthead"
  }

  if (
    r.includes("community") ||
    r.includes("social") ||
    r.includes("ambassador") ||
    r.includes("outreach") ||
    r.includes("engagement") ||
    r.includes("relations")
  ) {
    return "Community Leads"
  }

  if (
    r.includes("event") ||
    r.includes("coordinator") ||
    r.includes("host") ||
    r.includes("programme") ||
    r.includes("program") ||
    r.includes("festival") ||
    r.includes("activations")
  ) {
    return "Event Leads"
  }

  if (
    r.includes("developer") ||
    r.includes("engineer") ||
    r.includes("designer") ||
    r.includes("tech") ||
    r.includes("it ") ||
    r.includes("systems") ||
    r.includes("software") ||
    r.includes("web") ||
    r.includes("digital") ||
    r.includes("ux") ||
    r.includes("ui ")
  ) {
    return "Technical Team"
  }

  return "Core Team"
}

/**
 * Groups members by inferred department in canonical display order,
 * omitting empty departments.
 */
export function groupMembersByDepartment(
  members: ITeamMember[]
): { department: Department; members: ITeamMember[] }[] {
  const grouped: Record<Department, ITeamMember[]> = {
    "Board of Directors": [],
    "Editorial Masthead": [],
    "Community Leads": [],
    "Event Leads": [],
    "Technical Team": [],
    "Core Team": [],
  }

  for (const member of members) {
    const dept = inferDepartment(member.role)
    grouped[dept].push(member)
  }

  return DEPARTMENT_ORDER.map((dept) => ({
    department: dept,
    members: grouped[dept],
  })).filter((g) => g.members.length > 0)
}
