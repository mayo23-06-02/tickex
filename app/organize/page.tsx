import OrganizeLandingClient from "@/components/organize/OrganizeLandingClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organize Events | Tickex",
  description:
    "The ultimate event management platform for professional organizers. Scale your reach and maximize sales.",
};

export default function OrganizePage() {
  return <OrganizeLandingClient />;
}
