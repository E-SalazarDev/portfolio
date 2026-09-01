export const experience = [
  {
    id: "inode",
    company: "Inode Technology",
    role: "Ingeniero de Software Full Stack",
    period: "feb. 2025 — Presente",
    location: "Remoto",
    projects: [
      {
        id: "reportes-ciudadanos",
        title: "Reportes Ciudadanos",
        period: "feb. 2025 — jun. 2026",
        description:
          "Plataforma web y movil para la gestion y seguimiento de reportes ciudadanos e incidencias en tiempo real, orientada a digitalizar procesos de validacion, seguimiento y administracion operativa.",
        did: [
          "Desarrolle la aplicacion movil con React Native y las APIs REST con Django REST Framework",
          "Implemente roles, permisos y flujos de validacion de reportes",
          "Integre geolocalizacion, carga de evidencias y seguimiento de reportes",
          "Automatice procesos de scraping y procesamiento de texto con Python y spaCy",
        ],
        stack: ["React Native", "Django REST Framework", "PostgreSQL", "Docker", "Python", "spaCy"],
        media: [
          { type: "image", src: "https://placehold.co/1280x800/12162A/12162A", label: "Panel general" },
          { type: "image", src: "https://placehold.co/1280x800/1C2140/1C2140", label: "Mapa de incidencias" },
          { type: "image", src: "https://placehold.co/1280x800/262B52/262B52", label: "App movil" },
        ],
      },
      {
        id: "profunding",
        title: "Profunding",
        period: "sept. 2025 — feb. 2026",
        description:
          "Plataforma fintech de inversiones y crowdfunding inmobiliario, con funcionalidades administrativas y operativas para clientes e inversionistas.",
        did: [
          "Desarrolle modulos administrativos y financieros de la plataforma",
          "Implemente autenticacion, roles y gestion de usuarios",
          "Integre procesos relacionados con inversiones y pagos",
          "Construi interfaces web responsivas (frontend y backend)",
        ],
        stack: ["React", "Django", "PostgreSQL", "Docker", "APIs REST"],
        media: [
          { type: "image", src: "https://placehold.co/1280x800/1C2140/1C2140", label: "Panel de inversiones" },
          { type: "image", src: "https://placehold.co/1280x800/262B52/262B52", label: "Modulo financiero" },
        ],
      },
      {
        id: "proteccion-civil-inode",
        title: "Proteccion Civil",
        period: "may. 2025 — sept. 2025",
        description:
          "Plataforma de gestion y monitoreo de incidencias de Proteccion Civil en tiempo real, con modulo movil, chatbot inteligente y panel administrativo.",
        did: [
          "Desarrolle el modulo movil de reporte de incidencias con geolocalizacion",
          "Construi un chatbot con Twilio + NLP (Python/spaCy) para reportes via mensajeria",
          "Implemente el panel administrativo con visualizacion geografica y reportes operativos",
          "Gestione usuarios, permisos y autenticacion",
        ],
        stack: ["React", "Django REST Framework", "PostgreSQL", "Python", "Twilio", "Docker"],
        media: [
          { type: "image", src: "https://placehold.co/1280x800/12162A/12162A", label: "Panel administrativo" },
          {
            type: "video",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
            poster: "https://placehold.co/1280x800/1C2140/1C2140",
            label: "Demo del chatbot",
          },
        ],
      },
    ],
  },
  {
    id: "clicksoft",
    company: "ClickSoft Mexico",
    role: "Ingeniero de Software Full Stack",
    period: "sept. 2023 — may. 2025",
    location: "Remoto",
    projects: [
      {
        id: "merma",
        title: "Merma",
        period: "",
        description: "Sistema empresarial para administracion y control de procesos internos, bajo arquitectura MVC.",
        did: [
          "Desarrolle APIs REST con Spring Framework y seguridad con Spring Security",
          "Integre la aplicacion con bases de datos Oracle",
          "Construi el frontend con Angular y TypeScript",
          "Valide servicios y endpoints con Postman",
        ],
        stack: ["Spring Framework", "Spring Security", "Angular", "TypeScript", "Oracle"],
        media: [{ type: "image", src: "https://placehold.co/1280x800/12162A/12162A", label: "Panel de control" }],
      },
      {
        id: "mexicanfy",
        title: "Mexicanfy — E-commerce y Marketplace internacional",
        period: "ene. 2025 — may. 2025",
        description:
          "Plataforma e-commerce para promover y comercializar productos mexicanos hacia mercados europeos: identidad web, portal de acceso y catalogo de productos.",
        did: [
          "Desarrolle la interfaz corporativa con diseno responsivo y navegacion multilenguaje",
          "Construi el portal de acceso y navegacion principal de la plataforma",
          "Implemente el modulo de catalogo con filtros dinamicos y busqueda de productos",
          "Di mantenimiento a modulos administrativos y corregi errores en produccion",
        ],
        stack: ["JavaScript", "TypeScript", "PHP", "PostgreSQL", "HTML", "CSS", "Bootstrap"],
        media: [
          { type: "image", src: "https://placehold.co/1280x800/12162A/12162A", label: "Catalogo de productos" },
          { type: "image", src: "https://placehold.co/1280x800/1C2140/1C2140", label: "Portal de acceso" },
        ],
      },
    ],
  },
  {
    id: "poder-judicial-puebla",
    company: "Poder Judicial del Estado de Puebla",
    role: "Ingeniero de Software Full Stack",
    period: "jun. 2024 — ene. 2025",
    location: "Remoto",
    projects: [
      {
        id: "sistema-institucional",
        title: "Sistema Institucional de Gestion Judicial",
        period: "jun. 2024 — ene. 2025",
        description:
          "Sistema institucional construido desde cero para digitalizar procesos que antes eran manuales: notificaciones automaticas, turnado y distribucion de expedientes.",
        did: [
          "Desarrolle APIs REST y logica de negocio con Spring Boot, JPA y PostgreSQL",
          "Implemente autenticacion, roles y permisos con Keycloak",
          "Automatice el envio de notificaciones por correo (solicitud de defensor) con plantillas FTL",
          "Construi la bandeja de turnado y distribucion de expedientes con React y Material UI",
          "Escribi pruebas unitarias con JUnit y Mockito",
        ],
        stack: ["Spring Boot", "JPA", "PostgreSQL", "Keycloak", "React", "Material UI", "JUnit", "Mockito"],
        media: [
          { type: "image", src: "https://placehold.co/1280x800/12162A/12162A", label: "Bandeja de turnado" },
          { type: "image", src: "https://placehold.co/1280x800/1C2140/1C2140", label: "Notificaciones" },
        ],
      },
    ],
  },
];