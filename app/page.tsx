import Link from "next/link";
import { servicesRepo } from "@/lib/repositories/services";
import { projectsRepo } from "@/lib/repositories/projects";
import { pricingRepo } from "@/lib/repositories/pricing";
import { statsRepo } from "@/lib/repositories/stats";
import HomePageClient from "@/components/HomePageClient";
import { SITE_NAVIGATION_ITEMS } from "@/lib/seo";

export default function Home() {
  const services = servicesRepo.list();
  const projects = projectsRepo.list();
  const pricingPlans = pricingRepo.list();
  const stats = statsRepo.list();

  return (
    <>
      {/* Accessible Semantic Sitelinks Navigation (Crawlable by Googlebot without altering visual UI) */}
      <section aria-labelledby="adsvar-brand-overview" className="sr-only">
        <div>
          <h2 id="adsvar-brand-overview">
            Adsvar (Adsvar Digital) — Performance Ads Agency + Creative Engine
          </h2>
          <p>
            Adsvar runs your Meta, Google, TikTok, GMV Max, and Shopee ads, with built-in high-volume creative production engine and transparent pricing.
          </p>
          <nav aria-label="Explore Adsvar Sitelinks">
            {SITE_NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                itemProp="url"
                itemScope
                itemType="https://schema.org/SiteNavigationElement"
              >
                <span itemProp="name">{item.name}</span>
                <p itemProp="description">{item.description}</p>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <HomePageClient
        initialServices={services}
        initialProjects={projects}
        initialPlans={pricingPlans}
        initialStats={stats}
      />
    </>
  );
}
