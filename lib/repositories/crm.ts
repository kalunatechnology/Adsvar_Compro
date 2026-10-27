import { getDb } from "@/lib/db";

export interface CrmEventLog {
  id?: number;
  eventId: string;
  eventType: string;
  direction: "INBOUND_DISPATCHED" | "OUTBOUND_RECEIVED";
  statusCode: number;
  success: number;
  payloadJson: string;
  responseJson: string;
  createdAt?: string;
}

export interface CrmChatMessage {
  id?: number;
  threadId: string;
  messageId: string;
  senderType: "EXTERNAL" | "INTERNAL" | "BOT";
  senderName: string;
  text: string;
  createdAt?: string;
}

export interface CrmSupportTicket {
  id?: number;
  eventId: string;
  subject: string;
  description: string;
  serialNumber?: string;
  customerEmail?: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt?: string;
}

export const crmRepo = {
  logEvent(entry: {
    eventId: string;
    eventType: string;
    direction: "INBOUND_DISPATCHED" | "OUTBOUND_RECEIVED";
    statusCode: number;
    success: number;
    payloadJson: string;
    responseJson: string;
  }): void {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO crm_events_log (
        event_id, event_type, direction, status_code, success, payload_json, response_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      entry.eventId,
      entry.eventType,
      entry.direction,
      entry.statusCode,
      entry.success,
      entry.payloadJson,
      entry.responseJson
    );
  },

  getEventLogs(limit = 50): CrmEventLog[] {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT id, event_id AS eventId, event_type AS eventType, direction, 
                status_code AS statusCode, success, payload_json AS payloadJson, 
                response_json AS responseJson, created_at AS createdAt 
         FROM crm_events_log 
         ORDER BY id DESC LIMIT ?`
      )
      .all(limit) as CrmEventLog[];
    return rows;
  },

  clearEventLogs(): void {
    const db = getDb();
    db.prepare(`DELETE FROM crm_events_log`).run();
  },

  saveChatMessage(msg: {
    threadId: string;
    messageId: string;
    senderType: "EXTERNAL" | "INTERNAL" | "BOT";
    senderName: string;
    text: string;
  }): void {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO crm_chat_messages (
        thread_id, message_id, sender_type, sender_name, text
      ) VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(
      msg.threadId,
      msg.messageId,
      msg.senderType,
      msg.senderName,
      msg.text
    );
  },

  getChatMessages(threadId: string): CrmChatMessage[] {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT id, thread_id AS threadId, message_id AS messageId, 
                sender_type AS senderType, sender_name AS senderName, 
                text, created_at AS createdAt
         FROM crm_chat_messages
         WHERE thread_id = ?
         ORDER BY id ASC`
      )
      .all(threadId) as CrmChatMessage[];
    return rows;
  },

  saveTicket(ticket: {
    eventId: string;
    subject: string;
    description: string;
    serialNumber?: string;
    customerEmail?: string;
  }): void {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO crm_support_tickets (
        event_id, subject, description, serial_number, customer_email, status
      ) VALUES (?, ?, ?, ?, ?, 'OPEN')
    `);
    stmt.run(
      ticket.eventId,
      ticket.subject,
      ticket.description,
      ticket.serialNumber || "",
      ticket.customerEmail || ""
    );
  },

  updateTicketStatus(eventId: string, status: string): boolean {
    const db = getDb();
    const info = db
      .prepare(`UPDATE crm_support_tickets SET status = ? WHERE event_id = ?`)
      .run(status, eventId);
    return info.changes > 0;
  },

  getTickets(limit = 20): CrmSupportTicket[] {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT id, event_id AS eventId, subject, description, 
                serial_number AS serialNumber, customer_email AS customerEmail, 
                status, created_at AS createdAt
         FROM crm_support_tickets
         ORDER BY id DESC LIMIT ?`
      )
      .all(limit) as CrmSupportTicket[];
    return rows;
  },
};
