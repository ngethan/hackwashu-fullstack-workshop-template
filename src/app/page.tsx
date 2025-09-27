import Link from "next/link";
import { getSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await getSession();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            HackWashU <span className="text-[hsl(280,100%,70%)]">Template</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href={session ? "/todos" : "/auth"}
            >
              <h3 className="text-2xl font-bold">
                {session ? "My Todos →" : "Get Started →"}
              </h3>
              <div className="text-lg">
                {session
                  ? "Manage your todo list and stay organized."
                  : "Sign in to create and manage your todos."}
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about the T3 Stack and how to build with it.
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Welcome back, {session.user?.name || session.user?.email}!</span>}
            </p>
            <div className="flex gap-4">
              {session && (
                <Link
                  href="/todos"
                  className="rounded-full bg-purple-600 px-10 py-3 font-semibold no-underline transition hover:bg-purple-700"
                >
                  Go to Todos
                </Link>
              )}
              <Link
                href={session ? "/auth" : "/auth"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
