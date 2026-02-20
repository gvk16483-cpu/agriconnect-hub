import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

type Lang = "en" | "hi" | "te";

interface LanguageContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [language, setLang] = useState<Lang>(
    (localStorage.getItem("agrisync-language") as Lang) || "en"
  );

  const setLanguage = async (lang: Lang) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("agrisync-language", lang);

    // Update in DB if logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({ language: lang }).eq("user_id", user.id);
    }
  };

  useEffect(() => {
    // On mount, check if user is logged in and fetch their language
    const fetchLang = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("language")
          .eq("user_id", user.id)
          .single();
        if (data?.language) {
          setLang(data.language as Lang);
          i18n.changeLanguage(data.language);
          localStorage.setItem("agrisync-language", data.language);
        }
      }
    };
    fetchLang();
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
