"use server"

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid"; 

export async function createAgencyAction(formData: FormData) {
    const name = String(formData.get("name") || "").trim();
    const slug = String(formData.get("slug") || "").trim();
    const brandColor = String(formData.get("brandColor") || "#2563eb").trim();

    if (!name || !slug) {
        throw new Error("Name and slug are required");
    }

    const { userId } = await auth();
    if (!userId) {
        throw new Error("Not authenticated");
    }

    const clerkUser = await currentUser();
    const email = clerkUser?.primaryEmailAddress?.emailAddress;

    if (!email) {
        throw new Error("No primary email found for Clerk user");
    }

    const userRecord = await prisma.user.upsert({
        where: { clerkUserId: userId },
        update: {
            email,
            firstName: clerkUser?.firstName ?? null,
            lastName: clerkUser?.lastName ?? null,
            imageUrl: clerkUser?.imageUrl ?? null,
        },
        create: {
            clerkUserId: userId,
            email,
            firstName: clerkUser?.firstName ?? null,
            lastName: clerkUser?.lastName ?? null,
            imageUrl: clerkUser?.imageUrl ?? null,
        },
    });

    const agency = await prisma.agency.create({
        data: {
            name,
            slug,
            brandColor,
            memberships: {
                create: {
                    userId: userRecord.id,
                    role: "OWNER",
                },
            },
        },
    });

    revalidatePath("/dashboard");
    return agency;
}

export async function createInvitesAction(agencyId: string, emails: string[]) {
    const cleanEmails = emails.map((email) => email.trim().toLowerCase()).filter(Boolean);

    const invites = await Promise.all(
        cleanEmails.map(email => 
            prisma.invite.create({
                data: { 
                  email,
                  token: nanoid(24),
                  agencyId 
                },
            })
        )
    );
    return invites;
}