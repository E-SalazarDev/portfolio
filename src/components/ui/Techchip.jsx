import { useState, useMemo } from "react";
import { Code2 } from "lucide-react";

const TECH_ICON_MAP = {
  react: { devicon: "react" },
  "react native": { devicon: "react" },
  django: { devicon: "django" },
  "django rest framework": { devicon: "django" },
  postgresql: { devicon: "postgresql" },
  docker: { devicon: "docker" },
  python: { devicon: "python" },
  java: { devicon: "java" },
  "java 17": { devicon: "java" },
  "spring boot": { devicon: "spring" },
  "spring security": { devicon: "spring" },
  "spring framework": { devicon: "spring" },
  angular: { devicon: "angularjs" },
  typescript: { devicon: "typescript" },
  javascript: { devicon: "javascript" },
  oracle: { devicon: "oracle" },
  php: { devicon: "php" },
  html: { devicon: "html5" },
  css: { devicon: "css3" },
  bootstrap: { devicon: "bootstrap" },
  "material ui": { devicon: "materialui" },
  jpa: { devicon: "hibernate" },
  "jpa (hibernate)": { devicon: "hibernate" },
  junit: { devicon: "junit" },
  maven: { devicon: "apachemaven" },
  keycloak: { brand: "keycloak", color: "3B82F6" },
  twilio: { brand: "twilio", color: "F22F46" },
  ml: null,
  "design system": null,
  "apis rest": null,
  nlp: null,
  "computer vision": null,
  mockito: null,
  javafx: null,
  jasperreports: null,
  spacy: { brand: "spacy", color: "09A3D5" },
  podman: { devicon: "podman" },
  linux: { devicon: "linux" },
  "azure devops": { brand: "azuredevops", color: "0078D7" },
  jacoco: null,
  "tailwind css": { devicon: "tailwindcss" },
  tailwind: { devicon: "tailwindcss" },
  nativewind: { devicon: "tailwindcss" },
  scraper: null,
};

function normalize(name) {
  return name.trim().toLowerCase();
}

function buildSources(entry) {
  if (!entry) return [];
  const sources = [];
  if (entry.devicon) {
    sources.push(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${entry.devicon}/${entry.devicon}-original.svg`);
  }
  if (entry.brand) {
    sources.push(`https://cdn.simpleicons.org/${entry.brand}/${entry.color || "ffffff"}`);
  }
  return sources;
}

export default function TechChip({ name }) {
  const entry = TECH_ICON_MAP[normalize(name)];
  const sources = useMemo(function () {
    return buildSources(entry);
  }, [entry]);
  const [attempt, setAttempt] = useState(0);
  const src = sources[attempt];
  const exhausted = attempt >= sources.length;

  const handleError = function () {
    if (attempt < sources.length - 1) setAttempt(function (a) { return a + 1; });
    else setAttempt(sources.length);
  };

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[12px] text-paper border border-white/10 bg-white/3 rounded-md pl-2 pr-3 py-1.5">
      {src && !exhausted ? (
        <img src={src} alt="" className="w-4 h-4 object-contain shrink-0" onError={handleError} />
      ) : (
     
        <Code2 size={14} className="text-muted shrink-0" />
      )}
      {name}
    </span>
  );
}