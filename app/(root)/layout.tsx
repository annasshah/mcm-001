import { Navbar, SidebarSection } from "@/components";

// contexts
import { ActiveTabProvider, LocationProvider } from "@/context";

const sidebarWidth = "233px";

export default function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-gray-50">
			<ActiveTabProvider>
				<LocationProvider>

					<div className={`relative flex h-screen`}>
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
								className="flex-grow p-4 bg-gray-50"
								// style={{ minHeight: "calc(100vh - 70px)" }}
								style={{
									minHeight: "100vh",
									// backgroundColor: ,
								}}
							>
								{children}
							</section>
						</section>
					</div>
				</LocationProvider>
			</ActiveTabProvider>
		</div>
	);
}
