export const projects = [
  {
    id: "smarthouse-ai",
    status: "live",
    statusLabel: "LIVE",
    domain: "PROPTECH · ML",
    title: "SmartHouse AI",
    demoLabel: "DEMO · 1:20",

    media: [
      {
        type: "video",
        src: "/media/projects/SmartHouse/smarthouse-preview.mp4",
        poster: "/media/projects/SmartHouse/home2.png",
      },
      {
        type: "image",
        src: "/media/projects/SmartHouse/home1.png",
        label: "Workspace — Inicio",
      },
      {
        type: "image",
        src: "/media/projects/SmartHouse/home2.png",
        label: "Workspace — Inicio",
      },
      {
        type: "image",
        src: "/media/projects/SmartHouse/comparador.png",
        label: "Workspace — Inicio",
      },
      {
        type: "image",
        src: "/media/projects/SmartHouse/calcular_precio.png",
        label: "Workspace — Inicio",
      },
      {
        type: "image",
        src: "/media/projects/SmartHouse/busqueda_compardor.png",
        label: "Workspace — Inicio",
      },
    ],
    did: [
      "Diseñé el sistema de diseño y los componentes del dashboard",
      "Conecté el frontend al backend de ML para valuación en tiempo real",
      "Construí las vistas de comparables y explicabilidad del modelo",
    ],
    stack: ["React", "Design System", "Python", "ML"],
    links: {
      code: "https://github.com/E-SalazarDev/SmartHouse-AVM",
      demo: "https://github.com/E-SalazarDev/SmartHouse-AVM",
      video: "",
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
      { type: "image", src: "https://placehold.co/800x450/12162A/EAF0FF?text=Generacion+de+certificado", label: "Generación de certificado" },
      { type: "image", src: "https://placehold.co/800x450/1C2140/33D6A6?text=Panel+de+laboratorio", label: "Panel de laboratorio" },
    ],
    did: [
      "Rediseñé la arquitectura de una app JavaFX de laboratorio clínico",
      "Separé capas para hacer testeable la generación de PDFs",
      "Integré JasperReports para certificados médicos automatizados",
    ],
    stack: ["Java 17", "JavaFX", "Maven", "JasperReports"],
    links: {
      code: "",
      demo: "",
      video: "",
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
      { type: "image", src: "https://placehold.co/800x450/12162A/FFC145?text=Busqueda+cruzada", label: "Búsqueda cruzada texto-imagen" },
    ],
    did: [
      "Entrené un modelo multimodal sobre un dataset de moda (Kaggle)",
      "Combiné embeddings de texto e imagen para búsqueda cruzada",
      "Evalué resultados con métricas de recuperación de información",
    ],
    stack: ["Python", "NLP", "Computer Vision"],
    links: {
      code: "",
      demo: "",
      video: "",
    },
  },
];