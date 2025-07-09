export default function AboutSection() {
	return (
		<section id="about" className="relative z-20 py-20 px-4">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
						<span className="text-green-500">[</span>ABOUT
						<span className="text-green-500">]</span>
					</h2>
					<p className="text-green-300 text-lg">
						Uabc puede ser mejor en sus plataformas y la comunidad ayuda para
						esto.{" "}
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-black/80 border border-green-500/50 rounded-lg p-6 backdrop-blur-sm">
						<h3 className="text-xl font-bold text-green-400 mb-4">
							<span className="text-green-500">&gt;</span> Open Source
						</h3>
						<p className="text-green-300 mb-4 leading-relaxed">
							Todo nuestro código es público y auditable. Cualquier estudiante
							puede revisar, contribuir y mejorar la plataforma.
						</p>
					</div>
					<div className="bg-black/80 border border-green-500/50 rounded-lg p-6 backdrop-blur-sm">
						<h3 className="text-xl font-bold text-green-400 mb-4">
							<span className="text-green-500">&gt;</span> Privacidad
						</h3>
						<p className="text-green-300 mb-4 leading-relaxed">
							No tenemos interes en tus datos, solo queremos mejorar tu
							experiencia en uabc.
						</p>
						<div className="bg-black/90 rounded p-3 font-mono text-sm text-green-400">
							<div className="text-green-600 mb-1">
								{"// Política de datos"}
							</div>
							<div className="mb-1">data_collection = false;</div>
							<div className="mb-1">user_tracking = disabled;</div>
							<div>privacy = maximum;</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
