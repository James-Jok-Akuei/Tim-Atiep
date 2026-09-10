import {
  Award,
  BookOpen,
  Feather,
  GraduationCap,
  TreeDeciduous,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { MilestoneIcon } from "@/data/presentationData";

export const MILESTONE_ICONS: Record<MilestoneIcon, LucideIcon> = {
  tree: TreeDeciduous,
  graduation: GraduationCap,
  users: Users,
  award: Award,
  trophy: Trophy,
  feather: Feather,
  book: BookOpen,
};
