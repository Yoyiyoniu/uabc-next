interface HeroSectionProps {
	text: string;
	showCursor: boolean;
}

export default function HeroSection({ text, showCursor }: HeroSectionProps) {
	return (
		<section className="relative z-20 min-h-screen flex items-center justify-center px-4 py-16">
			<div className="max-w-5xl mx-auto text-center space-y-8">
				<div className="text-green-400 font-mono text-lg mb-4 h-6">
					{text}
					<span className={showCursor ? "opacity-100" : "opacity-0"}>|</span>
				</div>
				<div className="space-y-6">
					<h1 className="text-4xl md:text-6xl font-bold text-green-400 leading-tight">
						<span className="text-green-500">[</span>
						UABC NEXT
						<span className="text-green-500">]</span>
					</h1>
					<div className="text-xl md:text-2xl space-y-3 max-w-3xl mx-auto">
						<p className="text-green-300">Todo de Código abierto </p>
						<p className="text-green-400">
							Construido por cimarrones, para cimarrones
						</p>
						<p className="text-green-500">{""}</p>
					</div>
				</div>
				<div className="bg-black/90 border border-green-500/50 rounded-lg p-6 mb-8 backdrop-blur-sm max-w-2xl mx-auto">
					<p className="text-green-400 text-lg mb-4">
						<span className="text-green-500 text-xl">&gt;</span> Tu privacidad
						no es nuestro negocio
					</p>
					<p className="text-green-300">Movimiento para Revolucionar UABC </p>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 justify-center" />
			</div>
		</section>
	);
}
