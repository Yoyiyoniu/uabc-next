import type { SVGProps } from "react";

const IconMenu2 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={2}
		className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
		{...props}
	>
		<title>Menú</title>
		<path stroke="none" d="M0 0h24v24H0z" />
		<path d="M4 6h16M4 12h16M4 18h16" />
	</svg>
);
export default IconMenu2;
