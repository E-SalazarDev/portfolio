// Cada item:
// - { name, brand, color } → logo real vía Simple Icons, coloreado con el hex de marca
// - { name, devicon }      → logo real vía Devicon (para Java/Hibernate, que Simple Icons no incluye)
// - { name, color }        → sin logo real posible (es un concepto, no una marca/librería) → punto de color
export const stack = [
  {
    category: "FRONTEND",
    items: [
      { name: "React", brand: "react", color: "61DAFB" },
      { name: "React Native", brand: "react", color: "61DAFB" },
      { name: "Angular", brand: "angular", color: "DD0031" },
      { name: "TypeScript", brand: "typescript", color: "3178C6" },
      { name: "JavaScript", brand: "javascript", color: "F7DF1E" },
      { name: "HTML5", brand: "html5", color: "E34F26" },
      { name: "CSS3", brand: "css3", color: "1572B6" },
      { name: "Tailwind CSS", brand: "tailwindcss", color: "06B6D4" },
      { name: "Material UI", brand: "mui", color: "007FFF" },
    ],
  },
  {
    category: "BACKEND",
    items: [
      { name: "Python", brand: "python", color: "3776AB" },
      { name: "Java", devicon: "java" },
      { name: "Django REST Framework", brand: "django", color: "3ECF6E" },
      { name: "Spring Boot", brand: "springboot", color: "6DB33F" },
      { name: "Spring Security", brand: "spring", color: "6DB33F" },
      { name: "APIs REST", color: "0EA5E9" },
      { name: "Keycloak", brand: "keycloak", color: "14B8A6" },
      { name: "Docker", brand: "docker", color: "2496ED" },
      { name: "JPA (Hibernate)", devicon: "hibernate" },
    ],
  },
  {
    category: "BASES DE DATOS",
    items: [
      { name: "PostgreSQL", brand: "postgresql", color: "4169E1" },
      { name: "MySQL", brand: "mysql", color: "4479A1" },
      { name: "Oracle", brand: "oracle", color: "F80000" },
    ],
  },
  {
    category: "IA, DATOS & AUTOMATIZACIÓN",
    items: [
      { name: "Modelos ML", color: "A855F7" },
      { name: "Computer Vision", color: "3B82F6" },
      { name: "spaCy (NLP)", brand: "spacy", color: "09A3D5" },
      { name: "Scrapy", brand: "scrapy", color: "60A839" },
      { name: "Twilio", brand: "twilio", color: "F22F46" },
    ],
  },
  {
    category: "HERRAMIENTAS & TESTING",
    items: [
      { name: "Git", brand: "git", color: "F05032" },
      { name: "Maven", brand: "apachemaven", color: "C71A36" },
      { name: "Postman", brand: "postman", color: "FF6C37" },
      { name: "JUnit", brand: "junit5", color: "25A162" },
      { name: "Mockito", color: "78C257" },
      { name: "Podman", brand: "podman", color: "892CA0" },
    ],
  },
];