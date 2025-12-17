export interface WebsiteComponent {
    id: string;
    type: "hero" | "about" | "lineup" | "tickets" | "gallery" | "faq" | "footer";
    props: Record<string, any>;
}
