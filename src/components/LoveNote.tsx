import { motion } from "framer-motion";

interface LoveNoteProps {
  message: string;
  setMessage: (v: string) => void;
  from: string;
  setFrom: (v: string) => void;
  to: string;
  setTo: (v: string) => void;
  onNext: () => void;
}

const MAX_CHARS = 300;

export default function LoveNote({ message, setMessage, from, setFrom, to, setTo, onNext }: LoveNoteProps) {
  return (
    <section className="py-20 px-6 max-w-2xl mx-auto" id="note">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-primary font-semibold">
          Add a Love Note 💌
        </h2>
      </motion.div>

      <motion.div
        className="glass-card rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 31px, hsl(40 30% 88% / 0.4) 31px, hsl(40 30% 88% / 0.4) 32px)",
          backgroundSize: "100% 32px",
          backgroundPosition: "0 8px",
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block font-medium">To</label>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Their name"
              maxLength={50}
              className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-border focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block font-medium">From</label>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-border focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all text-sm"
            />
          </div>
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Write something from your heart..."
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all resize-none text-base font-serif-display text-lg leading-relaxed"
        />
        <div className="text-right text-xs text-muted-foreground mt-1">
          {message.length} / {MAX_CHARS}
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          onClick={onNext}
          className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Preview & Share →
        </motion.button>
      </motion.div>
    </section>
  );
}
