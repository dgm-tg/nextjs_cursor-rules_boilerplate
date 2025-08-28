import Link from "next/link";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/Button";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold">
              Membership App
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20">
          <div className="container mx-auto text-center">
            <h1 className="mb-6 text-5xl font-bold">
              Welcome to Our Membership Platform
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Join our community and get access to exclusive content, resources, and
              connect with other members. Start your journey today!
            </p>
            {!session && (
              <div className="flex justify-center gap-4">
                <Link href="/register">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted py-20">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Why Join Us?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-background p-6 shadow">
                <h3 className="mb-4 text-xl font-semibold">
                  Exclusive Content
                </h3>
                <p className="text-muted-foreground">
                  Access premium resources and content available only to members.
                </p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow">
                <h3 className="mb-4 text-xl font-semibold">
                  Community Access
                </h3>
                <p className="text-muted-foreground">
                  Connect with like-minded individuals and grow your network.
                </p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow">
                <h3 className="mb-4 text-xl font-semibold">
                  Regular Updates
                </h3>
                <p className="text-muted-foreground">
                  Stay informed with the latest announcements and updates.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Membership App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}