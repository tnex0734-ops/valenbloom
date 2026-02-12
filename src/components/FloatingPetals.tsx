import { motion } from "framer-motion";

const petals = Array.from({ length: 15 }, (_, i) => i);

export default function FloatingPetals({ count = 15, deep = false }: { count?: number; deep?: boolean }) {
  const items = petals.slice(0, count);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const duration = 10 + Math.random() * 8;
        const size = 10 + Math.random() * 14;
        const opacity = deep ? 0.35 : 0.2;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              top: "-5%",
              width: size,
              height: size,
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, (Math.random() - 0.5) * 120],
              rotate: [0, 360 + Math.random() * 180],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" style={{ width: "100%", height: "100%" }}>
              <ellipse
                cx="10"
                cy="10"
                rx="8"
                ry="5"
                transform="rotate(-30 10 10)"
                fill={deep ? "hsl(345 80% 55%)" : "hsl(350 100% 86%)"}
                opacity={opacity}
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
