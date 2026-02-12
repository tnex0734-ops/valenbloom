import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FLOWERS } from "@/data/flowers";
import FlowerSVG from "./FlowerSVG";

interface BouquetPreviewProps {
  selected: string[];
  onRemove: (id: string) => void;
  onNext: () => void;
}

export default function BouquetPreview({ selected, onRemove, onNext }: BouquetPreviewProps) {
  const flowers = selected.map((id) => FLOWERS.find((f) => f.id === id)!).filter(Boolean);

  const getFlowerPosition = (index: number, total: number) => {
    const spreadAngle = Math.min(total * 18, 70);
    const startAngle = -spreadAngle / 2;
    const angleStep = total > 1 ? spreadAngle / (total - 1) : 0;
    const angle = startAngle + index * angleStep;
    const radians = (angle * Math.PI) / 180;

    const radius = 80;
    const x = Math.sin(radians) * radius;
    const y = -Math.cos(radians) * radius * 0.5;
    const rotation = angle * 0.6;

    return { x, y: y - 20, rotation };
  };

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto" id="bouquet">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">
          Your Bouquet
        </h2>
      </motion.div>

      <motion.div
        className="relative mx-auto flex flex-col items-center"
        style={{ minHeight: 340 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Flowers arranged in fan layout */}
        <div className="relative" style={{ width: 280, height: 200 }}>
          <AnimatePresence>
            {flowers.map((flower, i) => {
              const pos = getFlowerPosition(i, flowers.length);
              return (
                <motion.div
                  key={flower.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: "50%",
                    bottom: 0,
                    originX: 0.5,
                    originY: 1,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: pos.x - 35,
                    y: pos.y,
                    rotate: pos.rotation,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  onClick={() => onRemove(flower.id)}
                  title={`Remove ${flower.name}`}
                >
                  <FlowerSVG flower={flower} size={70} />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {flowers.length === 0 && (
            <motion.p
              className="absolute inset-0 flex items-center justify-center text-muted-foreground text-center font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Pick some flowers to<br />fill your bouquet
            </motion.p>
          )}
        </div>

        {/* Wrapper / paper */}
        <svg viewBox="0 0 200 80" className="w-48 md:w-56 -mt-4" fill="none">
          <path
            d="M20 0 L0 80 L200 80 L180 0 Z"
            fill="hsl(33 30% 75%)"
            stroke="hsl(33 40% 65%)"
            strokeWidth="1.5"
          />
          <path
            d="M40 0 L30 80 M80 0 L75 80 M120 0 L125 80 M160 0 L170 80"
            stroke="hsl(33 30% 68%)"
            strokeWidth="0.5"
            opacity="0.4"
          />
          {/* Ribbon */}
          <path
            d="M60 20 Q100 30 140 20"
            stroke="hsl(43 72% 52%)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Flower tags */}
      {flowers.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {flowers.map((flower) => (
            <motion.span
              key={flower.id}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              layout
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: flower.color }}
              />
              {flower.name}
              <button onClick={() => onRemove(flower.id)} className="ml-0.5 hover:text-primary transition-colors">
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </div>
      )}

      <AnimatePresence>
        {flowers.length > 0 && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.button
              onClick={onNext}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Add a Love Note 💌
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
