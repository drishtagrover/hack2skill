import './index.css';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatIs from './components/WhatIs';
import WhyParticipate from './components/WhyParticipate';
import HowTo from './components/HowTo';
import Challenges from './components/Challenges';
import Schedule from './components/Schedule';
import Rewards from './components/Rewards';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatIs />
        <WhyParticipate />
        <HowTo />
        <Challenges />
        <Schedule />
        <Rewards />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
