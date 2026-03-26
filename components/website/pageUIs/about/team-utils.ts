import { ITeamMember } from "@/utils/data_types"

// Canonical department display order
export const DEPARTMENT_ORDER = [
  "Board of Directors",
  "Editorial Masthead",
  "Regional Heads",
  "Events Leads",
  "Technical Team",
  "Core Team",
] as const

export type Department = (typeof DEPARTMENT_ORDER)[number]

/**
 * Maps a member's role string to one of the six department buckets.
 * Uses keyword matching — no schema changes required.
 */
export function inferDepartment(role: string): Department {
  const r = role.toLowerCase().trim()

  // Board: C-suite "Chief … Officer" pattern + governance keywords
  if (
    (r.includes("chief") && r.includes("officer")) ||
    r.includes("chairman") ||
    r.includes("chairperson") ||
    r.includes("founder") ||
    r.includes("president") ||
    r.includes("ceo") ||
    r.includes("coo") ||
    r.includes("cfo") ||
    r.includes("cto") ||
    r.includes("cmo") ||
    r.includes("board") ||
    r.includes("patron")
  ) {
    return "Board of Directors"
  }

  // Editorial: editors, writers, proofreaders, illustrators, layout designers
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
    r.includes("masthead") ||
    r.includes("proofreader") ||
    r.includes("illustrator") ||
    r.includes("layout")
  ) {
    return "Editorial Masthead"
  }

  // Regional Heads
  if (
    r.includes("regional") ||
    r.includes("community") ||
    r.includes("ambassador") ||
    r.includes("outreach")
  ) {
    return "Regional Heads"
  }

  // Events Leads
  if (
    r.includes("event") ||
    r.includes("coordinator") ||
    r.includes("co-ordinator") ||
    r.includes("curator") ||
    r.includes("host") ||
    r.includes("programme") ||
    r.includes("program") ||
    r.includes("festival") ||
    r.includes("activations") ||
    r.includes("hiking") ||
    r.includes("cycling") ||
    r.includes("guide") ||
    r.includes("committee") ||
    r.includes("facilitator") ||
    r.includes("comix") ||
    r.includes("zines") ||
    r.includes("photowalk") ||
    r.includes("trivia") ||
    r.includes("literary")
  ) {
    return "Events Leads"
  }

  // Technical Team
  if (
    r.includes("developer") ||
    r.includes("engineer") ||
    r.includes("designer") ||
    r.includes("tech") ||
    r.includes("it ") ||
    r.includes("it lead") ||
    r.includes("it assistant") ||
    r.includes("systems") ||
    r.includes("software") ||
    r.includes("web") ||
    r.includes("digital") ||
    r.includes("ux") ||
    r.includes("ui ") ||
    r.includes("graphic")
  ) {
    return "Technical Team"
  }

  return "Core Team"
}

/**
 * Returns all departments inferred from a (possibly pipe-separated) role string.
 */
export function inferAllDepartments(role: string): Department[] {
  const roles = role.includes("|")
    ? role.split("|").map((r) => r.trim())
    : [role]

  const seen = new Set<Department>()
  const result: Department[] = []

  for (const r of roles) {
    const dept = inferDepartment(r)
    if (!seen.has(dept)) {
      seen.add(dept)
      result.push(dept)
    }
  }

  return result
}

/**
 * Groups members by inferred department in canonical display order,
 * omitting empty departments.
 * Members with pipe-separated roles (e.g. "Trivia Committee | IT Lead")
 * appear in each matching department.
 */
export function groupMembersByDepartment(
  members: ITeamMember[]
): { department: Department; members: ITeamMember[] }[] {
  const grouped: Record<Department, ITeamMember[]> = {
    "Board of Directors": [],
    "Editorial Masthead": [],
    "Regional Heads": [],
    "Events Leads": [],
    "Technical Team": [],
    "Core Team": [],
  }

  for (const member of members) {
    const departments = inferAllDepartments(member.role)
    for (const dept of departments) {
      grouped[dept].push(member)
    }
  }

  return DEPARTMENT_ORDER.map((dept) => ({
    department: dept,
    members: grouped[dept],
  })).filter((g) => g.members.length > 0)
}
