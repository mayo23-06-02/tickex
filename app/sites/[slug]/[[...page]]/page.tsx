import { notFound } from "next/navigation";
import { getMicrositeBySlug } from "@/app/actions/microsite";
import { ComponentRenderer } from "@/components/branding/ComponentRenderer";
import { WebsiteComponent } from "@/components/branding/types";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{
        slug: string;
        page?: string[];
    }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const data = await getMicrositeBySlug(params.slug);

    if (!data || !data.microsite || !data.event) {
        return {
            title: "Event Not Found",
        };
    }

    const { microsite, event } = data;

    // Determine current page
    const pagePath = params.page ? `/${params.page.join("/")}` : "/";
    const currentPage = microsite.pages.find((p: any) => p.slug === pagePath) || microsite.pages[0];

    return {
        title: `${currentPage?.name || "Home"} | ${event.title}`,
        description: event.description,
        openGraph: {
            title: event.title,
            description: event.description,
            images: event.imageUrl ? [event.imageUrl] : [],
        },
    };
}

export default async function EventSitePage(props: PageProps) {
    const params = await props.params;
    const { slug, page: pagePathArray } = params;

    const data = await getMicrositeBySlug(slug);

    if (!data || !data.microsite || !data.microsite.isPublished) {
        // You might want to allow preview if you are the organizer (check session)
        // For now, strict 404
        return notFound();
    }

    const { microsite, event } = data;
    const { globalStyles } = microsite;

    // Resolve Page
    // If no page path, look for slug "/"
    // If page path ['about'], look for slug "/about"
    const targetSlug = pagePathArray ? `/${pagePathArray.join("/")}` : "/";

    const currentPage = microsite.pages.find((p: any) => p.slug === targetSlug);

    if (!currentPage) {
        return notFound();
    }

    // Default styles if missing
    const theme = {
        primaryColor: globalStyles?.primaryColor || "#1DB954",
        secondaryColor: globalStyles?.secondaryColor || "#0f172a",
        fontFamily: globalStyles?.fontFamily || "Inter",
        backgroundColor: globalStyles?.backgroundColor || "#ffffff",
    };

    return (
        <div
            className="min-h-screen"
            style={{
                backgroundColor: theme.backgroundColor,
                fontFamily: theme.fontFamily
            }}
        >
            {/* Simple Navigation for Multi-page sites */}
            {microsite.pages.length > 1 && (
                <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="font-bold text-xl" style={{ color: theme.secondaryColor }}>
                            {event.title}
                        </div>
                        <div className="flex gap-6">
                            {microsite.pages.map((p: any) => (
                                <a
                                    key={p.id}
                                    href={`/sites/${slug}${p.slug === "/" ? "" : p.slug}`}
                                    className={`text-sm font-medium hover:opacity-70 transition-opacity ${p.slug === targetSlug ? "opacity-100" : "opacity-60"}`}
                                    style={{ color: theme.secondaryColor }}
                                >
                                    {p.name}
                                </a>
                            ))}
                        </div>
                        <div>
                            {/* Optional: Add "Get Tickets" button here if generic header desired */}
                        </div>
                    </div>
                </nav>
            )}

            <main>
                {currentPage.components.map((comp: WebsiteComponent) => (
                    <ComponentRenderer
                        key={comp.id}
                        component={comp}
                        globalStyles={theme}
                    />
                ))}
            </main>

            {/* Default Footer if none present? Or rely on user adding one. User usually adds one. */}
        </div>
    );
}
