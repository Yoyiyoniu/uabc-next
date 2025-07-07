import { createFileRoute } from "@tanstack/react-router";

import Nav from "@/components/layout/Nav";

export const Route = createFileRoute("/estudiantes")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Nav />
		</>
	);
}
