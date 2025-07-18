import type { SVGProps } from "react";

const IconFileInfo = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={2}
		className="icon icon-tabler icons-tabler-outline icon-tabler-file-info"
		{...props}
	>
		<title>Información del archivo</title>
		<path stroke="none" d="M0 0h24v24H0z" />
		<path d="M14 3v4a1 1 0 0 0 1 1h4" />
		<path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
		<path d="M11 14h1v4h1M12 11h.01" />
	</svg>
);
export default IconFileInfo;
