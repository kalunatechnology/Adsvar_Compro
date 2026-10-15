import { getDb } from "@/lib/db";
import type { Project, ProjectInput } from "@/lib/types";

interface ProjectRow {
  id: number;
  slug: string;
  number: string;
  title: string;
  client: string;
  category: string;
  metrics: string;
  description: string;
  image: string;
  tags_json: string;
  href: string;
  sort_order: number;
  is_active: number;
}

const toProject = (r: ProjectRow): Project => ({
  id: r.id,
  slug: r.slug,
  number: r.number,
  title: r.title,
  client: r.client,
  category: r.category,
  metrics: r.metrics,
  description: r.description,
  image: r.image,
  tags: JSON.parse(r.tags_json || "[]"),
  href: r.href,
  sortOrder: r.sort_order,
  isActive: r.is_active === 1,
});

export const projectsRepo = {
  list(category?: string, includeInactive = false): Project[] {
    let query = "SELECT * FROM projects WHERE 1=1";
    const params: unknown[] = [];

    if (!includeInactive) {
      query += " AND is_active = 1";
    }

    if (category && category !== "Semua") {
      query += " AND category = ?";
      params.push(category);
    }

    query += " ORDER BY sort_order ASC, id ASC";

    const rows = getDb().prepare(query).all(...params) as ProjectRow[];
    return rows.map(toProject);
  },

  get(id: number): Project | null {
    const row = getDb().prepare("SELECT * FROM projects WHERE id = ?").get(id) as
      | ProjectRow
      | undefined;
    return row ? toProject(row) : null;
  },

  create(input: ProjectInput): Project {
    const info = getDb()
      .prepare(
        `INSERT INTO projects (slug, number, title, client, category, metrics, description, image, tags_json, href, sort_order, is_active)
         VALUES (@slug, @number, @title, @client, @category, @metrics, @description, @image, @tagsJson, @href, @sortOrder, @isActive)`
      )
      .run({
        ...input,
        tagsJson: JSON.stringify(input.tags || []),
        isActive: input.isActive ? 1 : 0,
      });
    return this.get(Number(info.lastInsertRowid))!;
  },
};
