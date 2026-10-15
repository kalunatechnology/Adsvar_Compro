import { getDb } from "@/lib/db";
import type { Service, ServiceInput } from "@/lib/types";

interface ServiceRow {
  id: number;
  slug: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  href: string;
  points_json: string;
  sort_order: number;
  is_active: number;
}

const toService = (r: ServiceRow): Service => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  tag: r.tag,
  description: r.description,
  image: r.image,
  href: r.href,
  points: JSON.parse(r.points_json || "[]"),
  sortOrder: r.sort_order,
  isActive: r.is_active === 1,
});

export const servicesRepo = {
  list(includeInactive = false): Service[] {
    const where = includeInactive ? "" : "WHERE is_active = 1";
    const rows = getDb()
      .prepare(`SELECT * FROM services ${where} ORDER BY sort_order ASC, id ASC`)
      .all() as ServiceRow[];
    return rows.map(toService);
  },

  get(id: number): Service | null {
    const row = getDb().prepare("SELECT * FROM services WHERE id = ?").get(id) as
      | ServiceRow
      | undefined;
    return row ? toService(row) : null;
  },

  create(input: ServiceInput): Service {
    const info = getDb()
      .prepare(
        `INSERT INTO services (slug, name, tag, description, image, href, points_json, sort_order, is_active)
         VALUES (@slug, @name, @tag, @description, @image, @href, @pointsJson, @sortOrder, @isActive)`
      )
      .run({
        ...input,
        pointsJson: JSON.stringify(input.points || []),
        isActive: input.isActive ? 1 : 0,
      });
    return this.get(Number(info.lastInsertRowid))!;
  },
};
