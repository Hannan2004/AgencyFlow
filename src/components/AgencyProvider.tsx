import { getUserAgency } from "@/lib/tenant/getUserAgency";
import { AgencyClientProvider } from "./AgencyClientProvider";

export default async function AgencyProvider({ children }: { children: React.ReactNode }) {
    const agency = await getUserAgency();
    return <AgencyClientProvider initialAgency={agency}>{children}</AgencyClientProvider>
}