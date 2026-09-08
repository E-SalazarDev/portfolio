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
        stack: ["Scraper", "Django", "React Native", "Python", "NativeWind", "Docker", "Twilio", "APIs REST"],
        media: [
          { type: "image", src: "/media/experience/inode-technology/reportes-ciudadanos/dashboard.jpg", label: "Panel general" },
          { type: "image", src: "/media/experience/inode-technology/reportes-ciudadanos/duplicados.jpg", label: "Panel general" },
          { type: "image", src: "/media/experience/inode-technology/reportes-ciudadanos/validacion.jpg", label: "Panel general" },
          { type: "image", src: "/media/experience/inode-technology/reportes-ciudadanos/tickets.jpg", label: "Panel general" },
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
        stack: ["Scraper", "Django", "React Native", "Python", "NativeWind", "Docker", "APIs REST"],
        media: [
          { type: "image", src: "/media/experience/inode-technology/profunding/panel.jpeg", label: "Panel de inversiones" },
          { type: "image", src: "/media/experience/inode-technology/profunding/proyectos.jpeg", label: "Panel de inversiones" },
          { type: "image", src: "/media/experience/inode-technology/profunding/comprobante.jpeg", label: "Panel de inversiones" },
          { type: "image", src: "/media/experience/inode-technology/profunding/detalle_proyecto.jpeg", label: "Panel de inversiones" },
          { type: "image", src: "/media/experience/inode-technology/profunding/comprobante.jpeg", label: "Panel de inversiones" },
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
        stack: ["Scraper", "Django", "React Native", "Python", "NativeWind", "Docker", "Twilio", "spaCy", "APIs REST"],
        media: [
          { type: "image", src: "/media/experience/inode-technology/proteccion-civil/crear_reporte.jpg", label: "Panel general" },
          { type: "image", src: "/media/experience/inode-technology/proteccion-civil/reportes_app.jpeg", label: "Panel administrativo" },
          {
            type: "video",
            src: "/media/experience/inode-technology/proteccion-civil/chatbot.mp4",
            label: "Demo del chatbot",
            poster: "/media/experience/inode-technology/proteccion-civil/chatbotImg.jpeg",
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
        stack: ["Angular", "Spring Boot", "Spring Security", "Oracle", "TypeScript", "APIs REST"],
        // Sin capturas reales de este proyecto — vacío a propósito,
        // así muestra "Sin evidencia visual" en vez de un placeholder.
        media: [],
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
        stack: ["Spring Boot", "Spring Security", "PostgreSQL", "Docker", "Linux", "JaCoCo", "Mockito", "Tailwind CSS", "APIs REST"],
        media: [
          { type: "image", src: "/media/experience/clickSoft/mxf1.jpg", label: "Panel general" },
          { type: "image", src: "/media/experience/clickSoft/mxf2.jpg", label: "Panel general" },
          { type: "image", src: "/media/experience/clickSoft/mxf3.jpg", label: "Panel general" },
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
        stack: ["Spring Boot", "Spring Security", "JPA", "Keycloak", "Podman", "Linux", "Material UI", "JaCoCo", "Mockito", "JUnit", "Azure DevOps", "React", "PostgreSQL", "APIs REST"],
        media: [
          { type: "image", src: "/media/experience/poder-judicial/pjp1.jpeg", label: "Panel general" },
          { type: "image", src: "/media/experience/poder-judicial/pjp2.jpeg", label: "Panel general" },
          { type: "image", src: "/media/experience/poder-judicial/pjp3.jpeg", label: "Panel general" },
          { type: "image", src: "/media/experience/poder-judicial/pjp4.jpeg", label: "Panel general" },
        ],
      },
    ],
  },
];