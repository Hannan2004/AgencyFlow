import { createAgencyAction, createInvitesAction } from "./actions";
import { redirect } from "next/navigation";

async function onboard(formData: FormData) {
    "use server";

    const agency = await createAgencyAction(formData);

    const inviteEmails = String(formData.get("inviteEmails") || "")
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    if (inviteEmails.length > 0) {
        await createInvitesAction(agency.id, inviteEmails);
    }

    redirect("/dashboard");
}

export default function OnboardingPage() {
    return (
        <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-6 py-12">
            <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        Set up your agency
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                            Create your workspace, set branding, and optionally invite your team.
                    </p>
                </div>

                <form action={onboard} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-900">
                            Agency Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="AgencyFlow Studio"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="slug" className="text-sm font-medium text-gray-900">
                            Workspace slug
                        </label>
                        <input
                            id="slug"
                            name="slug"
                            type="text"
                            required
                            placeholder="agencyflow-studio"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                        />
                        <p className="text-xs text-gray-500">
                            Use lowercase letters, numbers, and hyphens only.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="brandColor" className="text-sm font-medium text-gray-900">
                            Brand Color
                        </label>

                        <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 py-2">
                        <input
                            id="brandcolor"
                            name="brandColor"
                            type="color"
                            defaultValue="#2563eb"
                            className="h-10 w-14 cursor-pointer rounded-md border border-gray-200 bg-transparent p-1"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">Primary brand color</span>
                            <span className="text-xs text-gray-500">Used in invoices and branding</span>
                        </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="inviteEmails" className="text-sm font-medium text-gray-900">
                            Invite team members
                        </label>
                        <textarea
                            id="inviteEmails"
                            name="inviteEmails"
                            rows={4}
                            placeholder="team@example.com, designer@example.com" 
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                        />
                        <p className="text-xs text-gray-500">
                            Separate multiple emails with commas.
                        </p>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Create agency
                    </button>
                </form>
            </div>
        </main>
    );
}