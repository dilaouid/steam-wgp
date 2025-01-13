import { useState, useEffect } from "react";

import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { loadMarkdown } from "@core/utils/loadMarkdown";

export const Legalpage = () => {
  const [markdown, setMarkdown] = useState("");
  const { i18n } = useTranslation();

  useEffect(() => {
    const load = async () => {
      const text = await loadMarkdown(i18n.language, "legal");
      setMarkdown(text as string); 
    }

    load();
  }, [i18n.language]);

  return <Container>
    <ReactMarkdown children={markdown} />
  </Container>;
};
