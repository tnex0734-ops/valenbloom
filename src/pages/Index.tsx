import { useState, useRef } from "react";
import FloatingPetals from "@/components/FloatingPetals";
import HeroSection from "@/components/HeroSection";
import FlowerPicker from "@/components/FlowerPicker";
import BouquetPreview from "@/components/BouquetPreview";
import LoveNote from "@/components/LoveNote";
import ShareSection from "@/components/ShareSection";

const Index = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const pickerRef = useRef<HTMLDivElement>(null);
  const bouquetRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFlower = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="grain-overlay relative min-h-screen bg-background">
      <FloatingPetals count={12} />

      <HeroSection onStart={() => scrollTo(pickerRef)} />

      <div ref={pickerRef}>
        <FlowerPicker
          selected={selected}
          onToggle={toggleFlower}
          onNext={() => scrollTo(bouquetRef)}
        />
      </div>

      <div ref={bouquetRef}>
        <BouquetPreview
          selected={selected}
          onRemove={(id) => setSelected((prev) => prev.filter((f) => f !== id))}
          onNext={() => scrollTo(noteRef)}
        />
      </div>

      <div ref={noteRef}>
        <LoveNote
          message={message}
          setMessage={setMessage}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          onNext={() => scrollTo(shareRef)}
        />
      </div>

      <div ref={shareRef}>
        <ShareSection selected={selected} message={message} from={from} to={to} />
      </div>

      <footer className="py-8 text-center text-muted-foreground text-sm">
        Made with 🌹 by Bloomcraft
      </footer>
    </div>
  );
};

export default Index;
