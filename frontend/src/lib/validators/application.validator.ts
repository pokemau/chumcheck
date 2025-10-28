import { z } from 'zod';

const TimelineItemSchema = z.object({
  monthYear: z.string().min(1, 'Month-Year is required'),
  description: z.string().min(1, 'Description is required')
});

const CompetitorSchema = z.object({
  competitorName: z.string().min(1, 'Competitor name is required'),
  offer: z.string().min(1, 'Offer (product/service) is required'),
  pricingStrategy: z.string().min(1, 'Pricing strategy is required')
});

const MemberSchema = z.object({
  name: z.string().min(1, 'Member name is required'),
  role: z.string().min(1, 'Member role is required')
});

export const applicationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  problemStatement: z.string().min(1, 'Problem statement is required'),
  targetMarket: z.string().min(1, 'Target market is required'),
  solutionDescription: z.string().min(1, 'Solution description is required'),
  historicalTimeline: z.array(TimelineItemSchema).default([]),
  competitiveAdvantageAnalysis: z.array(CompetitorSchema).default([]),
  intellectualPropertyStatus: z
    .string()
    .min(1, 'Intellectual property status is required'),
  objectives: z.array(z.string().min(1)).default([]),
  proposalScope: z.string().min(1, 'Proposal scope is required'),
  methodology: z.string().min(1, 'Methodology is required'),
  members: z.array(MemberSchema).default([]),
  curriculumVitae: z.string().min(1, 'Curriculum Vitae is required')
});

export type Application = z.infer<typeof applicationSchema>;

export function parseApplication(input: unknown) {
  return applicationSchema.safeParse(input);
}

export function parseApplicationFormData(formData: FormData) {
  const obj: Record<string, any> = {};

  for (const [key, val] of formData.entries()) {
    // keep file objects as-is (if you expect file uploads)
    if (val instanceof File) {
      obj[key] = val;
      continue;
    }

    const s = String(val).trim();

    // If value looks like JSON, try to parse it
    if (
      (s.startsWith('{') && s.endsWith('}')) ||
      (s.startsWith('[') && s.endsWith(']'))
    ) {
      try {
        obj[key] = JSON.parse(s);
        continue;
      } catch {
        // fall through to treat as plain string
      }
    }

    // Support repeated fields named like "members[]" -> collected as arrays of strings
    if (key.endsWith('[]')) {
      const prop = key.slice(0, -2);
      obj[prop] = obj[prop] ?? [];
      obj[prop].push(s);
      continue;
    }

    obj[key] = s;
  }

  return applicationSchema.safeParse(obj);
}
