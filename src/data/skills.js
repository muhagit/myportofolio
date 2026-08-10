import {
  siReact,
  siVuedotjs,
  siNextdotjs,
  siJavascript,
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
      { name: 'React', icon: siReact.path },
      { name: 'Vue', icon: siVuedotjs.path },
      { name: 'Next.js', icon: siNextdotjs.path },
      { name: 'JavaScript', icon: siJavascript.path }
    ]
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', icon: siNodedotjs.path },
      { name: 'Express', icon: siExpress.path },
      { name: 'Laravel', icon: siLaravel.path },
      { name: 'REST API', icon: Webhook, isComponent: true }
    ]
  },
  {
    name: 'Database',
    skills: [
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
