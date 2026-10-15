import { getDb } from "@/lib/db";
import type { PricingPlan, PricingPlanInput } from "@/lib/types";

interface PricingRow {
  id: number;
  slug: string;
  name: string;
  description: string;
  price_project: string;
  price_monthly: string;
  is_popular: number;
  badge: string;
  features_json: string;
  sort_order: number;
  is_active: number;
}

const toPricingPlan = (r: PricingRow): PricingPlan => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  description: r.description,
  priceProject: r.price_project,
  priceMonthly: r.price_monthly,
  isPopular: r.is_popular === 1,
  badge: r.badge,
  features: JSON.parse(r.features_json || "[]"),
  sortOrder: r.sort_order,
  isActive: r.is_active === 1,
});

export const pricingRepo = {
  list(includeInactive = false): PricingPlan[] {
    const where = includeInactive ? "" : "WHERE is_active = 1";
    const rows = getDb()
      .prepare(`SELECT * FROM pricing_plans ${where} ORDER BY sort_order ASC, id ASC`)
      .all() as PricingRow[];
    return rows.map(toPricingPlan);
  },

  get(id: number): PricingPlan | null {
    const row = getDb().prepare("SELECT * FROM pricing_plans WHERE id = ?").get(id) as
      | PricingRow
      | undefined;
    return row ? toPricingPlan(row) : null;
  },

  create(input: PricingPlanInput): PricingPlan {
    const info = getDb()
      .prepare(
        `INSERT INTO pricing_plans (slug, name, description, price_project, price_monthly, is_popular, badge, features_json, sort_order, is_active)
         VALUES (@slug, @name, @description, @priceProject, @priceMonthly, @isPopular, @badge, @featuresJson, @sortOrder, @isActive)`
      )
      .run({
        ...input,
        isPopular: input.isPopular ? 1 : 0,
        featuresJson: JSON.stringify(input.features || []),
        isActive: input.isActive ? 1 : 0,
      });
    return this.get(Number(info.lastInsertRowid))!;
  },
};
