import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import {
  dummyServices,
  dummyProjects,
  dummyPricingPlans,
  dummyStats,
} from "@/data/dummy";

const DB_PATH = process.env.ADSVAR_DB_PATH
  ? path.resolve(process.env.ADSVAR_DB_PATH)
  : path.join(process.cwd(), "data", "adsvar.db");
const DB_DIR = path.dirname(DB_PATH);

const CURRENT_SEED_VERSION = "v5_adsvar_pricing_exact_reference";

const globalForDb = globalThis as unknown as { __adsvarDb?: Database.Database };

function init(db: Database.Database) {
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      slug        TEXT NOT NULL UNIQUE,
      name        TEXT NOT NULL,
      tag         TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      image       TEXT NOT NULL DEFAULT '',
      href        TEXT NOT NULL DEFAULT '#layanan',
      points_json TEXT NOT NULL DEFAULT '[]',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_active   INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS projects (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      slug        TEXT NOT NULL UNIQUE,
      number      TEXT NOT NULL DEFAULT '',
      title       TEXT NOT NULL,
      client      TEXT NOT NULL DEFAULT '',
      category    TEXT NOT NULL DEFAULT 'Semua',
      metrics     TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      image       TEXT NOT NULL DEFAULT '',
      tags_json   TEXT NOT NULL DEFAULT '[]',
      href        TEXT NOT NULL DEFAULT '#portofolio',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_active   INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS pricing_plans (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      slug          TEXT NOT NULL UNIQUE,
      name          TEXT NOT NULL,
      description   TEXT NOT NULL DEFAULT '',
      price_project TEXT NOT NULL DEFAULT '',
      price_monthly TEXT NOT NULL DEFAULT '',
      is_popular    INTEGER NOT NULL DEFAULT 0,
      badge         TEXT NOT NULL DEFAULT '',
      features_json TEXT NOT NULL DEFAULT '[]',
      sort_order    INTEGER NOT NULL DEFAULT 0,
      is_active     INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS company_stats (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      key         TEXT NOT NULL UNIQUE,
      value       INTEGER NOT NULL DEFAULT 0,
      suffix      TEXT NOT NULL DEFAULT '+',
      prefix      TEXT NOT NULL DEFAULT '',
      label_line1 TEXT NOT NULL,
      label_line2 TEXT NOT NULL,
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_active   INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      name              TEXT NOT NULL,
      phone             TEXT NOT NULL DEFAULT '',
      email             TEXT NOT NULL DEFAULT '',
      contact           TEXT NOT NULL DEFAULT '',
      service           TEXT NOT NULL DEFAULT '',
      package_choice    TEXT NOT NULL DEFAULT '',
      billing_cycle     TEXT NOT NULL DEFAULT '',
      price             TEXT NOT NULL DEFAULT '',
      message           TEXT NOT NULL DEFAULT '',
      brand_description TEXT NOT NULL DEFAULT '',
      source            TEXT NOT NULL DEFAULT 'book_consultation',
      created_at        TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status            TEXT NOT NULL DEFAULT 'pending'
    );

    CREATE TABLE IF NOT EXISTS adsvar_seed_migrations (
      key        TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Auto-migrate columns if database was created with older schema
  try {
    const existingCols = (db.pragma("table_info(inquiries)") as { name: string }[]).map(
      (c) => c.name
    );
    const addCol = (col: string, def: string) => {
      if (!existingCols.includes(col)) {
        db.exec(`ALTER TABLE inquiries ADD COLUMN ${col} ${def};`);
      }
    };
    addCol("phone", "TEXT NOT NULL DEFAULT ''");
    addCol("email", "TEXT NOT NULL DEFAULT ''");
    addCol("package_choice", "TEXT NOT NULL DEFAULT ''");
    addCol("billing_cycle", "TEXT NOT NULL DEFAULT ''");
    addCol("price", "TEXT NOT NULL DEFAULT ''");
    addCol("brand_description", "TEXT NOT NULL DEFAULT ''");
    addCol("source", "TEXT NOT NULL DEFAULT 'book_consultation'");
  } catch (err) {
    console.error("Inquiries table migration check error:", err);
  }

  const hasMigration = db
    .prepare("SELECT key FROM adsvar_seed_migrations WHERE key = ?")
    .get(CURRENT_SEED_VERSION);

  const count = (table: string) =>
    (db.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get() as { c: number }).c;

  // Run or refresh seed if version not applied or tables are empty
  const shouldSyncSeed = !hasMigration || count("services") === 0 || count("pricing_plans") === 0;

  if (shouldSyncSeed) {
    db.transaction(() => {
      // Clear non-user tables to sync with latest dummy schema while preserving inquiries
      db.prepare("DELETE FROM services").run();
      db.prepare("DELETE FROM projects").run();
      db.prepare("DELETE FROM pricing_plans").run();
      db.prepare("DELETE FROM company_stats").run();

      // 1. Seed Services
      const insertService = db.prepare(
        `INSERT INTO services (slug, name, tag, description, image, href, points_json, sort_order, is_active)
         VALUES (@slug, @name, @tag, @description, @image, @href, @pointsJson, @sortOrder, @isActive)`
      );
      for (const s of dummyServices) {
        insertService.run({
          ...s,
          pointsJson: JSON.stringify(s.points || []),
          isActive: s.isActive ? 1 : 0,
        });
      }

      // 2. Seed Projects
      const insertProject = db.prepare(
        `INSERT INTO projects (slug, number, title, client, category, metrics, description, image, tags_json, href, sort_order, is_active)
         VALUES (@slug, @number, @title, @client, @category, @metrics, @description, @image, @tagsJson, @href, @sortOrder, @isActive)`
      );
      for (const p of dummyProjects) {
        insertProject.run({
          ...p,
          tagsJson: JSON.stringify(p.tags || []),
          isActive: p.isActive ? 1 : 0,
        });
      }

      // 3. Seed Pricing Plans
      const insertPlan = db.prepare(
        `INSERT INTO pricing_plans (slug, name, description, price_project, price_monthly, is_popular, badge, features_json, sort_order, is_active)
         VALUES (@slug, @name, @description, @priceProject, @priceMonthly, @isPopular, @badge, @featuresJson, @sortOrder, @isActive)`
      );
      for (const plan of dummyPricingPlans) {
        insertPlan.run({
          ...plan,
          isPopular: plan.isPopular ? 1 : 0,
          featuresJson: JSON.stringify(plan.features || []),
          isActive: plan.isActive ? 1 : 0,
        });
      }

      // 4. Seed Company Stats
      const insertStat = db.prepare(
        `INSERT INTO company_stats (key, value, suffix, prefix, label_line1, label_line2, sort_order, is_active)
         VALUES (@key, @value, @suffix, @prefix, @labelLine1, @labelLine2, @sortOrder, @isActive)`
      );
      for (const st of dummyStats) {
        insertStat.run({
          ...st,
          isActive: st.isActive ? 1 : 0,
        });
      }

      // Record migration
      db.prepare(
        "INSERT OR REPLACE INTO adsvar_seed_migrations (key, applied_at) VALUES (?, CURRENT_TIMESTAMP)"
      ).run(CURRENT_SEED_VERSION);
    })();
  }
}

export function getDb(): Database.Database {
  if (!globalForDb.__adsvarDb) {
    fs.mkdirSync(DB_DIR, { recursive: true });
    const db = new Database(DB_PATH);
    init(db);
    globalForDb.__adsvarDb = db;
  }
  return globalForDb.__adsvarDb;
}
