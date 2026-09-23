import { useState, useMemo } from "react";
import { Code2, FlaskConical, Globe } from "lucide-react";

// ===== SVGs inline (Django, Prisma, Azure DevOps) =====
const DJANGO_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.759-6.6.637 0 1.121.05 1.7.203zm0 9.143a3.894 3.894 0 0 0-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.135-.229 4.638-.917 5.928-.637 1.236-1.477 2.013-3.21 2.879l-3.643-1.732c1.727-.815 2.566-1.53 3.104-2.634.561-1.135.74-2.465.74-5.936V6.06h3.926z"/></svg>`;

const PRISMA_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M21.807 18.285 13.553.757a1.323 1.323 0 0 0-2.334-.046L1.424 13.138a1.324 1.324 0 0 0 .242 1.628l7.32 7.078a1.323 1.323 0 0 0 1.585.114l10.318-6.242a1.324 1.324 0 0 0 .918-1.431zM13.35 19.2l-6.994-6.77 7.822-10.36 7.052 14.955z"/></svg>`;

const AZURE_DEVOPS_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M22 18L17 22L9 19V22L4.81 16.25L17.72 17.3V6.34L22 5.65V18M4.81 16.25V8.96L17.72 6.34L10.6 2V4.84L3.97 6.76L2 9.38V15.07L4.81 16.25Z"/></svg>`;

const TECH_ICON_MAP = {
  react: { devicon: "react", brand: "react", color: "61DAFB" },
  "react native": { devicon: "react", brand: "react", color: "61DAFB" },

  // Django → SVG inline recoloreado
  django: { svg: DJANGO_SVG, color: "44B78B" },
  "django rest framework": { svg: DJANGO_SVG, color: "44B78B" },

  postgresql: { devicon: "postgresql", brand: "postgresql", color: "4169E1" },
  docker: { devicon: "docker", brand: "docker", color: "2496ED" },
  python: { devicon: "python", brand: "python", color: "3776AB" },
  java: { devicon: "java", brand: "openjdk", color: "437291" },
  "java 17": { devicon: "java", brand: "openjdk", color: "437291" },
  "spring boot": { devicon: "spring", brand: "springboot", color: "6DB33F" },
  "spring security": { devicon: "spring", brand: "spring", color: "6DB33F" },
  "spring framework": { devicon: "spring", brand: "spring", color: "6DB33F" },
  angular: { devicon: "angularjs", brand: "angular", color: "DD0031" },
  typescript: { devicon: "typescript", brand: "typescript", color: "3178C6" },
  javascript: { devicon: "javascript", brand: "javascript", color: "F7DF1E" },
  oracle: { devicon: "oracle", brand: "oracle", color: "F80000" },
  php: { devicon: "php", brand: "php", color: "777BB4" },
  html: { devicon: "html5", brand: "html5", color: "E34F26" },
  css: { devicon: "css3", brand: "css3", color: "1572B6" },
  bootstrap: { devicon: "bootstrap", brand: "bootstrap", color: "7952B3" },
  "material ui": { devicon: "materialui", brand: "mui", color: "007FFF" },
  jpa: { devicon: "hibernate", brand: "hibernate", color: "59666C" },
  "jpa (hibernate)": { devicon: "hibernate", brand: "hibernate", color: "59666C" },
  junit: { devicon: "junit", brand: "junit5", color: "25A162" },
  maven: { devicon: "apachemaven", brand: "apachemaven", color: "C71A36" },
  keycloak: { devicon: "keycloak", brand: "keycloak", color: "3B82F6" },
  twilio: { devicon: "twilio", brand: "twilio", color: "F22F46" },
  spacy: { brand: "spacy", color: "09A3D5" },
  podman: { devicon: "podman", brand: "podman", color: "892CA0" },
  linux: { devicon: "linux", brand: "linux", color: "FCC624" },

  // Azure DevOps → SVG inline recoloreado
  "azure devops": { svg: AZURE_DEVOPS_SVG, color: "0078D7" },

  "tailwind css": { devicon: "tailwindcss", brand: "tailwindcss", color: "06B6D4" },
  tailwind: { devicon: "tailwindcss", brand: "tailwindcss", color: "06B6D4" },
  nativewind: { devicon: "tailwindcss", brand: "tailwindcss", color: "06B6D4" },
  mockito: { brand: "mockito", color: "78C520", fallback: "testing" },
  jacoco: { fallback: "testing" },
  "apis rest": { brand: "openapiinitiative", color: "6BA539", fallback: "api" },
  "api rest": { brand: "openapiinitiative", color: "6BA539", fallback: "api" },
  "rest api": { brand: "openapiinitiative", color: "6BA539", fallback: "api" },
  scrapy: { brand: "scrapy", color: "60A839", fallback: "api" },
  scraper: { brand: "scrapy", color: "60A839", fallback: "api" },
  flask: { devicon: "flask", brand: "flask", color: "FFFFFF" },
  fastapi: { brand: "fastapi", color: "05998B" },
  mongodb: { devicon: "mongodb", brand: "mongodb", color: "47A248" },
  mysql: { devicon: "mysql", brand: "mysql", color: "00758F" },
  redis: { devicon: "redis", brand: "redis", color: "DC382D" },
  numpy: { devicon: "numpy", brand: "numpy", color: "4DABCF" },
  pandas: { devicon: "pandas", brand: "pandas", color: "E70488" },
  pytorch: { devicon: "pytorch", brand: "pytorch", color: "EE4C2C" },
  tensorflow: { devicon: "tensorflow", brand: "tensorflow", color: "FF6F00" },
  kubernetes: { devicon: "kubernetes", brand: "kubernetes", color: "326CE5" },
  gemini: { brand: "googlegemini", color: "4285F4" },
  "machine learning": { fallback: "api" },
  "deep learning": { fallback: "api" },
  nlp: { fallback: "api" },
  vision: { fallback: "api" },
  nestjs: { devicon: "nestjs", brand: "nestjs", color: "E0234E" },
  "nest.js": { devicon: "nestjs", brand: "nestjs", color: "E0234E" },
  nest: { devicon: "nestjs", brand: "nestjs", color: "E0234E" },

  // Prisma → SVG inline recoloreado
  prisma: { svg: PRISMA_SVG, color: "A5B4FC" },
};

const FALLBACK_ICONS = {
  testing: FlaskConical,
  api: Globe,
  default: Code2,
};

function normalize(name) {
  return name.trim().toLowerCase();
}

function buildSources(entry) {
  if (!entry) return [];
  const sources = [];
  if (entry.devicon) {
    sources.push(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${entry.devicon}/${entry.devicon}-original.svg`);
    sources.push(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${entry.devicon}/${entry.devicon}-plain.svg`);
    sources.push(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${entry.devicon}/${entry.devicon}-original-wordmark.svg`);
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
  const FallbackIcon = FALLBACK_ICONS[(entry && entry.fallback) || "default"];
  const iconColor = entry && entry.color ? "#" + entry.color : "#93C5FD";

  const handleError = function () {
    if (attempt < sources.length - 1) setAttempt(function (a) { return a + 1; });
    else setAttempt(sources.length);
  };

  return (
    <span
      className="group inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-tight pl-2 pr-3.5 py-2 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(135deg, #2A3347 0%, #1A2130 100%)",
        border: "1px solid rgba(255,255,255,0.16)",
        color: "#F5F6F7",
        boxShadow:
          "0 4px 12px -6px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.08)",
      }}
    >
      {entry && entry.svg ? (
        <span
          className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
          style={{ color: iconColor }}
          dangerouslySetInnerHTML={{ __html: entry.svg }}
        />
      ) : src && !exhausted ? (
        <img
          src={src}
          alt=""
          className="w-5 h-5 object-contain shrink-0 transition-transform duration-300 group-hover:scale-110"
          onError={handleError}
        />
      ) : (
        <FallbackIcon
          size={18}
          className="shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ color: iconColor }}
        />
      )}
      <span>{name}</span>
    </span>
  );
}