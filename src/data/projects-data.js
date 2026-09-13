export const PROJECTS_DATA = {
  "smarthouse-ai": {
    id: "smarthouse-ai",
    title: "SmartHouse AI",
    category: "PropTech · ML",
    domain: "PropTech",
    subtitle: "Plataforma de valuación inmobiliaria",
    description:
      "Aplicación full-stack que integra un modelo de Machine Learning para estimar el valor de propiedades a partir de sus características físicas, constructivas y de ubicación. El sistema combina procesamiento de datos, un backend con APIs REST y una interfaz web.",
    video: "/media/projects/smarthouse-ai/demo.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    links: {
      demo: "https://smarthouse-ai.vercel.app",
      code: "https://github.com/E-SalazarDev/SmartHouse-AVM",
    },
    technologies: [
      { name: "Python", category: "Backend · ML" },
      { name: "Django", category: "Backend" },
      { name: "Django REST Framework", category: "API REST" },
      { name: "PostgreSQL", category: "Base de datos" },
      { name: "Pandas", category: "Data Processing" },
      { name: "NumPy", category: "Data Processing" },
      { name: "Scikit-learn", category: "Machine Learning" },
      { name: "React", category: "Frontend" },
      { name: "Tailwind CSS", category: "Estilos" },
    ],
    flowDescription:
      "El flujo de datos desde la propiedad hasta la predicción del valor estimado.",
    howItWorks: [
      { icon: "database", number: "01", title: "Datos de la propiedad", description: "Se reciben características físicas, constructivas y de ubicación." },
      { icon: "file-search", number: "02", title: "Preprocesamiento", description: "Se limpian, transforman y normalizan las variables." },
      { icon: "brain", number: "03", title: "Modelo de ML", description: "La regresión estima el valor de la propiedad." },
      { icon: "server", number: "04", title: "API REST (Django)", description: "El backend expone el resultado mediante endpoints seguros." },
      { icon: "monitor", number: "05", title: "Aplicación web", description: "El usuario consulta la estimación en la interfaz." },
    ],
    flow: {
      input: { icon: "database", label: "Dataset", title: "Ames Housing", description: "79 variables · 1,460 propiedades" },
      model: { icon: "brain", label: "Modelo utilizado", title: "Regresión Lineal", description: "Entrenado con Scikit-learn" },
      result: { icon: "sparkles", label: "Resultado", title: "Estimación del valor de la propiedad", description: "Valor aproximado, no es un avalúo oficial" },
    },
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    ],
    impact: [
      "Automatización de la estimación del valor de propiedades",
      "Integración de Machine Learning con una aplicación real",
      "API REST para consultar predicciones",
      "Flujo completo de datos → modelo → aplicación",
    ],
  },

  "reportes-ciudadanos": {
    id: "reportes-ciudadanos",
    title: "Reportes Ciudadanos",
    category: "GovTech · Full Stack",
    domain: "GovTech",
    subtitle: "Plataforma web y móvil de reportes ciudadanos",
    description:
      "Plataforma web y móvil para la gestión y seguimiento de reportes ciudadanos e incidencias en tiempo real, orientada a digitalizar procesos de validación, seguimiento y administración operativa.",
    video: "/media/projects/reportes/demo.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80",
    links: {
      demo: "https://reportes-ciudadanos.vercel.app",
      code: "https://github.com/E-SalazarDev/Reportes-Ciudadanos",
    },
    technologies: [
      { name: "Python", category: "Backend" },
      { name: "Django", category: "Backend" },
      { name: "Django REST Framework", category: "API REST" },
      { name: "React Native", category: "Mobile" },
      { name: "PostgreSQL", category: "Base de datos" },
      { name: "Docker", category: "Infra" },
    ],
    flowDescription:
      "El recorrido de un reporte ciudadano desde la app móvil hasta el panel administrativo.",
    howItWorks: [
      { icon: "smartphone", number: "01", title: "Reporte ciudadano", description: "El ciudadano crea un reporte desde la app móvil." },
      { icon: "map-pin", number: "02", title: "Geolocalización", description: "Se captura la ubicación y se adjuntan evidencias." },
      { icon: "server", number: "03", title: "API REST", description: "El backend procesa, valida y almacena el reporte." },
      { icon: "filter", number: "04", title: "Validación", description: "Se aplican reglas de negocio y se clasifica el reporte." },
      { icon: "layout-dashboard", number: "05", title: "Panel administrativo", description: "Se monitorea y da seguimiento a los reportes." },
    ],
    flow: {
      input: { icon: "smartphone", label: "Entrada", title: "Reporte móvil", description: "App ciudadana con foto y geolocalización" },
      model: { icon: "filter", label: "Procesamiento", title: "Validación y clasificación", description: "Reglas de negocio + NLP básico" },
      result: { icon: "sparkles", label: "Resultado", title: "Incidencia registrada y asignada", description: "Seguimiento en tiempo real por dependencia" },
    },
    gallery: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
      "https://images.unsplash.com/photo-1568598035424-7070b67317d2?w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    ],
    impact: [
      "Digitalización de procesos de validación",
      "Trazabilidad completa de cada reporte",
      "Notificaciones en tiempo real",
      "Panel administrativo centralizado",
    ],
  },

  "profunding": {
    id: "profunding",
    title: "Profunding",
    category: "Fintech · Backend",
    domain: "Fintech",
    subtitle: "Plataforma de inversiones y crowdfunding",
    description:
      "Plataforma fintech de inversiones y crowdfunding inmobiliario con funcionalidades administrativas y operativas para clientes e inversionistas.",
    video: "/media/projects/profunding/demo.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80",
    links: {
      demo: "https://profunding.vercel.app",
      code: "https://github.com/E-SalazarDev/Profunding",
    },
    technologies: [
      { name: "Python", category: "Backend" },
      { name: "Django", category: "Backend" },
      { name: "PostgreSQL", category: "Base de datos" },
      { name: "Docker", category: "Infra" },
      { name: "React", category: "Frontend" },
    ],
    flowDescription:
      "Cómo un inversionista pasa del registro a la inversión y seguimiento de su portafolio.",
    howItWorks: [
      { icon: "user", number: "01", title: "Registro de usuario", description: "Inversionistas crean su cuenta y son validados." },
      { icon: "briefcase", number: "02", title: "Explorar proyectos", description: "Se muestran proyectos de inversión disponibles." },
      { icon: "dollar-sign", number: "03", title: "Inversión", description: "El usuario invierte en los proyectos de su interés." },
      { icon: "shield-check", number: "04", title: "Validación", description: "Se valida la operación y se registra." },
      { icon: "file-text", number: "05", title: "Seguimiento", description: "Se monitorean inversiones y pagos desde el panel." },
    ],
    flow: {
      input: { icon: "user", label: "Entrada", title: "Inversionista registrado", description: "KYC validado y cuenta activa" },
      model: { icon: "shield-check", label: "Procesamiento", title: "Validación de inversión", description: "Reglas financieras + auditoría" },
      result: { icon: "sparkles", label: "Resultado", title: "Portafolio activo", description: "Inversión registrada y con seguimiento" },
    },
    gallery: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&q=80",
    ],
    impact: [
      "Automatización de procesos financieros",
      "Gestión de usuarios y permisos",
      "Trazabilidad completa de operaciones",
      "Panel administrativo centralizado",
    ],
  },

  "proteccion-civil": {
    id: "proteccion-civil",
    title: "Protección Civil",
    category: "GovTech · IA",
    domain: "GovTech",
    subtitle: "Sistema de monitoreo de incidencias con IA",
    description:
      "Plataforma de gestión y monitoreo de incidencias de Protección Civil en tiempo real, con módulo móvil, chatbot inteligente y panel administrativo.",
    video: "/media/projects/proteccion-civil/chatbot.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80",
    links: {
      demo: "https://proteccion-civil.vercel.app",
      code: "https://github.com/E-SalazarDev/Proteccion-Civil",
    },
    technologies: [
      { name: "Python", category: "Backend · NLP" },
      { name: "spaCy", category: "NLP" },
      { name: "Twilio", category: "Mensajería" },
      { name: "Django", category: "Backend" },
      { name: "React Native", category: "Mobile" },
      { name: "Docker", category: "Infra" },
    ],
    flowDescription:
      "Del mensaje SMS del ciudadano a la respuesta operativa de Protección Civil.",
    howItWorks: [
      { icon: "message-circle", number: "01", title: "Reporte vía mensajería", description: "El ciudadano reporta incidencias por mensaje de texto." },
      { icon: "brain", number: "02", title: "Procesamiento NLP", description: "El chatbot interpreta el mensaje con spaCy." },
      { icon: "server", number: "03", title: "Lógica de negocio", description: "El backend clasifica y registra la incidencia." },
      { icon: "map-pin", number: "04", title: "Geolocalización", description: "Se registra la ubicación de la incidencia." },
      { icon: "layout-dashboard", number: "05", title: "Panel administrativo", description: "Se monitorea y responde a las incidencias." },
    ],
    flow: {
      input: { icon: "message-circle", label: "Entrada", title: "Mensaje SMS", description: "Vía Twilio desde cualquier celular" },
      model: { icon: "brain", label: "Procesamiento", title: "NLP con spaCy", description: "Clasificación de intención y entidades" },
      result: { icon: "sparkles", label: "Resultado", title: "Incidencia registrada", description: "Respuesta automática + alerta operativa" },
    },
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1200&q=80",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=80",
    ],
    impact: [
      "Atención automatizada 24/7 vía mensajería",
      "Clasificación inteligente con NLP",
      "Geolocalización de incidencias",
      "Respuesta en tiempo real",
    ],
  },

  "mexicanfy": {
    id: "mexicanfy",
    title: "Mexicanfy",
    category: "E-commerce",
    domain: "E-commerce",
    subtitle: "Marketplace internacional de productos mexicanos",
    description:
      "Plataforma e-commerce para promover y comercializar productos mexicanos hacia mercados europeos: identidad web, portal de acceso y catálogo de productos.",
    video: "/media/projects/mexicanfy/demo.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
    links: {
      demo: "https://mexicanfy.vercel.app",
      code: "https://github.com/E-SalazarDev/Mexicanfy",
    },
    technologies: [
      { name: "Java", category: "Backend" },
      { name: "Spring Boot", category: "Backend" },
      { name: "Spring Security", category: "Seguridad" },
      { name: "PostgreSQL", category: "Base de datos" },
      { name: "Docker", category: "Infra" },
      { name: "Tailwind CSS", category: "Estilos" },
    ],
    flowDescription:
      "El recorrido completo del cliente: del catálogo al pago y envío internacional.",
    howItWorks: [
      { icon: "globe", number: "01", title: "Portal web", description: "Usuario accede a la plataforma multilingüe." },
      { icon: "search", number: "02", title: "Catálogo", description: "Explora productos con filtros dinámicos." },
      { icon: "shopping-cart", number: "03", title: "Selección", description: "Añade productos al carrito." },
      { icon: "credit-card", number: "04", title: "Checkout", description: "Proceso de compra y pago seguro." },
      { icon: "package", number: "05", title: "Envío", description: "Seguimiento de pedido y logística." },
    ],
    flow: {
      input: { icon: "search", label: "Entrada", title: "Catálogo internacional", description: "Productos mexicanos con envío a Europa" },
      model: { icon: "credit-card", label: "Procesamiento", title: "Checkout seguro", description: "Pago + validación de inventario" },
      result: { icon: "sparkles", label: "Resultado", title: "Pedido confirmado", description: "Tracking internacional disponible" },
    },
    gallery: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
    ],
    impact: [
      "Internacionalización a mercados europeos",
      "Catálogo con filtros dinámicos",
      "Navegación multilenguaje",
      "Arquitectura escalable con Spring Boot",
    ],
  },

  "merma": {
    id: "merma",
    title: "Merma",
    category: "Enterprise · MVC",
    domain: "Enterprise",
    subtitle: "Sistema empresarial de control de procesos",
    description:
      "Sistema empresarial para administración y control de procesos internos, bajo arquitectura MVC integrado con base de datos Oracle.",
    video: "/media/projects/merma/demo.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    links: {
      demo: "https://merma.vercel.app",
      code: "https://github.com/E-SalazarDev/Merma",
    },
    technologies: [
      { name: "Java", category: "Backend" },
      { name: "Spring", category: "Backend" },
      { name: "Spring Security", category: "Seguridad" },
      { name: "Oracle", category: "Base de datos" },
      { name: "Angular", category: "Frontend" },
    ],
    flowDescription:
      "El ciclo completo de autenticación, operación y persistencia en Oracle.",
    howItWorks: [
      { icon: "user", number: "01", title: "Autenticación", description: "Usuario se autentica con credenciales seguras." },
      { icon: "layout-dashboard", number: "02", title: "Dashboard", description: "Accede al panel según su rol." },
      { icon: "clipboard-list", number: "03", title: "Gestión de procesos", description: "Administra procesos internos según permisos." },
      { icon: "file-check", number: "04", title: "Validación", description: "Se validan los datos con reglas de negocio." },
      { icon: "database", number: "05", title: "Persistencia", description: "Datos guardados en Oracle de forma segura." },
    ],
    flow: {
      input: { icon: "user", label: "Entrada", title: "Usuario autenticado", description: "Acceso con roles y permisos" },
      model: { icon: "file-check", label: "Procesamiento", title: "Validación de procesos", description: "Reglas de negocio + transacciones" },
      result: { icon: "sparkles", label: "Resultado", title: "Proceso registrado en Oracle", description: "Auditoría completa de la operación" },
    },
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    ],
    impact: [
      "Automatización de procesos manuales",
      "Control de acceso basado en roles",
      "Integración con Oracle",
      "Arquitectura MVC escalable",
    ],
  },
};

export const PROJECT_ORDER = [
  "smarthouse-ai",
  "reportes-ciudadanos",
  "profunding",
  "proteccion-civil",
  "mexicanfy",
  "merma",
];