import { Navbar, SidebarSection } from "@/components";

// contexts
import { ActiveTabProvider } from "@/context";

const sidebarWidth = "233px";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ActiveTabProvider>
        <body className={`relative flex h-screen`}>
          <section
            className="fixed left-0 top-0 h-full"
            style={{ width: sidebarWidth }}
          >
            <SidebarSection />
          </section>
          <section
            className="flex flex-col flex-grow"
            style={{ marginLeft: sidebarWidth }}
          >
            <Navbar width={sidebarWidth} />

            <section
              className="flex-grow p-4"
              style={{ minHeight: "calc(100vh - 70px)" }}
            >
              {children}
            </section>
          </section>
        </body>
      </ActiveTabProvider>
    </html>
  );
}
