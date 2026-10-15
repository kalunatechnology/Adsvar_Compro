import { servicesRepo } from "@/lib/repositories/services";
import { projectsRepo } from "@/lib/repositories/projects";
import { pricingRepo } from "@/lib/repositories/pricing";
import { statsRepo } from "@/lib/repositories/stats";
import HomePageClient from "@/components/HomePageClient";


export default function Home() {
  const services = servicesRepo.list();
  const projects = projectsRepo.list();
  const pricingPlans = pricingRepo.list();
  const stats = statsRepo.list();

  return (
    <HomePageClient
      initialServices={services}
      initialProjects={projects}
      initialPlans={pricingPlans}
      initialStats={stats}
    />
  );
}
