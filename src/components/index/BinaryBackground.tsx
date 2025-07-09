interface BinaryBackgroundProps {
	binaryPattern: string[];
}

export default function BinaryBackground({
	binaryPattern,
}: BinaryBackgroundProps) {
	return (
		<>
			{/* Fondo binario */}
			<div className="absolute inset-0 opacity-15 pointer-events-none select-none">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10" />
				<div className="text-green-500/40 text-xs leading-3 whitespace-pre font-mono tracking-wider">
					{binaryPattern.map((line) => (
						<div
							key={line}
							className="animate-pulse"
							style={{
								animationDelay: `${(binaryPattern.indexOf(line) * 0.1) % 3}s`,
								animationDuration: "4s",
							}}
						>
							{line}
						</div>
					))}
				</div>
			</div>
			{/* Lluvia binaria animada */}
			<div className="absolute inset-0 opacity-10 pointer-events-none">
				{Array.from({ length: 15 }, (_, i) => ({
					id: `rain-${i}`,
					left: `${(i * 7) % 100}%`,
					top: `${Math.random() * 100}%`,
					animationDelay: `${Math.random() * 3}s`,
					animationDuration: "6s",
				})).map((rainDrop) => (
					<div
						key={rainDrop.id}
						className="absolute text-green-400 text-sm font-mono animate-pulse"
						style={{
							left: rainDrop.left,
							top: rainDrop.top,
							animationDelay: rainDrop.animationDelay,
							animationDuration: rainDrop.animationDuration,
						}}
					>
						{Array.from({ length: 20 }, () =>
							Math.random() > 0.5 ? "1" : "0",
						).join("")}
					</div>
				))}
			</div>
			{/* Números binarios flotantes */}
			<div className="absolute inset-0 opacity-20 pointer-events-none">
				{Array.from({ length: 25 }, (_, i) => ({
					id: `float-${i}`,
					left: `${Math.random() * 100}%`,
					top: `${Math.random() * 100}%`,
					animationDelay: `${Math.random() * 4}s`,
					animationDuration: `${3 + Math.random() * 2}s`,
				})).map((floatElement) => (
					<div
						key={floatElement.id}
						className="absolute text-green-500 text-lg font-mono animate-bounce"
						style={{
							left: floatElement.left,
							top: floatElement.top,
							animationDelay: floatElement.animationDelay,
							animationDuration: floatElement.animationDuration,
						}}
					>
						{Math.random() > 0.5 ? "1" : "0"}
					</div>
				))}
			</div>
		</>
	);
}
