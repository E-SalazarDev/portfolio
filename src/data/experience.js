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
          "Plataforma web y móvil para la gestión y seguimiento de reportes ciudadanos e incidencias en tiempo real. Digitaliza procesos de validación, seguimiento y administración operativa, permitiendo a los ciudadanos reportar incidencias con evidencia fotográfica y geolocalización, y a los operadores gestionar el ciclo completo de cada caso.",
        did: [
          "Desarrollé la aplicación móvil con React Native y las APIs REST con Django REST Framework, conectando el frontend con servicios backend y manejando estados de carga y errores.",
          "Implementé roles, permisos y flujos de validación sobre las APIs REST de Django, aplicando reglas de negocio y control de acceso por tipo de usuario.",
          "Integré geolocalización, carga de evidencias y seguimiento en tiempo real consumiendo APIs REST en React Native y sincronizando datos con el backend en Django.",
          "Automaticé procesos de procesamiento de texto con Python, integrando los resultados en la plataforma mediante APIs REST.",
        ],
        stack: ["Django", "Django REST Framework", "React Native", "Python", "Docker", "APIs REST"],
        media: [
          { type: "image", src: "/media/experience/inode-technology/reportes-ciudadanos/dashboard.jpg", label: "Módulo General de Reportes" },
          { type: "image", src: "/media/experience/inode-technology/reportes-ciudadanos/validacion.jpg", label: "Módulo Validación y Duplicados de Reportes" },
          { type: "image", src: "/media/experience/inode-technology/reportes-ciudadanos/tickets.jpg", label: "Módulo Seguimiento y Asignación de Reportes" },
        ],
      },
      {
        id: "profunding",
        title: "Profunding",
        period: "sept. 2025 — feb. 2026",
        description:
          "Plataforma fintech de inversiones y crowdfunding inmobiliario que conecta inversionistas con proyectos en desarrollo. Incluye módulos administrativos y operativos para clientes e inversionistas, con gestión de inversiones, procesamiento de pagos, seguimiento de proyectos y control de accesos por rol.",
        did: [
          "Desarrollé módulos backend con Nest.js, implementando servicios, controladores y guards para la lógica de negocio de inversiones y pagos.",
          "Implementé autenticación, roles y gestión de usuarios con Nest.js, asegurando el control de acceso a las distintas secciones del sistema.",
          "Integré procesos de inversiones y pagos conectando React con los servicios backend en Nest.js, manejando respuestas de pasarelas de pago.",
          "Construí interfaces web responsivas con React y Tailwind CSS, consumiendo y exponiendo APIs REST para el flujo de inversión.",
          "Modelé y gestioné la base de datos MySQL con Prisma ORM, definiendo el schema, ejecutando migraciones y usando Prisma Client para consultas tipadas y seguras.",
        ],
        stack: ["Nest.js", "Prisma", "React", "Tailwind CSS", "MySQL", "Docker", "APIs REST"],
        media: [
          { type: "image", src: "/media/experience/inode-technology/profunding/panel.jpeg", label: "Módulo de inversiones" },
          { type: "image", src: "/media/experience/inode-technology/profunding/proyectos.jpeg", label: "Módulo de Proyectos de Inversiones" },
          { type: "image", src: "/media/experience/inode-technology/profunding/comprobante.jpeg", label: "Módulo de Comprobantes de Transferencias" },
          { type: "image", src: "/media/experience/inode-technology/profunding/detalle_proyecto.jpeg", label: "Módulo de Detalle de los Proyectos" },
        ],
      },
      {
        id: "proteccion-civil-inode",
        title: "Protección Civil",
        period: "may. 2025 — sept. 2025",
        description:
          "Plataforma de gestión y monitoreo de incidencias de Protección Civil en tiempo real, con módulo móvil para reportes ciudadanos, chatbot inteligente para recepción de reportes vía mensajería y panel administrativo con visualización geográfica para el seguimiento operativo de cada incidencia.",
        did: [
          "Desarrollé el módulo móvil con React Native para el reporte de incidencias con geolocalización, consumiendo APIs REST en Django REST Framework y enviando evidencias al backend.",
          "Construí un chatbot con Twilio y spaCy (Python) para reportes vía mensajería, procesando texto libre y clasificando incidencias automáticamente.",
          "Implementé el panel administrativo con React y visualización geográfica, integrando datos en tiempo real desde las APIs REST en Django.",
          "Gestioné usuarios, permisos y autenticación con Django REST Framework, asegurando el acceso controlado a la información según el rol.",
        ],
        stack: ["Django", "Django REST Framework", "React Native", "Python", "Docker", "Twilio", "spaCy", "APIs REST"],
        media: [
          { type: "image", src: "/media/experience/inode-technology/proteccion-civil/crear_reporte.jpg", label: "Módulo Móvil de Reporte de Incidencias" },
          { type: "image", src: "/media/experience/inode-technology/proteccion-civil/reportes_app.jpeg", label: "Módulo Móvil de Lista de Reportes" },
          {
            type: "video",
            src: "/media/experience/inode-technology/proteccion-civil/chatbot.mp4",
            label: "Demo del Chatbot",
            poster: "/media/experience/inode-technology/proteccion-civil/chatbotImg.jpeg",
          },
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
        title: "Sistema Institucional de Gestión Judicial",
        period: "jun. 2024 — ene. 2025",
        description:
          "Sistema institucional construido desde cero para digitalizar procesos que antes eran manuales: notificaciones automáticas, turnado y distribución de expedientes judiciales. Integra autenticación con Keycloak, gestión de roles y permisos, y una bandeja operativa para el control y seguimiento de expedientes en tiempo real.",
        did: [
          "Desarrollé APIs REST y lógica de negocio con Spring Boot, JPA y PostgreSQL, modelando entidades y consultas para el manejo de expedientes y notificaciones.",
          "Implementé autenticación, roles y permisos con Keycloak, integrando el frontend en React con el backend seguro mediante tokens.",
          "Automaticé el envío de notificaciones por correo (solicitud de defensor) con plantillas FTL sobre Spring Boot, integrando el servicio de correo con la lógica del sistema.",
          "Construí la bandeja de turnado y distribución de expedientes con React y Material UI, consumiendo APIs REST y manejando estados de carga y error.",
          "Escribí pruebas unitarias con JUnit y Mockito, y revisé la cobertura con JaCoCo antes de cada despliegue en Azure DevOps.",
        ],
        stack: ["Spring Boot", "Spring Security", "JPA", "Keycloak", "Podman", "Linux", "Material UI", "JaCoCo", "Mockito", "JUnit", "Azure DevOps", "React", "PostgreSQL", "APIs REST"],
        media: [
          { type: "image", src: "/media/experience/poder-judicial/pjp1.jpeg", label: "Módulo de Turnado" },
          { type: "image", src: "/media/experience/poder-judicial/pjp3.jpeg", label: "Módulo de Detalle de Expedientes" },
          { type: "image", src: "/media/experience/poder-judicial/pjp4.jpeg", label: "Módulo de Registro de Amparo" },
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
        id: "mexicanfy",
        title: "Mexicanfy — E-commerce y Marketplace internacional",
        period: "ene. 2025 — may. 2025",
        description:
          "Plataforma e-commerce para promover y comercializar productos mexicanos hacia mercados europeos: identidad web, portal de acceso, catálogo de productos con filtros dinámicos y navegación multilenguaje. Enfocada en ofrecer una experiencia de compra fluida y responsiva para usuarios internacionales.",
        did: [
          "Desarrollé la interfaz corporativa con React y Tailwind CSS, consumiendo APIs REST y manejando la internacionalización.",
          "Construí el portal de acceso y navegación principal de la plataforma con Spring Security, integrando autenticación y control de sesiones.",
          "Implementé el módulo de catálogo con filtros dinámicos y búsqueda de productos sobre PostgreSQL y JPA, conectando el frontend con los servicios backend.",
          "Escribí pruebas unitarias con JUnit para validar la lógica del catálogo y los servicios de la plataforma.",
          "Di mantenimiento a módulos administrativos con Docker y Linux, y corregí errores en producción asegurando la estabilidad del sistema.",
        ],
        stack: ["Spring Boot", "Spring Security", "JPA", "PostgreSQL", "Docker", "Linux", "JUnit", "JaCoCo", "Mockito", "React", "Tailwind CSS", "APIs REST"],
        media: [
          { type: "image", src: "/media/experience/clickSoft/mxf1.jpg", label: "Identidad Web" },
          { type: "image", src: "/media/experience/clickSoft/mxf2.jpg", label: "Portal de Acceso y Navegación Web de Mexicanfy" },
          { type: "image", src: "/media/experience/clickSoft/mxf3.jpg", label: "Módulo de Catálogo y Exploración de Productos" },
        ],
      },
      {
        id: "merma",
        title: "Merma",
        period: "",
        description:
          "Sistema empresarial para la administración y control de procesos internos bajo arquitectura MVC, orientado a la gestión operativa de inventarios, movimientos y registros internos. Construido con Spring Framework en el backend y Angular en el frontend, conectado a base de datos Oracle.",
        did: [
          "Desarrollé APIs REST con Spring Framework y seguridad con Spring Security, implementando endpoints para la gestión de procesos internos.",
          "Integré la aplicación con bases de datos Oracle, escribiendo consultas JPA y manejando la persistencia de datos.",
          "Construí el frontend con Angular y TypeScript, consumiendo las APIs REST y manejando la interfaz de usuario.",
          "Validé servicios y endpoints con Postman, documentando y probando cada integración antes de su despliegue.",
        ],
        stack: ["Angular", "Spring Boot", "Spring Security", "Oracle", "TypeScript", "APIs REST"],
        media: [],
      },
    ],
  },
];