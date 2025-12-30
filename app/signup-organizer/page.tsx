import { redirect } from "next/navigation";

export default function SignupOrganizerRedirect() {
  redirect("/auth/organizer/register");
}
