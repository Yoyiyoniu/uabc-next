import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import AboutSection from "../components/index/AboutSection";
import BinaryBackground from "../components/index/BinaryBackground";
import CommunitySection from "../components/index/CommunitySection";
import FeaturesGrid from "../components/index/FeaturesGrid";
import FooterSection from "../components/index/FooterSection";
import Header from "../components/index/Header";
import HeroSection from "../components/index/HeroSection";

export const Route = createFileRoute("/")({
	component: LandingPage,
});

const FEATURES = [
	{
		title: "Cima Sync",
		description: "Acceso directo al Portal Cimarrón sin contraseñas",
		icon: "🤓",
		link: "https://github.com/uabc-next/auto-login",
		available: true,
	},
	{
		title: "Portal de Estudiantes",
		description:
			"Acceso directo al Portal de Estudiantes con información clara y actualizada",
		icon: "🔐",
		link: "https://github.com/uabc-next/auto-login",
		available: true,
	},
	{
		title: "Uabc API",
		description: "Acceso directo a la Api de Uabc",
		icon: "🔐",
		link: "",
		available: false,
	},
];

function LandingPage() {
	const [text, setText] = useState("");
	const [showCursor, setShowCursor] = useState(true);
	const [activeNav, setActiveNav] = useState("");
	const fullText = "UABC NEXT > Actualizando Uabc...";

	useEffect(() => {
		let i = 0;
		const timer = setInterval(() => {
			if (i < fullText.length) {
				setText(fullText.slice(0, i + 1));
				i++;
			} else {
				clearInterval(timer);
			}
		}, 100);
		const cursorTimer = setInterval(() => setShowCursor((prev) => !prev), 500);
		return () => {
			clearInterval(timer);
			clearInterval(cursorTimer);
		};
	}, []);

	// Solo se genera una vez
	const binaryPattern = useMemo(() => {
		const pattern = [];
		for (let i = 0; i < 200; i++) {
			const line = Array.from({ length: 80 }, () =>
				Math.random() > 0.5 ? "1" : "0",
			).join("");
			pattern.push(line);
		}
		return pattern;
	}, []);

	return (
		<div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
			<div className="fixed inset-0 z-0">
				<div
					className="absolute inset-0 h-[900px]"
					style={{
						backgroundImage: `
							linear-gradient(to right, #0e4f26 1px, transparent 1px),
							linear-gradient(to bottom, #0e4f26 1px, transparent 1px)
						`,
						backgroundSize: "20px 30px",
						WebkitMaskImage:
							"radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
						maskImage:
							"radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
					}}
				/>
			</div>
			<BinaryBackground binaryPattern={binaryPattern} />
			<Header activeNav={activeNav} setActiveNav={setActiveNav} />
			<HeroSection text={text} showCursor={showCursor} />
			<section id="features" className="relative z-20 py-20 px-4 bg-black/60">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
							<span className="text-green-500">[</span>FEATURES
							<span className="text-green-500">]</span>
						</h2>
						<p className="text-green-300 text-lg">
							Herramientas forjadas en código libre
						</p>
					</div>
					<FeaturesGrid features={FEATURES} />
				</div>
			</section>
			<AboutSection />
			<CommunitySection />
			<FooterSection />
		</div>
	);
}
