import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Megaphone, Sparkles, Globe, BadgeDollarSign, ArrowRight, Quote, Mail, MapPin, Phone, Instagram, Twitter, Linkedin } from 'lucide-react';

const navLinkClass = ({ isActive }) => `px-4 py-2 rounded-full transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'}`;

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0b0b12] text-white selection:bg-fuchsia-500/40 selection:text-white">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl tracking-tight">
            <span className="text-fuchsia-400">Flames</span>
            <span className="text-cyan-300">.Agency</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/services" className={navLinkClass}>Services</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>
          <Link to="/contact" className="ml-4 inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black font-semibold px-4 py-2 rounded-full hover:opacity-90 transition">
            Contact us <ArrowRight size={18} />
          </Link>
        </div>
      </header>
      <main className="pt-24">
        {children}
      </main>
      <footer className="mt-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <div className="font-semibold text-lg">Flames Agency</div>
            <p className="text-white/70 mt-2">Creativity. Strategy. Results.</p>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <div className="mt-2 flex flex-col gap-2 text-white/80">
              <div className="flex items-center gap-2"><Mail size={18}/> hello@flames.agency</div>
              <div className="flex items-center gap-2"><Phone size={18}/> +1 (555) 123-4567</div>
              <div className="flex items-center gap-2"><MapPin size={18}/> 123 Creative Ave, NY</div>
            </div>
          </div>
          <div>
            <div className="font-semibold">Follow</div>
            <div className="mt-2 flex items-center gap-4 text-white/80">
              <a className="hover:text-white" href="#" aria-label="Instagram"><Instagram/></a>
              <a className="hover:text-white" href="#" aria-label="Twitter"><Twitter/></a>
              <a className="hover:text-white" href="#" aria-label="LinkedIn"><Linkedin/></a>
            </div>
          </div>
        </div>
        <div className="text-center text-white/50 text-sm pb-8">© {new Date().getFullYear()} Flames Agency. All rights reserved.</div>
      </footer>
    </div>
  );
}

function GradientOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -inset-40 opacity-40 bg-[radial-gradient(ellipse_at_top_left,rgba(216,70,239,0.5),transparent_50%)]" />
      <div className="absolute -inset-40 opacity-40 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.5),transparent_50%)]" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <GradientOverlay />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center">
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.8}} className="text-5xl sm:text-6xl font-black tracking-tight">
            Creativity. <span className="text-fuchsia-400">Strategy</span>. <span className="text-cyan-300">Results</span>.
          </motion.h1>
          <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration:0.8}} className="mt-6 text-lg text-white/80 max-w-xl">
            We are a marketing agency crafting bold, conversion-focused experiences that move brands forward.
          </motion.p>
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.4, duration:0.8}} className="mt-8 flex items-center gap-4">
            <Link to="/contact" className="bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition inline-flex items-center gap-2">
              Contact us <ArrowRight size={18} />
            </Link>
            <a href="#services" className="text-white/80 hover:text-white transition">Explore services</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const servicesIcons = {
  Megaphone: Megaphone,
  Sparkles: Sparkles,
  Globe: Globe,
  BadgeDollarSign: BadgeDollarSign,
};

function ServicesPreview() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/services`);
        const data = await res.json();
        setServices(data.slice(0,4));
      } catch (e) {
        // fallback
        setServices([
          { title: 'Social Media Marketing', description: 'Data-driven campaigns with trend-jacking creative.', icon:'Megaphone' },
          { title: 'Brand Building', description: 'Positioning, identity systems, and storytelling.', icon:'Sparkles' },
          { title: 'Web Development', description: 'Fast, accessible, conversion-focused web experiences.', icon:'Globe' },
          { title: 'PPC Campaigns', description: 'ROI-obsessed paid search and social ads.', icon:'BadgeDollarSign' },
        ]);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold">What we do</h2>
        <p className="text-white/70 mt-3 max-w-2xl">Full-funnel growth services blending creativity with ruthless performance.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = servicesIcons[s.icon] || Sparkles;
            return (
              <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-fuchsia-400/50 hover:bg-white/10 transition relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-fuchsia-500/10 blur-2xl group-hover:bg-cyan-400/10 transition" />
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/30 flex items-center justify-center">
                  <Icon />
                </div>
                <div className="mt-4 font-semibold text-lg">{s.title}</div>
                <p className="text-white/70 text-sm mt-2">{s.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/testimonials`);
        const data = await res.json();
        setItems(data);
      } catch (e) {
        setItems([
          { author:'Alex Rivera', role:'CMO, NovaTech', quote:'They turned our brand into a movement. Our CPA dropped 38% in a month.' },
          { author:'Mina Park', role:'Founder, Bloom & Co.', quote:'Creative that actually converts. The team is a joy to work with.' },
          { author:'Sam Patel', role:'Head of Growth, ArcLabs', quote:'From zero to consistent pipeline in 8 weeks. Unreal.' },
        ]);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold">What clients say</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 hover:bg-white/10 transition">
              <Quote className="text-fuchsia-400" />
              <p className="mt-4 text-white/80">{t.quote}</p>
              <div className="mt-6 text-sm text-white/60">— {t.author}{t.role ? `, ${t.role}` : ''}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Testimonials />
      <section className="py-16 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition">
          Contact us <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}

function ServicesPage() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/services`);
        const data = await res.json();
        setServices(data);
      } catch (e) {
        setServices([
          { title: 'Social Media Marketing', description: 'Data-driven campaigns with trend-jacking creative.', icon:'Megaphone' },
          { title: 'Brand Building', description: 'Positioning, identity systems, and storytelling.', icon:'Sparkles' },
          { title: 'Web Development', description: 'Fast, accessible, conversion-focused web experiences.', icon:'Globe' },
          { title: 'PPC Campaigns', description: 'ROI-obsessed paid search and social ads.', icon:'BadgeDollarSign' },
        ]);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.08),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold">Services</h1>
        <p className="text-white/70 mt-3 max-w-2xl">We combine daring creative with performance engineering to drive measurable growth.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = servicesIcons[s.icon] || Sparkles;
            return (
              <motion.div key={i} whileHover={{ y:-6 }} className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-fuchsia-400/50 hover:bg-white/10 transition overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-cyan-400/10 blur-2xl group-hover:bg-fuchsia-500/10 transition" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/30 flex items-center justify-center">
                    <Icon />
                  </div>
                  <div className="mt-4 font-semibold text-xl">{s.title}</div>
                  <p className="text-white/70 text-sm mt-2">{s.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setForm({ name:'', email:'', message:'' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative min-h-[80vh] py-24 overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <GradientOverlay />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <div className="backdrop-blur-xl/10 bg-black/20 border border-white/10 rounded-2xl p-6">
          <h1 className="text-4xl font-bold">Let’s build something bold</h1>
          <p className="text-white/70 mt-3">Tell us a bit about your goals and we’ll get back to you within 24 hours.</p>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required placeholder="Your name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-fuchsia-400" />
            <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required placeholder="Email address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400" />
            <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required placeholder="Your message" rows="5" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-fuchsia-400" />
            <button disabled={status==='sending'} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition">
              {status==='sending' ? 'Sending…' : 'Send message'}
            </button>
            {status==='sent' && <div className="text-emerald-400 text-sm">Message sent! We’ll be in touch.</div>}
            {status==='error' && <div className="text-rose-400 text-sm">Something went wrong. Please try again.</div>}
          </form>
        </div>
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="font-semibold">Our studio</div>
            <div className="mt-2 flex items-center gap-2 text-white/80"><MapPin size={18}/> 123 Creative Ave, New York, NY</div>
            <div className="mt-2 flex items-center gap-2 text-white/80"><Phone size={18}/> +1 (555) 123-4567</div>
            <div className="mt-2 flex items-center gap-2 text-white/80"><Mail size={18}/> hello@flames.agency</div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <iframe title="map" className="w-full h-72" src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0060%2C40.7128%2C-74.0060%2C40.7128&amp;layer=mapnik" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </BrowserRouter>
  );
}
