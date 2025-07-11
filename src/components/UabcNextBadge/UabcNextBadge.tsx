import "./UabcNextBadge.css";

export const UabcNextBadge = () => {
	return (
		<span
			className="inline-block bg-black text-green-400 text-xs font-mono font-bold px-3 py-1 rounded shadow-sm relative overflow-hidden hacker-badge"
			style={{ letterSpacing: "0.05em", border: "1px solid #22d3ee" }}
			data-text="By Uabc Next"
		>
			<span className="relative z-10">By Uabc Next</span>
			<span className="absolute inset-0 opacity-20 animate-hacker-glitch pointer-events-none select-none">
				By Uabc Next
			</span>
		</span>
	);
};
