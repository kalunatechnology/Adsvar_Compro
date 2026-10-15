import { getDb } from "@/lib/db";
import type { Inquiry, InquiryInput } from "@/lib/types";

interface InquiryRow {
  id: number;
  name: string;
  contact: string;
  service: string;
  message: string;
  created_at: string;
  status: string;
}

const toInquiry = (r: InquiryRow): Inquiry => ({
  id: r.id,
  name: r.name,
  contact: r.contact,
  service: r.service,
  message: r.message,
  createdAt: r.created_at,
  status: r.status as Inquiry["status"],
});

export const inquiriesRepo = {
  list(): Inquiry[] {
    const rows = getDb()
      .prepare("SELECT * FROM inquiries ORDER BY id DESC")
      .all() as InquiryRow[];
    return rows.map(toInquiry);
  },

  create(input: InquiryInput): Inquiry {
    const info = getDb()
      .prepare(
        `INSERT INTO inquiries (name, contact, service, message)
         VALUES (@name, @contact, @service, @message)`
      )
      .run(input);
    const row = getDb()
      .prepare("SELECT * FROM inquiries WHERE id = ?")
      .get(Number(info.lastInsertRowid)) as InquiryRow;
    return toInquiry(row);
  },
};
