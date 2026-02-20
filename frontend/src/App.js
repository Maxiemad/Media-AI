import "@/App.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Story } from "./components/Story";
import { Countdown } from "./components/Countdown";
import { Gallery } from "./components/Gallery";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="relative">
      {/* Chatbot rendered at root level for proper fixed positioning */}
      <Chatbot />
      
      <SmoothScroll>
        <div className="relative min-h-screen bg-[#030305]">
          <NoiseOverlay />
          <Navbar />
          
          <main>
            <Hero />
            
            <div id="features">
              <Features />
            </div>
            
            <div id="story">
              <Story />
            </div>
            
            <Countdown />
            
            <div id="gallery">
              <Gallery />
            </div>
            
            <div id="waitlist">
              <Newsletter />
            </div>
          </main>
          
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </SmoothScroll>
    </div>
  );
}

export default App;
