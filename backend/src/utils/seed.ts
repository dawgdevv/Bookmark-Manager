import type { Bookmark } from '../types/index.js'

export const seedBookmarks: Bookmark[] = [
  {
    id: '1',
    url: 'https://github.com',
    title: 'GitHub - Where the world builds software',
    description: 'GitHub is where over 100 million developers shape the future of software, together.',
    tags: ['development', 'git', 'programming'],
    createdAt: '2024-01-15T10:00:00.000Z'
  },
  {
    id: '2',
    url: 'https://stackoverflow.com',
    title: 'Stack Overflow - Where Developers Learn, Share, & Build Careers',
    description: 'Stack Overflow is the largest, most trusted online community for developers.',
    tags: ['development', 'q&a', 'community'],
    createdAt: '2024-01-20T14:30:00.000Z'
  },
  {
    id: '3',
    url: 'https://developer.mozilla.org',
    title: 'MDN Web Docs',
    description: 'Resources for developers, by developers. Documenting web technologies, including CSS, HTML, and JavaScript.',
    tags: ['documentation', 'web', 'reference'],
    createdAt: '2024-02-05T09:15:00.000Z'
  },
  {
    id: '4',
    url: 'https://react.dev',
    title: 'React - The library for web and native user interfaces',
    description: 'React lets you build user interfaces out of individual pieces called components.',
    tags: ['react', 'javascript', 'frontend'],
    createdAt: '2024-02-10T16:45:00.000Z'
  },
  {
    id: '5',
    url: 'https://nodejs.org',
    title: 'Node.js - JavaScript runtime built on Chrome V8 JavaScript engine',
    description: 'Node.js is an open-source, cross-platform JavaScript runtime environment.',
    tags: ['nodejs', 'javascript', 'backend'],
    createdAt: '2024-02-12T11:20:00.000Z'
  }
]
