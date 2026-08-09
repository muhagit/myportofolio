export const projects = [
  {
    id: 'jsquest',
    title: 'JSQuest',
    category: 'Education / Full-Stack',
    year: '2026',
    shortDescription: 'A gamified web platform for learning JavaScript through interactive coding challenges.',
    description: 'JSQuest is an educational web application designed to teach JavaScript fundamentals through gamification. It provides a structured learning curriculum consisting of modular topics, interactive learning materials, and practical coding challenges. The platform features an integrated code editor powered by Monaco Editor and an isolated frontend execution sandbox for instant verification, motivating users with XP rewards and real-time feedback.',
    featured: true,
    image: '/jsquest.png',
    gallery: ['/jsquest.png'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Monaco Editor', 'Tailwind CSS'],
    links: {
      live: '',
      github: 'https://github.com/muhagit/jsquest'
    },
    caseStudy: {
      role: 'Full-stack Developer',
      problem: 'Learning JavaScript can be dry and theoretical, leading to high dropout rates for beginners. Traditional platforms often lack a safe, isolated, and responsive environment for users to immediately run their code and validate solutions without heavy server-side execution overhead.',
      solution: 'JSQuest implements a gamified, hands-on learning environment. Users learn concepts from bite-sized modules and immediately practice by writing code in an embedded editor. Successful solutions reward users with XP, driving engagement. The entire execution sandbox runs directly in the client, allowing instant and cost-effective challenge verification.',
      challenges: 'To prevent malicious or infinite loops from freezing the browser, the code execution engine runs user-submitted JavaScript in a dedicated Web Worker initialized via Blob URLs. It overrides console.log to safely capture logs and enforces a strict 3-second execution timeout, forcibly terminating the worker if it detects infinite loops.',
      result: 'Implemented a fully functional gamified learning portal containing multiple modules and challenges. Verified solutions execute in milliseconds under a secure sandboxed environment. Built with a Node.js and Express backend to store user progress, track completed challenges, and persist XP scores in MongoDB.'
    }
  },
  {
    id: 'nicky-frozen-pos',
    title: 'Nicky Frozen POS',
    category: 'POS / Full-Stack',
    year: '2025',
    shortDescription: 'A full-stack point-of-sale and inventory management system built for frozen food operations.',
    description: 'Nicky Frozen POS is a business administration and financial management system designed for multi-branch frozen food retail. Built with the MERN stack, the application handles point-of-sale cash register workflows, cashier shifts, real-time inventory adjustments across multiple physical branches, stock transfer tracking, and comprehensive daily reports.',
    featured: true,
    image: '/nicky-frozen-pos.png',
    gallery: ['/nicky-frozen-pos.png'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Midtrans', 'Tailwind CSS'],
    links: {
      live: 'https://nickypos.web.id',
      github: 'https://github.com/muhagit/Pos-System-Nicky-Frozen'
    },
    caseStudy: {
      role: 'Full-stack Developer',
      problem: 'Frozen food retail businesses face strict operational challenges, including managing product expiration dates to prevent inventory waste and maintaining real-time stock levels across different branches. Casual point-of-sale apps lack granular batch tracking and branch transfer capabilities.',
      solution: 'Built a multi-branch POS system that maps stock levels per branch using a custom MERN architecture. It monitors product expiration dates and features a transaction holding drawer (is_hold) allowing cashiers to temporarily save active carts and resume them later without blocking the checkout flow.',
      challenges: 'Managing stock consistency across physical branches required storing branch stock data as key-value maps directly inside MongoDB. The system tracks active cash register shifts and records cash flow entries, ensuring database consistency during concurrent checkout events, and logs stock transfer history when inventory moves between branches.',
      result: 'Developed a complete POS administration panel with multi-role access (Admin, Cashier). The app integrates Midtrans for digital payment tokenization, features real-time inventory ledger logging, generates downloadable financial reports, and runs reliably on a deployed production environment.'
    }
  },
  {
    id: 'public-complaint-service',
    title: 'Public Complaint Service',
    category: 'Public Service / Frontend',
    year: '2024',
    shortDescription: 'A public complaint service platform built with Vue and Laravel, developed collaboratively with a focus on frontend experience.',
    description: 'Sistem Layanan Pengaduan Masyarakat is a web application designed to facilitate public complaints and feedback. The system allows citizens to submit detailed complaints, track verification stages, and communicate with administrative officers. The application is built with a decoupled architecture featuring a Vue 3 frontend and a Laravel backend API.',
    featured: false,
    image: '/public-complaint-service.png',
    gallery: ['/public-complaint-service.png'],
    technologies: ['Vue.js', 'Laravel', 'Bootstrap', 'Swiper', 'AOS', 'MySQL'],
    links: {
      live: 'https://laporgan.web.id',
      github: 'https://github.com/muhagit/website-layanan-pengaduan-masyarakat'
    },
    caseStudy: {
      role: 'Frontend Developer — Contributor',
      problem: 'Public service portals often suffer from confusing interfaces and slow page transitions, making it difficult for citizens to submit reports and monitor resolution progress. The challenge was to deliver a responsive, accessible, and interactive frontend experience.',
      solution: 'Designed a clean and modern user interface using Vue 3 and Bootstrap 5. Integrated interactive elements such as AOS (Animate On Scroll) for storytelling transitions, Swiper for content galleries, and Lottie vector animations to create a welcoming public service landing experience.',
      contribution: 'Responsible for the entire frontend presentation layer of the application. Built reusable Vue 3 components, set up responsive grid layouts, and structured client-side routing using Vue Router. Connected user interfaces to Laravel backend REST APIs, implemented real-time input validation on complaint forms, and configured CSS transitions for accessible keyboard focus states.',
      challenges: 'Ensuring seamless API communication with the Laravel backend required standardizing request payloads and handling API error boundaries gracefully. Designed clean form validation flows and user notification modals to keep citizens informed during network delays or file upload operations.',
      result: 'Created a fully responsive citizen portal that adapts cleanly across mobile and desktop viewports. The system features a public verification tracking page, an administrative dashboard for checking incoming tickets, and includes background automation scripts for Telegram Bot notifications.'
    }
  }
]
