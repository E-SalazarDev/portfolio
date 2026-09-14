// src/data/projectCatalogData.js

/**
 * Datos de los proyectos para el catálogo del Home.
 * Usado por el componente <ProjectCatalog />.
 *
 * Estructura de cada proyecto:
 *   - id:          identificador único (debe coincidir con la ruta /proyectos/:id)
 *   - title:       nombre visible
 *   - category:    categoría temática (PropTech, GovTech, etc.)
 *   - description: descripción corta
 *   - image:       imagen de portada
 *   - tags:        tecnologías destacadas (3 máximo, se muestran con dot de color)
 */

export const DEMO_PROJECTS = [
  {
    id: "smarthouse-ai",
    title: "SmartHouse AI",
    category: "PropTech · ML",
    description:
      "Plataforma de valuación inmobiliaria con Machine Learning para estimar precios de propiedades.",
    image: "/media/projects/SmartHouse/home1.png",
    tags: ["Python", "Django", "ML"],
  },
  {
    id: "reportes-ciudadanos",
    title: "Reportes Ciudadanos",
    category: "GovTech · Full Stack",
    description:
      "Plataforma web y móvil para gestión de reportes ciudadanos con geolocalización en tiempo real.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
    tags: ["Django", "React Native", "spaCy"],
  },
  {
    id: "profunding",
    title: "Profunding",
    category: "Fintech · Backend",
    description:
      "Plataforma de inversiones y crowdfunding inmobiliario con módulos administrativos y financieros.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    tags: ["Django", "PostgreSQL", "Docker"],
  },
  {
    id: "proteccion-civil",
    title: "Protección Civil",
    category: "GovTech · IA",
    description:
      "Sistema de monitoreo de incidencias con chatbot inteligente NLP y panel administrativo.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    tags: ["Python", "Twilio", "spaCy"],
  },
  {
    id: "mexicanfy",
    title: "Mexicanfy",
    category: "E-commerce",
    description:
      "Marketplace internacional para comercialización de productos mexicanos hacia Europa.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    tags: ["Spring Boot", "PostgreSQL"],
  },
  {
    id: "merma",
    title: "Merma",
    category: "Enterprise · MVC",
    description:
      "Sistema empresarial de control de procesos internos bajo arquitectura MVC con Oracle.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    tags: ["Java", "Spring", "Oracle"],
  },
];


export const TECH_COLORS = {
  Python: "#3776AB",
  Django: "#44B78B",
  ML: "#A78BFA",
  "React Native": "#61DAFB",
  spaCy: "#09A3D5",
  Twilio: "#F22F46",
  PostgreSQL: "#4169E1",
  Docker: "#2496ED",
  "Spring Boot": "#6DB33F",
  Spring: "#6DB33F",
  Java: "#F89820",
  Oracle: "#F80000",
};


export const TRAPEZOID_CLIP = "polygon(12% 0, 100% 0, 88% 100%, 0 100%)";