import uabcFoto from "@/assets/img/uabc-foto.webp";

export const Hero = () => {
  return (
    <section className="relative h-96 overflow-hidden">
      <img src={uabcFoto} alt="Campus universitario" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      {/* Gradient fade effect at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Información Académica</h2>
          <p className="text-xl md:text-2xl opacity-90">Accede a tu información académica de forma rápida y sencilla</p>
        </div>
      </div>
    </section>
  )
}
