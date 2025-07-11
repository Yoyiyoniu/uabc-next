import type { SVGProps } from "react"

const IconAward = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="icon icon-tabler icons-tabler-outline icon-tabler-award"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M6 9a6 6 0 1 0 12 0A6 6 0 1 0 6 9" />
    <path d="m12 15 3.4 5.89 1.598-3.233 3.598.232-3.4-5.889M6.802 12l-3.4 5.89L7 17.657l1.598 3.232 3.4-5.889" />
  </svg>
)
export default IconAward
