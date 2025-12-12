import { redirect } from "next/navigation";

export default function CreateEventRedirect() {
    redirect("/dashboard/events/create");
}
