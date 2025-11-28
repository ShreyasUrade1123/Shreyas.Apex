export type Project = {
  title: string;
  description: string;
  link: string;
  technologies: string[];
  category: "Web Development" | "Web Design" | "Application" | "AI/ML";
  featured?: boolean;
  imageSrc?: string;
};

export const projectList: Project[] = [
  {
    title: "SKYWINKS",
    description: "SkyWinks is a microservices-based airline booking platform featuring advanced flight search, real-time seat selection, secure payments, and role-based authentication. Built with a distributed Node.js backend, React frontend, MySQL, and RabbitMQ, it delivers a scalable, seamless booking experience through an API Gateway and modern, responsive UI.",
    link: "https://skywinks-airline-booking.vercel.app/",
    technologies: ["React", "Node.js", "Express.js", "MySQL", "RabbitMQ", "JWT"],
    category: "Web Development",
    imageSrc: "/skywinks.png"
  },

  {
    title: "NightRunners",
    description: "Designed the core game loop UI, turning a complex risk/reward system into a simple “pick-and-play” flow. Conducted A/B tests proving thematic heat-level buttons boosted user confidence over a standard slider. Created a cohesive cyberpunk visual identity and component library used across the NFT marketplace, game UI, and landing page.",
    link: "https://www.figma.com/design/ytnrkeWwraYPyDibG9YlDG/NightRunners-NFT",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Web Design",
    imageSrc: "/nightrunners.png"
  },

  {
    title: "Kalatarang",
    description: "A vibrant web design for the 'Kalatarang' college festival. With dynamic event showcases and seamless user registration. Features an interactive event schedule, an immersive media gallery, and a modern, fully responsive interface.",
    link: "https://www.figma.com/design/fzO2e553O5jHkYd8FerzD4/Kaltarang?node-id=13-151&t=XOmXWM1cNd3GjYc5-1",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Web Design",
    imageSrc: "/kalatarang.png"
  },

  {
    title: "PushGrade",
    description: "PushGrade is a web platform designed to help students easily find colleges through smart search, filters, and curated insights. It also includes a built-in resume builder, enabling students to create polished, admission-ready resumes within the same workflow.",
    link: "https://www.figma.com/design/fzO2e553O5jHkYd8FerzD4/Kaltarang?node-id=13-151&t=XOmXWM1cNd3GjYc5-1",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Web Design",
    imageSrc: "/pushgrade.png"
  },

  {
    title: "Safe Mine",
    description: "A next-generation safety platform with enhanced safety protocols and streamlined shift operations. Features a comprehensive solution for real-time logging, worker tracking, and full multilingual accessibility.",
    link: "https://github.com/ShreyasUrade1123/SafeMIne/tree/master",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    category: "Web Development",
    imageSrc: "/safemine.png"
  },

  {
    title: "TeamSync",
    description: "An enterprise-grade project management platform with real-time collaboration and multi-tenant architecture. Features role-based access control, comprehensive security layers, and high test coverage.",
    link: "https://github.com/ShreyasUrade1123/Team_Sync.",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Express.js", "Socket.io"],
    category: "Web Development",
    imageSrc: "/teamsync.png"
  },

  {
    title: "LockerGM",
    description: "A sleek web design for 'LockerGM', a locker management system.",
    link: "https://www.figma.com/design/SWqpJfC5iCIsC7MqVk04k3/DraconX-Job-Mock-Design?node-id=0-1&t=Rl1l5bVQH6lSOXYx-1",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Web Design",
    imageSrc: "/LockerGM.png"
  },

  {
    title: "Sahayak",
    description: "This is a full-stack AI Voice Generation Platform (AI Sahayak). It offers two main features: Multilingual Text-to-Speech (TTS), which includes auto-translation across 9 languages, and High-Fidelity Voice Cloning in 4 languages. The application is built using Next.js/React for the front end and a Python/FastAPI backend powering the AI models (Kokoro TTS and YourTTS).",
    link: "https://github.com/ShreyasUrade1123/Sahayak",
    technologies: ["React", "MongoDB", "Node.js", "Express.js", "Socket.io"],
    category: "Web Development",
    imageSrc: "/sahayak.png"
  },

  {
    title: "CA-MONK Redesign",
    description: "A sleek web design for 'CA-MONK', a redesign of the CA-MONK website.",
    link: "https://www.figma.com/design/SWqpJfC5iCIsC7MqVk04k3/DraconX-Job-Mock-Design?node-id=0-1&t=Rl1l5bVQH6lSOXYx-1",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Web Design",
    imageSrc: "/camonk.png"
  },

  {
    title: "Stylo",
    description: "Stylo is a fashion e-commerce design system built to deliver a premium, intuitive shopping experience through curated product displays, smart filtering, and a clean mobile-first interface. The design emphasizes brand consistency, high-impact visuals, and an effortless checkout flow.",
    link: "https://www.figma.com/design/SWqpJfC5iCIsC7MqVk04k3/DraconX-Job-Mock-Design?node-id=0-1&t=Rl1l5bVQH6lSOXYx-1",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Web Design",
    imageSrc: "/stylo.png"
  },

  {
    title: "Urjotsav",
    description: "An enchanting web design for the 'Urjotsav' college tech fest, inspired by a Harry Potter theme. With magical event showcases and seamless workshop registration. Features spellbinding competition modules, a real-time 'House Cup' leaderboard, and a modern, fully responsive interface.",
    link: "https://www.figma.com/design/CDkj7hUtzIaZtzHSVCdr3o/Untitled?node-id=0-1&t=5up4N8u2ivzh3sq5-1",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Web Design",
    imageSrc: "/urjotsav.png"
  },

  {
    title: "CodeDeck",
    description: "A full-stack web application with real-time chat functionality. Features secure user sign-up, login, and instant messaging powered by React, Node.js, and Socket.io.",
    link: "https://github.com/ShreyasUrade1123/CodeDeck-/tree/master",
    technologies: ["React", "MongoDB", "Node.js", "Express.js", "Socket.io"],
    category: "Web Development",
    imageSrc: "/codedeck.png"
  },
  {
    title: "F1-Race-Prediction",
    description: "An advanced predictive analytics platform for F1 race outcomes. Features complex machine learning models, comprehensive historical data integration, and driver/team performance analysis.",
    link: "https://github.com/ShreyasUrade1123/F1-Race-Prediction",
    technologies: ["Python", "Tenserflow", "Kaggle",],
    category: "AI/ML",
    imageSrc: "/f1.png"
  },

  {
    title: "DocOrizon",
    description: "A stunning UI/UX design for a digital health platform. With intuitive patient journeys and seamless appointment scheduling. Features a clean doctor discovery module, accessible user profiles, and a modern, responsive interface.",
    link: "https://www.figma.com/design/dro9XIk5NYZmwaX6KoovBS/Roxiler?node-id=0-1&t=xRnCpIbonpfJxiz9-1",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Application",
    imageSrc: "/docorizon.png"
  },

  {
    title: "Saarthii",
    description: "A student-centric web design for a career guidance platform. With intuitive career discovery journeys and seamless counsellor scheduling. Features clean resource dashboards, accessible assessment modules, and a modern, responsive interface.",
    link: "https://www.figma.com/design/Yfl5hF65zghwCpuS20NANc/Saarthi-Mock?node-id=0-1&t=hSuCD11PSsCWWAgZ-1",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Web Design",
    imageSrc: "/saarthi.png"
  },
  {
    title: "Women Safety app",
    description: "A security-focused UI/UX design for a personal safety application. With instant-access emergency alerts and seamless location sharing. Features a one-tap SOS interface, intuitive trusted contact management, and clear, high-contrast safe-zone mapping.",
    link: "https://www.figma.com/design/aU5hwOdrjYrS7Q75apgpOE/Artemis-Demo?node-id=0-1&t=uLxaEQyxO7ke4J0V-1",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Application",
    imageSrc: "/projects/women-safety.png"
  },

  {
    title: "Darcspy",
    description: "A clean, analytical mobile app for dark pattern detection. With real-time site scanning and instant push-notification alerts. Features a simple card-based threat dashboard, on-screen pattern highlighting, and a one-tap reporting tab.",
    link: "https://www.figma.com/design/63hIZrT6IjvtpYXt3yYSQ3/Darcspy-App?node-id=0-1&t=H61LIihOIuvz4YpG-1",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    category: "Application",
    imageSrc: "/projects/darcspy.png"
  },

];