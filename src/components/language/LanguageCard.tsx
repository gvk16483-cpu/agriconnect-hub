import { motion } from "framer-motion";

interface LanguageCardProps {
  greeting: string;
  languageName: string;
  code: "en" | "hi" | "te";
  emoji: string;
  onClick: (code: "en" | "hi" | "te") => void;
  delay: number;
}

const LanguageCard = ({ greeting, languageName, code, emoji, onClick, delay }: LanguageCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring", bounce: 0.3 }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(code)}
      className="group relative flex h-56 w-64 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative text-4xl">{emoji}</span>
      <span className="relative text-3xl font-bold text-foreground">{greeting}</span>
      <span className="relative text-sm font-medium text-muted-foreground">{languageName}</span>
    </motion.button>
  );
};

export default LanguageCard;
