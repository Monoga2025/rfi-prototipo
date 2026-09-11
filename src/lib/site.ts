import { IMG } from "@/db/seed-data";

export const SITE = {
  name: "RFI Comunicaciones",
  phone: "+57 601 745 1234",
  phoneHref: "tel:+576017451234",
  whatsapp: "https://wa.me/573001234567",
  email: "info@rficomunicaciones.com",
  city: "Bogotá, Colombia",
  address: "Calle 100 # 19-54, Oficina 501, Bogotá, Colombia",
  hours: "Lunes a viernes 8:00 a.m. – 6:00 p.m. · Sábados 9:00 a.m. – 1:00 p.m.",
  tagline: "Tecnología que te mantiene conectado",
};

export const NAV = [
  { href: "/tienda", label: "Equipos" },
  { href: "/marcas", label: "Marcas" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
];

export const HERO_FEATURES = [
  { icon: "shield", title: "Equipos originales", subtitle: "y garantizados" },
  { icon: "wrench", title: "Soporte técnico", subtitle: "especializado" },
  { icon: "signal", title: "Cobertura en", subtitle: "todo el país" },
  { icon: "building", title: "Soluciones para", subtitle: "sector público y privado" },
] as const;

export const STATS = [
  { icon: "flag", value: 500, prefix: "+", label: "Proyectos ejecutados" },
  { icon: "award", value: 15, prefix: "+", label: "Años de experiencia" },
  { icon: "shield", value: 100, suffix: "%", label: "Compromiso técnico" },
] as const;

export type Service = {
  slug: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "instalaciones",
    icon: "tool",
    title: "Instalaciones",
    subtitle: "Sistemas de comunicación profesional",
    description:
      "Diseñamos e instalamos sistemas de radiocomunicación completos: sitios de repetición, estaciones base, radios móviles en flotas vehiculares y redes troncalizadas con cobertura garantizada.",
    bullets: ["Estudios de cobertura y propagación", "Montaje de torres, antenas y líneas de transmisión", "Instalación vehicular certificada", "Puesta en marcha y pruebas de aceptación"],
  },
  {
    slug: "mantenimiento",
    icon: "wrench",
    title: "Mantenimiento",
    subtitle: "Preventivo y correctivo",
    description:
      "Laboratorio técnico autorizado con equipos de medición calibrados. Extendemos la vida útil de tu inversión con planes de mantenimiento a la medida de tu operación.",
    bullets: ["Diagnóstico con analizadores de RF", "Reparación a nivel de componente", "Planes preventivos anuales", "Repuestos originales garantizados"],
  },
  {
    slug: "configuracion-activaciones",
    icon: "settings",
    title: "Configuración y activaciones",
    subtitle: "Equipos de radio y satelitales",
    description:
      "Programamos radios, codeplugs y sistemas, y activamos servicios satelitales Iridium e Inmarsat con planes de voz y datos ajustados a tu presupuesto.",
    bullets: ["Programación de flotas de radios", "Activación de SIM satelitales", "Configuración de aplicaciones y despacho", "Capacitación a usuarios finales"],
  },
  {
    slug: "recargas-satelitales",
    icon: "satellite",
    title: "Recargas satelitales",
    subtitle: "Iridium, Inmarsat y más",
    description:
      "Recarga minutos y datos para tu teléfono o terminal satelital en minutos. Somos distribuidores autorizados con soporte local en español.",
    bullets: ["Recargas prepago y planes pospago", "Activación inmediata", "Alertas de vencimiento", "Soporte 24/7 para emergencias"],
  },
  {
    slug: "alquiler-de-equipos",
    icon: "clock",
    title: "Alquiler de equipos",
    subtitle: "Radios y satelitales por días o meses",
    description:
      "Flota de radios digitales, teléfonos satelitales y terminales BGAN disponibles para eventos, expediciones, emergencias y proyectos temporales.",
    bullets: ["Entrega en todo el país", "Equipos configurados y cargados", "Soporte durante el alquiler", "Tarifas por día, semana o mes"],
  },
  {
    slug: "consultoria",
    icon: "compass",
    title: "Consultoría e ingeniería",
    subtitle: "Diseño de redes de comunicación",
    description:
      "Nuestros ingenieros analizan tu operación para diseñar la arquitectura de comunicaciones más eficiente, segura y escalable.",
    bullets: ["Levantamiento de necesidades", "Simulación de cobertura", "Licenciamiento de espectro ante la ANE", "Acompañamiento en licitaciones"],
  },
];

export type Project = {
  slug: string;
  title: string;
  sector: string;
  location: string;
  year: string;
  image: string;
  summary: string;
  results: string[];
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "red-troncalizada-mineria",
    title: "Red troncalizada para operación minera a cielo abierto",
    sector: "Minería",
    location: "Cesar, Colombia",
    year: "2025",
    image: "https://images.pexels.com/photos/33074372/pexels-photo-33074372.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    summary:
      "Sistema MOTOTRBO Capacity Max con 4 sitios de repetición, 850 radios portátiles y móviles, despacho centralizado y geolocalización de flota en tiempo real.",
    results: ["Cobertura del 99.6 % del área de operación", "Reducción del 40 % en tiempos de respuesta", "Integración con sistema de gestión de flota"],
    tags: ["Motorola", "Capacity Max", "GPS"],
  },
  {
    slug: "comunicacion-satelital-flota-maritima",
    title: "Conectividad satelital para flota de cabotaje",
    sector: "Marítimo",
    location: "Cartagena y Buenaventura",
    year: "2024",
    image: "https://images.pexels.com/photos/24246926/pexels-photo-24246926.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    summary:
      "Instalación de terminales Inmarsat FleetBroadband y teléfonos Iridium en 12 embarcaciones, con planes de datos gestionados y monitoreo de posición.",
    results: ["Voz y datos permanentes en alta mar", "Ahorro del 28 % en costos de comunicación", "Monitoreo de posición cada 10 minutos"],
    tags: ["Inmarsat", "Iridium", "Marítimo"],
  },
  {
    slug: "sistema-radio-refineria",
    title: "Radios intrínsecamente seguros para complejo petroquímico",
    sector: "Oil & Gas",
    location: "Barrancabermeja, Santander",
    year: "2024",
    image: "https://images.pexels.com/photos/15970028/pexels-photo-15970028.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    summary:
      "Renovación de 600 radios portátiles con certificación ATEX/IS, repetidoras redundantes y cobertura interior en áreas clasificadas.",
    results: ["Cero interrupciones en 18 meses de operación", "Cumplimiento normativo ATEX", "Grabación de comunicaciones críticas"],
    tags: ["Motorola", "ATEX", "Repetidoras"],
  },
  {
    slug: "red-emergencias-bomberos",
    title: "Red digital para cuerpo de bomberos y gestión del riesgo",
    sector: "Sector público",
    location: "Antioquia",
    year: "2023",
    image: "https://images.pexels.com/photos/5965023/pexels-photo-5965023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    summary:
      "Red DMR multisitio interconectada por IP para 22 estaciones de bomberos, con consola de despacho, grabación y botón de emergencia.",
    results: ["Interoperabilidad entre 22 estaciones", "Alertas de hombre caído y emergencia", "Capacitación a 400 unidades"],
    tags: ["Hytera", "DMR", "Despacho"],
  },
  {
    slug: "seguridad-ciudadana",
    title: "Comunicaciones encriptadas para seguridad ciudadana",
    sector: "Seguridad",
    location: "Bogotá D.C.",
    year: "2023",
    image: "https://images.pexels.com/photos/7714732/pexels-photo-7714732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    summary:
      "Suministro y programación de radios con encriptación AES-256 y GPS para unidades de vigilancia, integradas al centro de comando y control.",
    results: ["Encriptación AES-256 en toda la red", "Ubicación en tiempo real de 300 unidades", "Integración con cámaras y CCTV"],
    tags: ["Motorola", "Encriptación", "GPS"],
  },
  {
    slug: "infraestructura-torres",
    title: "Modernización de sitios de repetición en zonas de montaña",
    sector: "Infraestructura",
    location: "Eje Cafetero",
    year: "2022",
    image: IMG.workers,
    summary:
      "Reemplazo de antenas, líneas de transmisión, sistemas de energía solar y protección eléctrica en 9 sitios de repetición de difícil acceso.",
    results: ["Autonomía energética de 72 horas", "Mejora de 6 dB en la señal recibida", "Monitoreo remoto de cada sitio"],
    tags: ["Sinclair", "Energía solar", "Torres"],
  },
];

export const FAQS = [
  { q: "¿Los equipos cuentan con garantía?", a: "Sí. Todos nuestros equipos son originales y cuentan con garantía del fabricante (de 1 a 3 años según la marca) más el respaldo de nuestro laboratorio técnico autorizado en Bogotá." },
  { q: "¿Hacen envíos a todo el país?", a: "Realizamos envíos asegurados a todo Colombia. En Bogotá entregamos en 24 horas y a ciudades principales en 2 a 3 días hábiles." },
  { q: "¿Necesito licencia para usar radios de dos vías?", a: "Para uso profesional en bandas VHF/UHF se requiere permiso del Ministerio TIC. Te acompañamos en todo el proceso de licenciamiento del espectro." },
  { q: "¿Cómo activo un teléfono satelital?", a: "Nuestro equipo activa tu SIM Iridium o Inmarsat de forma inmediata al momento de la compra o recarga. Solo necesitas el IMEI del equipo." },
  { q: "¿Programan los radios antes de enviarlos?", a: "Sí. Configuramos frecuencias, canales, grupos y funciones según tu operación, sin costo adicional en compras de flota." },
  { q: "¿Ofrecen planes de pago para empresas?", a: "Trabajamos con órdenes de compra, crédito a 30/60 días para clientes corporativos y leasing tecnológico a través de aliados financieros." },
];

export const BLOG_POSTS = [
  {
    slug: "dmr-vs-analogo",
    title: "DMR vs. análogo: ¿por qué migrar tu flota a radio digital?",
    excerpt: "Mayor cobertura, mejor audio, datos y el doble de capacidad por canal. Te explicamos los beneficios reales de la migración.",
    date: "12 de marzo de 2026",
    image: IMG.catRadios,
    category: "Radiocomunicación",
    readTime: "6 min",
  },
  {
    slug: "iridium-vs-inmarsat",
    title: "Iridium vs. Inmarsat: cómo elegir tu red satelital",
    excerpt: "Cobertura polar, latencia, costo por minuto y tipo de terminal. La guía definitiva para operaciones remotas.",
    date: "27 de febrero de 2026",
    image: IMG.catSatelital,
    category: "Satelital",
    readTime: "8 min",
  },
  {
    slug: "mantenimiento-preventivo-radios",
    title: "5 claves de mantenimiento preventivo para radios portátiles",
    excerpt: "Baterías, antenas, sellos y firmware: pequeñas rutinas que evitan fallas en el peor momento.",
    date: "8 de febrero de 2026",
    image: IMG.catRepuestos,
    category: "Soporte",
    readTime: "4 min",
  },
];

export const SECTORS = ["Minería", "Oil & Gas", "Marítimo", "Sector público", "Seguridad", "Transporte", "Agroindustria", "Construcción", "Otro"];
