import { motion } from 'motion/react';
import { ExternalLink, Download, Search, Headphones, Globe } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

const RESOURCES = [
  {
    name: 'Mixkit',
    description: 'High-quality free sound effects for your next project.',
    url: 'https://mixkit.co/free-sound-effects/',
    tags: ['Royalty Free', 'Premium Quality']
  },
  {
    name: 'Freesound',
    description: 'Collaborative database of audio snippets, samples, and recordings.',
    url: 'https://freesound.org/',
    tags: ['CC Licensed', 'Massive Library']
  },
  {
    name: 'ZapSplat',
    description: 'Thousands of free sound effects and royalty-free music.',
    url: 'https://www.zapsplat.com/',
    tags: ['Professional', 'Packaged']
  },
  {
    name: 'Sonniss',
    description: 'High-end GDC sound bundles released for free every year.',
    url: 'https://sonniss.com/gameaudiofree',
    tags: ['Game Audio', 'High Fidelity']
  }
];

export function DiscoveryHub() {
  const { playClick, playHover } = useSoundEffects();

  return (
    <div className="space-y-8 mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 opacity-40">
            <Globe size={14} />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Resource Discovery</span>
          </div>
          <h2 className="text-4xl font-serif italic">Global Sound Hub</h2>
          <p className="text-white/40 max-w-md text-sm leading-relaxed">
            Need more? Explore these verified platforms to find the perfect sonic signature for your own creative projects.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {RESOURCES.map((res) => (
          <motion.a
            key={res.name}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group glass-morphism p-6 rounded-3xl flex flex-col justify-between gap-6 border-white/5 hover:border-white/20 transition-all overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <Download size={40} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-serif italic text-white/90">{res.name}</span>
                <ExternalLink size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <p className="text-xs text-white/40 leading-relaxed font-sans min-h-[3em]">
                {res.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {res.tags.map(tag => (
                <span key={tag} className="text-[9px] font-mono uppercase tracking-tighter px-2 py-0.5 bg-white/5 rounded text-white/30 border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>

      <div className="glass-morphism rounded-3xl p-12 text-center space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 opacity-5 pointer-events-none" />
        <div className="flex justify-center flex-col items-center space-y-4">
          <div className="p-4 bg-white/10 rounded-full">
            <Globe size={32} />
          </div>
          <h3 className="text-2xl font-serif italic">Integrate on your Website</h3>
          <p className="text-white/40 max-w-lg text-sm mx-auto">
            Want to host this playground on your own domain? Use the snippet below to embed the experience anywhere.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="p-4 bg-black/40 rounded-xl border border-white/10 font-mono text-[11px] text-left overflow-x-auto whitespace-pre text-emerald-400">
{`<iframe 
  src="${window.location.origin}" 
  width="100%" 
  height="800px" 
  style="border:none; border-radius:24px; box-shadow:0 20px 50px rgba(0,0,0,0.5);"
></iframe>`}
          </div>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 text-white">Ready for Production</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-morphism rounded-3xl p-8 text-center space-y-4 border-dashed border-white/20">
         <div className="flex justify-center items-center gap-3">
            <Download size={20} className="text-blue-400" />
            <h4 className="text-lg font-serif italic">Export Source Code</h4>
         </div>
         <p className="text-xs text-white/40">You can also export the full React codebase via the <strong>Settings &gt; Export</strong> menu in AI Studio to host it on Vercel, Netlify, or GitHub Pages.</p>
      </div>
    </div>
  );
}
