import { getDb } from "@/lib/db";
import type { Inquiry, InquiryInput } from "@/lib/types";

interface InquiryRow {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  contact: string;
  service: string;
  package_choice: string | null;
  billing_cycle: string | null;
  price: string | null;
  message: string;
  brand_description: string | null;
  source: string | null;
  created_at: string;
  status: string;
}

const toInquiry = (r: InquiryRow): Inquiry => ({
  id: r.id,
  name: r.name,
  phone: r.phone || "",
  email: r.email || "",
  contact: r.contact || r.phone || r.email || "",
  service: r.service || r.package_choice || "",
  packageChoice: r.package_choice || r.service || "",
  billingCycle: r.billing_cycle || "",
  price: r.price || "",
  message: r.message || r.brand_description || "",
  brandDescription: r.brand_description || r.message || "",
  source: r.source || "book_consultation",
  createdAt: r.created_at,
  status: (r.status || "pending") as Inquiry["status"],
});

export const inquiriesRepo = {
  list(filter?: { status?: string; source?: string }): Inquiry[] {
    let sql = "SELECT * FROM inquiries";
    const conditions: string[] = [];
    const params: string[] = [];

    if (filter?.status && filter.status !== "all") {
      conditions.push("status = ?");
      params.push(filter.status);
    }
    if (filter?.source && filter.source !== "all") {
      conditions.push("source = ?");
      params.push(filter.source);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }
    sql += " ORDER BY id DESC";

    const rows = getDb().prepare(sql).all(...params) as InquiryRow[];
    return rows.map(toInquiry);
  },

  create(input: InquiryInput): Inquiry {
    const phone = input.phone || "";
    const email = input.email || "";
    const contact = input.contact || phone || email || "";
    const service = input.service || input.packageChoice || "Umum";
    const packageChoice = input.packageChoice || input.service || "";
    const billingCycle = input.billingCycle || "";
    const price = input.price || "";
    const message = input.message || input.brandDescription || "";
    const brandDescription = input.brandDescription || input.message || "";
    const source = input.source || "book_consultation";
    const status = input.status || "pending";

    const info = getDb()
      .prepare(
        `INSERT INTO inquiries (
          name, phone, email, contact, service, package_choice, billing_cycle, price, message, brand_description, source, status
        ) VALUES (
          @name, @phone, @email, @contact, @service, @packageChoice, @billingCycle, @price, @message, @brandDescription, @source, @status
        )`
      )
      .run({
        name: input.name,
        phone,
        email,
        contact,
        service,
        packageChoice,
        billingCycle,
        price,
        message,
        brandDescription,
        source,
        status,
      });

    const row = getDb()
      .prepare("SELECT * FROM inquiries WHERE id = ?")
      .get(Number(info.lastInsertRowid)) as InquiryRow;
    return toInquiry(row);
  },

  updateStatus(id: number, status: string): boolean {
    const res = getDb()
      .prepare("UPDATE inquiries SET status = ? WHERE id = ?")
      .run(status, id);
    return res.changes > 0;
  },

  delete(id: number): boolean {
    const res = getDb().prepare("DELETE FROM inquiries WHERE id = ?").run(id);
    return res.changes > 0;
  },
};
