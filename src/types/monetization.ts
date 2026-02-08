import type { SimulatorInputs, SimulatorOutputs } from './simulator';

export type UserPlan = 'free' | 'report_owner' | 'premium';

export interface User {
  id: string;
  email: string;
  plan: UserPlan;
  createdAt: string;
}

export interface Report {
  id: string;
  email: string;
  inputs: SimulatorInputs;
  outputs: SimulatorOutputs;
  createdAt: string;
  expiresAt: string;
}

export interface Scenario {
  id: string;
  name: string;
  inputs: SimulatorInputs;
  outputs: SimulatorOutputs;
  createdAt: string;
  updatedAt: string;
}

export interface PricingPlan {
  id: 'free' | 'report' | 'premium';
  name: string;
  price: string;
  priceSubtext?: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlighted?: boolean;
}

// Helper functions
export function generateReportId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `rpt_${timestamp}_${random}`;
}

export function generateScenarioId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `scn_${timestamp}_${random}`;
}

export function isReportExpired(report: Report): boolean {
  return new Date(report.expiresAt) < new Date();
}

export function getReportExpirationDays(): number {
  return 7;
}

export function calculateReportExpiration(): string {
  const date = new Date();
  date.setDate(date.getDate() + getReportExpirationDays());
  return date.toISOString();
}
