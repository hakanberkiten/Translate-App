import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Translator = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("eng_Latn");
  const [targetLang, setTargetLang] = useState("tur_Latn");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const languageOptions = [
    { label: "Afrikaans", value: "afr_Latn" },
    { label: "Albanian", value: "sqi_Latn" },
    { label: "Amharic", value: "amh_Ethi" },
    { label: "Arabic", value: "arb_Arab" },
    { label: "Armenian", value: "hye_Armn" },
    { label: "Azerbaijani", value: "aze_Latn" },
    { label: "Basque", value: "eus_Latn" },
    { label: "Belarusian", value: "bel_Cyrl" },
    { label: "Bengali", value: "ben_Beng" },
    { label: "Bosnian", value: "bos_Latn" },
    { label: "Bulgarian", value: "bul_Cyrl" },
    { label: "Catalan", value: "cat_Latn" },
    { label: "Chinese (Simplified)", value: "zho_Hans" },
    { label: "Chinese (Traditional)", value: "zho_Hant" },
    { label: "Croatian", value: "hrv_Latn" },
    { label: "Czech", value: "ces_Latn" },
    { label: "Danish", value: "dan_Latn" },
    { label: "Dutch", value: "nld_Latn" },
    { label: "English", value: "eng_Latn" },
    { label: "Estonian", value: "est_Latn" },
    { label: "Finnish", value: "fin_Latn" },
    { label: "French", value: "fra_Latn" },
    { label: "Galician", value: "glg_Latn" },
    { label: "Georgian", value: "kat_Geor" },
    { label: "German", value: "deu_Latn" },
    { label: "Greek", value: "ell_Grek" },
    { label: "Gujarati", value: "guj_Gujr" },
    { label: "Hebrew", value: "heb_Hebr" },
    { label: "Hindi", value: "hin_Deva" },
    { label: "Hungarian", value: "hun_Latn" },
    { label: "Icelandic", value: "isl_Latn" },
    { label: "Indonesian", value: "ind_Latn" },
    { label: "Irish", value: "gle_Latn" },
    { label: "Italian", value: "ita_Latn" },
    { label: "Japanese", value: "jpn_Jpan" },
    { label: "Kannada", value: "kan_Knda" },
    { label: "Kazakh", value: "kaz_Cyrl" },
    { label: "Khmer", value: "khm_Khmr" },
    { label: "Korean", value: "kor_Hang" },
    { label: "Kyrgyz", value: "kir_Cyrl" },
    { label: "Lao", value: "lao_Laoo" },
    { label: "Latvian", value: "lav_Latn" },
    { label: "Lithuanian", value: "lit_Latn" },
    { label: "Macedonian", value: "mkd_Cyrl" },
    { label: "Malay", value: "msa_Latn" },
    { label: "Malayalam", value: "mal_Mlym" },
    { label: "Maltese", value: "mlt_Latn" },
    { label: "Marathi", value: "mar_Deva" },
    { label: "Mongolian", value: "mon_Cyrl" },
    { label: "Nepali", value: "npi_Deva" },
    { label: "Norwegian", value: "nob_Latn" },
    { label: "Pashto", value: "pus_Arab" },
    { label: "Persian", value: "pes_Arab" },
    { label: "Polish", value: "pol_Latn" },
    { label: "Portuguese", value: "por_Latn" },
    { label: "Punjabi", value: "pan_Guru" },
    { label: "Romanian", value: "ron_Latn" },
    { label: "Russian", value: "rus_Cyrl" },
    { label: "Serbian", value: "srp_Cyrl" },
    { label: "Sinhala", value: "sin_Sinh" },
    { label: "Slovak", value: "slk_Latn" },
    { label: "Slovenian", value: "slv_Latn" },
    { label: "Spanish", value: "spa_Latn" },
    { label: "Swahili", value: "swh_Latn" },
    { label: "Swedish", value: "swe_Latn" },
    { label: "Tamil", value: "tam_Taml" },
    { label: "Telugu", value: "tel_Telu" },
    { label: "Thai", value: "tha_Thai" },
    { label: "Turkish", value: "tur_Latn" },
    { label: "Ukrainian", value: "ukr_Cyrl" },
    { label: "Urdu", value: "urd_Arab" },
    { label: "Vietnamese", value: "vie_Latn" },
    { label: "Welsh", value: "cym_Latn" },
    { label: "Zulu", value: "zul_Latn" },
  ];


  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
  };

  const handleClear = (setter) => {
    setter("");
  };

  const translateText = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/translate", {
        source: sourceLang,
        target: targetLang,
        text: text,
      });
      const result = response.data.translation || "Translation failed.";
      setTranslatedText(result);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Error: " + (error.response?.data?.error || "Unknown error"));
    }
    setLoading(false);
  };

  return (
    <div className="translator-container">
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "🌞" : "🌙"}
      </button>

      <h1 className="header">AI Translator</h1>

      <div className="language-selector">
        <select
          className="select-container"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          {languageOptions.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <button
          className="swap-button"
          onClick={() => {
            const temp = sourceLang;
            setSourceLang(targetLang);
            setTargetLang(temp);
          }}
        >
          ↔
        </button>

        <select
          className="select-container"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          {languageOptions.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="text-input-container">
        <textarea
          placeholder="Write the text you want to translate here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="copy-clear-buttons">
          <button
            className="copy-button"
            onClick={() => handleCopy(text)}
            disabled={!text.trim()}
          >
            <i className="far fa-copy"></i> {}
          </button>
          <button
            className="clear-button"
            onClick={() => handleClear(setText)}
            disabled={!text.trim()}
          >
            <i className="fas fa-trash"></i> {}
          </button>
        </div>
      </div>

      {translatedText && (
        <div className="result-container">
          <div className="result-text">{translatedText}</div>
          <div className="copy-clear-buttons">
            <button className="copy-button" onClick={() => handleCopy(translatedText)}>
              <i className="far fa-copy"></i> {}
            </button>
            <button
              className="clear-button"
              onClick={() => handleClear(setTranslatedText)}
            >
              <i className="fas fa-trash"></i> {}
            </button>
          </div>
        </div>
      )}

      <button
        className="translate-button"
        onClick={translateText}
        disabled={loading || !text.trim()}
      >
        {loading ? "Translating..." : "Translate"}
      </button>
    </div>
  );
};

export default Translator;