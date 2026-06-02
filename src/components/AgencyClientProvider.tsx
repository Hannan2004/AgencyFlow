"use client";
import React from "react";

export type Agency = {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    brandColor?: string | null;
    createdAt?: string;
    updatedAt?: string; 
};

const AgencyContext = React.createContext<{ agency: Agency | null; setAgency: (a: Agency | null) => void } | undefined>(undefined);

export function AgencyClientProvider({ initialAgency, children }: { initialAgency: Agency | null; children: React.ReactNode }) {
    const [agency, setAgency] = React.useState<Agency | null>(initialAgency);
    return <AgencyContext.Provider value={{ agency, setAgency }}>{children}</AgencyContext.Provider>;
}

export function useAgencyContext() {
    const ctx = React.useContext(AgencyContext);
    if (!ctx) throw new Error("useAgencyContext must be used inside AgencyClientProvider");
    return ctx;
}