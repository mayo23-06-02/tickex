import LandingPageClient from "@/components/landing/LandingPageClient";
import { getPublicEvents } from "@/lib/data/public-events";

export default async function LandingPage() {
  let featuredEvents: any[] = [];
  let trendingEvents: any[] = [];

  try {
    const data = await getPublicEvents();
    featuredEvents = data.featured;
    trendingEvents = data.trending;
  } catch (error) {
    console.error("Failed to load public events:", error);
  }

  return <LandingPageClient featuredEvents={featuredEvents} trendingEvents={trendingEvents} />;
}
