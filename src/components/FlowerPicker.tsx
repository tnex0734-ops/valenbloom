import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { FLOWERS, MAX_FLOWERS, type Flower } from "@/data/flowers";
import FlowerSVG from "./FlowerSVG";
import { toast } from "sonner";

interface FlowerPickerProps {
  selected: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}

export default function FlowerPicker({ selected, onToggle, onNext }: FlowerPickerProps) {
  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      onToggle(id);
    } else if (selected.length >= MAX_FLOWERS) {
      toast("You can only pick up to 6 flowers, darling 🌹", {
        style: {
          background: "hsl(40 100% 97%)",
          border: "1px solid hsl(43 72% 52%)",
          color: "hsl(345 100% 25%)",
        },
      });
    } else {
      onToggle(id);
    }
  };

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto" id="picker">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">
          Pick Your Blooms
        </h2>
        <p className="mt-3 text-muted-foreground">
          Select up to {MAX_FLOWERS} flowers to arrange in your bouquet
        </p>
        <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground font-medium text-sm">
          {selected.length} / {MAX_FLOWERS} selected
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {FLOWERS.map((flower, i) => {
          const isSelected = selected.includes(flower.id);
          return (
            <motion.button
              key={flower.id}
              onClick={() => handleSelect(flower.id)}
              className={`relative glass-card rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-200
                ${isSelected ? "ring-2 ring-accent shadow-lg" : "hover:shadow-md hover:-translate-y-1"}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5 text-accent-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>

              <FlowerSVG flower={flower} size={64} />

              <span className="text-sm font-medium text-foreground">{flower.name}</span>
              <span
                className="w-3 h-3 rounded-full border border-border"
                style={{ backgroundColor: flower.color }}
              />
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            className="flex justify-center mt-10"
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
              Arrange Bouquet →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
