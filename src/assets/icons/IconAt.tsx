import type { SVGProps } from "react";
const IconAt = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={2}
		className="icon icon-tabler icons-tabler-outline icon-tabler-at"
		{...props}
	>
		<title>Icono de correo electrónico</title>
		<path stroke="none" d="M0 0h24v24H0z" />
		<path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0" />
		<path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-5.5 8.28" />
	</svg>
);
export default IconAt;
