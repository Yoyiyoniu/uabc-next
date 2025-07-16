import type { SVGProps } from "react";
const IconLogin2 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={2}
		className="icon icon-tabler icons-tabler-outline icon-tabler-login-2"
		{...props}
	>
		<title>Login</title>
		<path stroke="none" d="M0 0h24v24H0z" />
		<path d="M9 8V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-2" />
		<path d="M3 12h13l-3-3M13 15l3-3" />
	</svg>
);
export default IconLogin2;
