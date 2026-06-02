import { useAgencyContext } from "@/components/AgencyClientProvider";

export function useAgency() {
    const { agency, setAgency } = useAgencyContext();
    return { agency, setAgency };
}