export const projects = [
  {
    id: 'portfolio-v1',
    title: 'Minimalist Portfolio',
    category: 'Design & Frontend',
    year: '2026',
    shortDescription: 'An editorial developer portfolio focused on typography and performance.',
    description: 'A fully custom-built developer portfolio focused on clean grid layouts, strong typography hierarchy, and smooth page transitions using GSAP.',
    featured: true,
    image: '', // Intentionally blank to test the editorial fallback placeholder
    gallery: [],
    links: {
      live: 'https://github.com/muhagit/myportofolio',
      github: 'https://github.com/muhagit/myportofolio'
    },
    caseStudy: {
      problem: 'Most developer portfolios use generic templates with heavy animation libraries, causing slow load times and lacking a unique personal identity.',
      solution: 'Built a typography-first static site using Vue 3 and Tailwind CSS v4, keeping the styling lightweight and utilizing GSAP for subtle micro-animations only.',
      role: 'Lead Frontend Engineer & Designer',
      challenges: 'Configuring custom path resolvers in Vite and ensuring scroll triggers ran smoothly across both desktop and narrow viewports without causing layout jitter.',
      result: 'A highly optimized page compiling in under 1 second, scoring near-perfect performance scores, and presenting a strong editorial visual direction.'
    }
  },
  {
    id: 'e-commerce-dashboard',
    title: 'Pulse Commerce',
    category: 'Full Stack & Dashboard',
    year: '2025',
    shortDescription: 'Real-time commerce dashboard with granular analytic reporting.',
    description: 'An enterprise-ready commerce platform dashboard featuring serverless architecture, real-time analytics stream integration, and responsive charts.',
    featured: true,
    image: '', // Intentionally blank to test the editorial fallback placeholder
    gallery: [],
    links: {
      live: '',
      github: 'https://github.com'
    },
    caseStudy: {
      problem: 'Commerce managers lack direct, real-time insights into purchase funnels, leading to delayed decision-making during high-traffic sales events.',
      solution: 'Designed a serverless streaming pipeline that feeds transaction events directly into a responsive, real-time dashboard visualization.',
      role: 'Full Stack Developer',
      challenges: 'Optimizing charting canvas renders to handle high-frequency incoming data updates without freezing the user interface thread.',
      result: 'A blazing fast dashboard layout displaying live metrics updates within 200ms of transaction settlement.'
    }
  }
]
