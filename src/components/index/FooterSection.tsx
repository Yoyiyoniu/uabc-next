import UabcLogo from "@/assets/icons/main/UabcLogo";

export default function FooterSection() {
  return (
    <footer className="relative z-20 border-t border-green-500/50 bg-black/95 backdrop-blur-sm py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 relative">
              <UabcLogo />
            </div>
            <div>
              <div className="text-green-400 font-bold">UABC NEXT</div>
              <div className="text-green-600 text-sm">Open Source Community</div>
            </div>
          </div>
          <div className="text-green-500 text-sm">
            Made with <span className="text-red-500">♥</span> by the Cimarrón Community
          </div>
        </div>
      </div>
    </footer>
  );
} 