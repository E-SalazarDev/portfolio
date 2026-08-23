
export const projects = [
  {
    id: "smarthouse-ai",
    status: "live", // 'live' | 'build' | 'academic'
    statusLabel: "LIVE",
    domain: "PROPTECH · ML",
    title: "SmartHouse AI",
    demoLabel: "DEMO · 1:20",

    media: [
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://picsum.photos/seed/smarthouse-video/800/450" },
      { type: "image", src: "https://picsum.photos/seed/smarthouse-1/800/450", label: "Dashboard" },
      { type: "image", src: "https://picsum.photos/seed/smarthouse-2/800/450", label: "Comparables" },
    ],
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

    media: [
      { type: "image", src: "https://picsum.photos/seed/certificados-1/800/450", label: "Generación de certificado" },
      { type: "image", src: "https://picsum.photos/seed/certificados-2/800/450", label: "Panel de laboratorio" },
    ],
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

    media: [
      { type: "image", src: "https://picsum.photos/seed/multimodal-1/800/450", label: "Búsqueda cruzada texto-imagen" },
    ],
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