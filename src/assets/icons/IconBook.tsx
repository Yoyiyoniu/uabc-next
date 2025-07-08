import type { SVGProps } from "react";

const IconBook = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={2}
		className="icon icon-tabler icons-tabler-outline icon-tabler-book"
		{...props}
	>
		<title>Libro</title>
		<path stroke="none" d="M0 0h24v24H0z" />
		<path d="M3 19a9 9 0 0 1 9 0 9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0 9 9 0 0 1 9 0M3 6v13M12 6v13M21 6v13" />
	</svg>
);
export default IconBook;
