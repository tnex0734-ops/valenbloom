import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Share2, MessageCircle } from "lucide-react";
import { FLOWERS, encodeBouquet, type BouquetData } from "@/data/flowers";
import FlowerSVG from "./FlowerSVG";
import { toast } from "sonner";

interface ShareSectionProps {
  selected: string[];
  message: string;
  from: string;
  to: string;
}

export default function ShareSection({ selected, message, from, to }: ShareSectionProps) {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const flowers = selected.map((id) => FLOWERS.find((f) => f.id === id)!).filter(Boolean);

  const generateLink = useCallback(() => {
    const data: BouquetData = { flowers: selected, message, from, to };
    const encoded = encodeBouquet(data);
    const url = `${window.location.origin}/bouquet/${encoded}`;
    setLink(url);
    setCelebrating(true);
    setTimeout(() => setCelebrating(false), 3000);
  }, [selected, message, from, to]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast("Link copied! 🌹");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`I made you a bouquet! 🌹 ${link}`)}`, "_blank");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I crafted a flower bouquet for someone special 🌹✨ ${link}`)}`, "_blank");
  };

  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({ title: "A bouquet for you 🌹", text: "I made you a special bouquet!", url: link });
    }
  };

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto" id="share">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">
          Send Your Love
        </h2>
      </motion.div>

      {/* Gift card preview */}
      <motion.div
        className="glass-card rounded-3xl p-8 md:p-10 shadow-xl max-w-lg mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {to && (
          <p className="text-center text-muted-foreground font-serif text-lg mb-2">
            For <span className="text-primary font-semibold">{to}</span>
          </p>
        )}

        <div className="flex justify-center gap-1 my-4">
          {flowers.map((f) => (
            <FlowerSVG key={f.id} flower={f} size={44} />
          ))}
        </div>

        {message && (
          <p className="text-center font-serif-display text-lg md:text-xl leading-relaxed text-foreground mt-4 italic">
            "{message}"
          </p>
        )}

        {from && (
          <p className="text-center text-muted-foreground mt-4 text-sm">
            With love, <span className="font-medium text-foreground">{from}</span>
          </p>
        )}
      </motion.div>

      {/* Generate button */}
      {!link && (
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={generateLink}
            className="px-10 py-4 rounded-full gold-shimmer text-accent-foreground font-medium text-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Create Shareable Link ✨
          </motion.button>
        </motion.div>
      )}

      {/* Celebration petals */}
      <AnimatePresence>
        {celebrating && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "-5%",
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: "110vh",
                  opacity: [1, 1, 0],
                  rotate: 360 + Math.random() * 360,
                  x: (Math.random() - 0.5) * 200,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 0.5 }}
              >
                <svg viewBox="0 0 16 16" width={8 + Math.random() * 10} height={8 + Math.random() * 10}>
                  <ellipse cx="8" cy="8" rx="7" ry="4" fill={`hsl(${340 + Math.random() * 30} 80% ${60 + Math.random() * 20}%)`} />
                </svg>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Share area */}
      <AnimatePresence>
        {link && (
          <motion.div
            className="mt-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex gap-2 max-w-lg mx-auto">
              <input
                readOnly
                value={link}
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-sm truncate"
              />
              <motion.button
                onClick={copyLink}
                className="px-4 py-3 rounded-xl bg-accent text-accent-foreground font-medium flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </motion.button>
            </div>

            <div className="flex justify-center gap-3">
              <motion.button
                onClick={shareWhatsApp}
                className="px-5 py-2.5 rounded-full bg-[#25D366] text-white font-medium text-sm flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </motion.button>
              <motion.button
                onClick={shareTwitter}
                className="px-5 py-2.5 rounded-full bg-foreground text-background font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                𝕏 Post
              </motion.button>
              {typeof navigator !== "undefined" && navigator.share && (
                <motion.button
                  onClick={shareNative}
                  className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium text-sm flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4" /> Share
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
