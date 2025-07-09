interface Feature {
	title: string;
	description: string;
	icon: string;
	link: string;
	available: boolean;
}

interface FeaturesGridProps {
	features: Feature[];
}

export default function FeaturesGrid({ features }: FeaturesGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{features.map((feature) => (
				<a
					key={feature.title}
					href={feature.link}
					target="_blank"
					rel="noopener noreferrer"
					className="bg-black/80 border border-green-500/50 rounded-lg p-6 backdrop-blur-sm hover:border-green-400/70 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 group flex flex-col h-full"
				>
					<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
						{feature.icon}
					</div>
					<div className="flex items-center justify-between mb-3">
						<h3 className="text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
							{feature.title}
						</h3>
						{!feature.available && (
							<span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full border border-yellow-500/30">
								Próximamente
							</span>
						)}
					</div>
					<p className="text-green-300 mb-4 group-hover:text-green-200 transition-colors flex-grow">
						{feature.description}
					</p>
					<div className="flex items-center text-green-500 text-sm font-medium group-hover:text-green-400 transition-colors mt-auto">
						<svg
							className="h-4 w-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>GitHub</title>
							<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
						</svg>
						Ver en GitHub
					</div>
				</a>
			))}
		</div>
	);
}
