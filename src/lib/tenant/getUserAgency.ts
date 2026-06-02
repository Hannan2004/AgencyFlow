import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getUserAgency() {
    const { userId } = await auth();

    if (!userId) return null;

    const membership = await prisma.membership.findFirst({
        where: { user: {clerkUserId: userId } },
        include: { agency: true },
        orderBy: { createdAt: "asc" },
    });

    if (!membership) return null;

    return JSON.parse(JSON.stringify(membership.agency));
}