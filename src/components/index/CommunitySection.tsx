export default function CommunitySection() {
	return (
		<section id="community" className="relative z-20 py-20 px-4">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-8">
					<span className="text-green-500">[</span>COMMUNITY
					<span className="text-green-500">]</span>
				</h2>
				<div className="bg-black/90 border border-green-500/50 rounded-lg p-8 backdrop-blur-sm">
					<p className="text-green-300 text-lg mb-8 leading-relaxed">
						¿Quieres ser parte de este movimiento? Únete a la comunidad de
						desarrolladores cimarrones que están revolucionando la experiencia
						universitaria en UABC. Contáctanos y ayúdanos a construir el futuro
						de la educación digital.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="https://discord.gg/uabc-next"
							className="bg-black/90 hover:bg-black/70 text-green-400 font-bold py-3 px-6 rounded transition-all duration-200 border border-green-500/50"
						>
							DISCORD
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
