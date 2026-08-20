// Cada objeto es un proyecto. Agregar uno nuevo = agregar un objeto aquí,
// nunca tocar ProjectCard.jsx ni Projects.jsx.
export const projects = [
  {
    id: "smarthouse-ai",
    status: "live", // 'live' | 'build' | 'academic'
    statusLabel: "LIVE",
    domain: "PROPTECH · ML",
    title: "SmartHouse AI",
    demoLabel: "DEMO · 1:20",
    did: [
      "Diseñé el sistema de diseño y los componentes del dashboard",
      "Conecté el frontend al backend de ML para valuación en tiempo real",
      "Construí las vistas de comparables y explicabilidad del modelo",
    ],
    stack: ["React", "Design System", "Python", "ML"],
    links: {
      code: "#",
      demo: "#",
      video: "#",
    },
  },
  {
    id: "certificados-clinicos",
    status: "build",
    statusLabel: "EN PRODUCCIÓN",
    domain: "SALUD · DESKTOP",
    title: "Refactor arquitectónico — Certificados clínicos",
    demoLabel: "DEMO · 2:05",
    did: [
      "Rediseñé la arquitectura de una app JavaFX de laboratorio clínico",
      "Separé capas para hacer testeable la generación de PDFs",
      "Integré JasperReports para certificados médicos automatizados",
    ],
    stack: ["Java 17", "JavaFX", "Maven", "JasperReports"],
    links: {
      code: "#",
      demo: "#",
      video: "#",
    },
  },
  {
    id: "multimodal-fashion",
    status: "academic",
    statusLabel: "ACADÉMICO",
    domain: "NLP · VISIÓN",
    title: "Sistema multimodal texto-imagen",
    demoLabel: "DEMO · 0:58",
    did: [
      "Entrené un modelo multimodal sobre un dataset de moda (Kaggle)",
      "Combiné embeddings de texto e imagen para búsqueda cruzada",
      "Evalué resultados con métricas de recuperación de información",
    ],
    stack: ["Python", "NLP", "Computer Vision"],
    links: {
      code: "#",
      demo: "#",
      video: "#",
    },
  },
];
