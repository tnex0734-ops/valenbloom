import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FLOWERS, decodeBouquet, type BouquetData } from "@/data/flowers";
import FlowerSVG from "@/components/FlowerSVG";
import FloatingPetals from "@/components/FloatingPetals";

export default function ReceiverPage() {
  const { data } = useParams<{ data: string }>();
  const [bouquet, setBouquet] = useState<BouquetData | null>(null);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (data) {
      const decoded = decodeBouquet(data);
      setBouquet(decoded);
    }
    const t1 = setTimeout(() => setPhase("reveal"), 2500);
    const t2 = setTimeout(() => setPhase("done"), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [data]);

  // Typewriter effect
  useEffect(() => {
    if (phase === "done" && bouquet?.message) {
      const interval = setInterval(() => {
        setCharIndex((prev) => {
          if (prev >= bouquet.message.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 35);
      return () => clearInterval(interval);
    }
  }, [phase, bouquet]);

  const flowers = bouquet?.flowers.map((id) => FLOWERS.find((f) => f.id === id)!).filter(Boolean) || [];

  if (!bouquet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">This bouquet link seems invalid.</p>
          <Link to="/" className="mt-4 inline-block text-accent underline">Create your own bouquet →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary/5 relative overflow-hidden grain-overlay">
      <FloatingPetals count={20} deep />

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div
            key="loading"
            className="fixed inset-0 flex flex-col items-center justify-center z-10"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              💝
            </motion.div>
            <motion.p
              className="font-serif text-2xl md:text-3xl text-primary text-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Someone sent you<br />something special...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {(phase === "reveal" || phase === "done") && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10">
          {bouquet.to && (
            <motion.p
              className="font-serif text-xl text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              For <span className="text-primary font-semibold">{bouquet.to}</span>
            </motion.p>
          )}

          {/* Bouquet reveal */}
          <motion.div
            className="flex gap-1 items-end justify-center mb-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.3 }}
          >
            <motion.div
              className="flex gap-0.5 items-end"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {flowers.map((f, i) => {
                const rotation = (i - (flowers.length - 1) / 2) * 15;
                return (
                  <motion.div
                    key={f.id}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
                  >
                    <FlowerSVG flower={f} size={60} className="md:w-20 md:h-20" />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Wrapper */}
          <motion.svg
            viewBox="0 0 200 60"
            className="w-40 md:w-52 -mt-2 mb-8"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <path d="M25 0 L5 60 L195 60 L175 0 Z" fill="hsl(33 30% 75%)" stroke="hsl(33 40% 65%)" strokeWidth="1.5" />
            <path d="M65 10 Q100 20 135 10" stroke="hsl(43 72% 52%)" strokeWidth="3" strokeLinecap="round" fill="none" />
          </motion.svg>

          {/* Message card */}
          {phase === "done" && bouquet.message && (
            <motion.div
              className="glass-card rounded-2xl p-8 max-w-md w-full shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <p className="font-serif-display text-xl md:text-2xl text-foreground leading-relaxed italic text-center">
                "{bouquet.message.slice(0, charIndex)}
                {charIndex < bouquet.message.length && (
                  <span className="animate-pulse">|</span>
                )}
                "
              </p>
            </motion.div>
          )}

          {/* From */}
          {phase === "done" && bouquet.from && (
            <motion.p
              className="mt-6 text-muted-foreground font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              With love, <span className="text-primary font-medium">{bouquet.from}</span>
            </motion.p>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-12"
          >
            <Link to="/">
              <motion.span
                className="px-8 py-3 rounded-full gold-shimmer text-accent-foreground font-medium shadow-lg inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Create your own bouquet 🌹
              </motion.span>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}
