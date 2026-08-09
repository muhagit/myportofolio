import {
  siVuedotjs,
  siJavascript,
  siHtml5,
  siCss,
  siTailwindcss,
  siBootstrap,
  siNodedotjs,
  siExpress,
  siLaravel,
  siMongodb,
  siMysql,
  siGit,
  siGithub,
  siPostman,
  siFigma,
  siVite
} from 'simple-icons'
import { Webhook } from '@lucide/vue'

export const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'Vue', icon: siVuedotjs.path },
      { name: 'JavaScript', icon: siJavascript.path },
      { name: 'HTML', icon: siHtml5.path },
      { name: 'CSS', icon: siCss.path },
      { name: 'Tailwind CSS', icon: siTailwindcss.path },
      { name: 'Bootstrap', icon: siBootstrap.path }
    ]
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', icon: siNodedotjs.path },
      { name: 'Express', icon: siExpress.path },
      { name: 'Laravel', icon: siLaravel.path },
      { name: 'REST API', icon: Webhook, isComponent: true },
      { name: 'MongoDB', icon: siMongodb.path },
      { name: 'MySQL', icon: siMysql.path }
    ]
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', icon: siGit.path },
      { name: 'GitHub', icon: siGithub.path },
      { name: 'Postman', icon: siPostman.path },
      { name: 'Figma', icon: siFigma.path },
      { name: 'Vite', icon: siVite.path }
    ]
  }
]
