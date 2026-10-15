// Tipe domain untuk sistem database SQLite Adsvar

export interface Service {
  id: number;
  slug: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  href: string;
  points: string[];
  sortOrder: number;
  isActive: boolean;
}

export interface Project {
  id: number;
  slug: string;
  number: string;
  title: string;
  client: string;
  category: string;
  metrics: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  sortOrder: number;
  isActive: boolean;
}

export interface PricingPlan {
  id: number;
  slug: string;
  name: string;
  description: string;
  priceProject: string;
  priceMonthly: string;
  isPopular: boolean;
  badge: string;
  features: string[];
  sortOrder: number;
  isActive: boolean;
}

export interface CompanyStat {
  id: number;
  key: string;
  value: number;
  suffix: string;
  prefix: string;
  labelLine1: string;
  labelLine2: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Inquiry {
  id: number;
  name: string;
  contact: string;
  service: string;
  message: string;
  createdAt: string;
  status: "pending" | "contacted" | "completed";
}

export type ServiceInput = Omit<Service, "id">;
export type ProjectInput = Omit<Project, "id">;
export type PricingPlanInput = Omit<PricingPlan, "id">;
export type CompanyStatInput = Omit<CompanyStat, "id">;
export type InquiryInput = Omit<Inquiry, "id" | "createdAt" | "status">;
