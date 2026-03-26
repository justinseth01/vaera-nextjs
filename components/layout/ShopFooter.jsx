export default function ShopFooter() {
  return (
    <footer className="bg-vaera-navy rounded-t-5xl">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="font-italiana text-3xl text-white mb-4">VAERA</h3>
              <p className="font-poppins font-light text-white/60 max-w-sm mb-6">
                Bridging the gap between clinical and at-home skincare. Science-backed, dermatologist-informed innovation.
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-2 h-2 bg-green-400 rounded-full pulse-ring" />
                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">System Operational</span>
              </div>
            </div>

            <div>
              <h4 className="font-poppins font-medium text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Science', 'Careers', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-poppins font-light text-white/60 hover:text-white transition-colors magnetic-hover inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-poppins font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-poppins font-light text-white/60 hover:text-white transition-colors magnetic-hover inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-poppins font-light text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Vaera. All rights reserved.
            </p>
            <p className="font-mono text-xs text-white/30">
              Designed in California. Engineered for results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
