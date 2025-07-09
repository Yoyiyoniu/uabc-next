import type { SVGProps } from "react"

const spinStyle = {
  animation: 'spin 1s linear infinite',
}

const IconLoading = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="animate-spin"
    style={spinStyle}
    {...props}
  >
    <title>Icono de carga</title>
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M3 12a9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9" />
    <path d="M17 12a5 5 0 1 0-5 5" />
  </svg>
)

export default IconLoading;
