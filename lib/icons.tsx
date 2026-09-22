import {
  Bot, Workflow, FileText, Mic, MessageCircle, Search, Mail, Activity,
  Layers, AlertTriangle, SearchCode, GitBranch, ListChecks, Headset, Gauge, Target,
  Briefcase, Users, Phone, Coins, MessageSquare, ShieldCheck, ShoppingCart, CheckCircle,
  GraduationCap, Sparkles, TrendingUp, BookOpen, Database, LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  bot: Bot,
  workflow: Workflow,
  "file-text": FileText,
  mic: Mic,
  "message-circle": MessageCircle,
  search: Search,
  mail: Mail,
  activity: Activity,
  layers: Layers,
  "alert-triangle": AlertTriangle,
  "search-code": SearchCode,
  "git-branch": GitBranch,
  "list-checks": ListChecks,
  headset: Headset,
  gauge: Gauge,
  target: Target,
  briefcase: Briefcase,
  users: Users,
  phone: Phone,
  coins: Coins,
  "message-square": MessageSquare,
  "shield-check": ShieldCheck,
  "shopping-cart": ShoppingCart,
  "check-circle": CheckCircle,
  "graduation-cap": GraduationCap,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  "book-open": BookOpen,
  database: Database,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Sparkles;
}
