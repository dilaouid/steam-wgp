import { useState, useEffect } from "react";

import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

const availableLanguages = ["en", "fr", "jp", "es", "de"]

export const Legalpage = () => {
  const [markdown, setMarkdown] = useState("");
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadMarkdown = async () => {
      const language = availableLanguages.includes(i18n.language) ? i18n.language : "fr";
      const path = `/locales/${language}/legal.md`;
      try {
        const response = await fetch(path);
        const text = await response.text();
        setMarkdown(text);
      } catch (error) {
        console.error("Failed to load markdown file", error);
      }
    };

    loadMarkdown();
  }, [i18n.language]);

  return <Container>
    <ReactMarkdown children={markdown} />
  </Container>;
};
