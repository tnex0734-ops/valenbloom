import { motion } from "framer-motion";

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-primary leading-tight tracking-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Craft a Bouquet
        <br />
        <motion.span
          className="text-champagne"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          for Someone Special
        </motion.span>
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Handpick your flowers, write a heartfelt message, and share your love.
      </motion.p>

      <motion.button
        onClick={onStart}
        className="mt-10 px-10 py-4 rounded-full font-sans font-medium text-accent-foreground gold-shimmer text-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Start Creating ✨
      </motion.button>

      <motion.div
        className="absolute bottom-8 text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Scroll down or tap to begin
      </motion.div>
    </section>
  );
}
