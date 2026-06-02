import AgencyProvider from "@/components/AgencyProvider";

export const metadata = {
    title: "Dashboard",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AgencyProvider>{children}</AgencyProvider>
    );
}