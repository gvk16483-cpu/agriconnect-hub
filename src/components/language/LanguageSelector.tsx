import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageCard from "./LanguageCard";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

const languages = [
  { greeting: "Hello", languageName: "English", code: "en" as const, emoji: "🌾" },
  { greeting: "नमस्ते", languageName: "हिंदी", code: "hi" as const, emoji: "🌻" },
  { greeting: "నమస్కారం", languageName: "తెలుగు", code: "te" as const, emoji: "🌿" },
];

const LanguageSelector = () => {
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();

  const handleSelect = (code: "en" | "hi" | "te") => {
    setLanguage(code);
    navigate("/auth/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-3">
          <Sprout className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            AgriSync
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Smart Pre-Harvest Coordination
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-8">
        {languages.map((lang, i) => (
          <LanguageCard
            key={lang.code}
            {...lang}
            onClick={handleSelect}
            delay={0.2 + i * 0.15}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
