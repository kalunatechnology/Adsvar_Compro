import { getDb } from "@/lib/db";
import type { CompanyStat, CompanyStatInput } from "@/lib/types";

interface StatRow {
  id: number;
  key: string;
  value: number;
  suffix: string;
  prefix: string;
  label_line1: string;
  label_line2: string;
  sort_order: number;
  is_active: number;
}

const toStat = (r: StatRow): CompanyStat => ({
  id: r.id,
  key: r.key,
  value: r.value,
  suffix: r.suffix,
  prefix: r.prefix,
  labelLine1: r.label_line1,
  labelLine2: r.label_line2,
  sortOrder: r.sort_order,
  isActive: r.is_active === 1,
});

export const statsRepo = {
  list(includeInactive = false): CompanyStat[] {
    const where = includeInactive ? "" : "WHERE is_active = 1";
    const rows = getDb()
      .prepare(`SELECT * FROM company_stats ${where} ORDER BY sort_order ASC, id ASC`)
      .all() as StatRow[];
    return rows.map(toStat);
  },

  getByKey(key: string): CompanyStat | null {
    const row = getDb().prepare("SELECT * FROM company_stats WHERE key = ?").get(key) as
      | StatRow
      | undefined;
    return row ? toStat(row) : null;
  },

  create(input: CompanyStatInput): CompanyStat {
    const info = getDb()
      .prepare(
        `INSERT INTO company_stats (key, value, suffix, prefix, label_line1, label_line2, sort_order, is_active)
         VALUES (@key, @value, @suffix, @prefix, @labelLine1, @labelLine2, @sortOrder, @isActive)`
      )
      .run({
        ...input,
        isActive: input.isActive ? 1 : 0,
      });
    return this.getByKey(input.key)!;
  },
};
