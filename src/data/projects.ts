export interface Project {
  name: string;
  description: string;
  repo?: string;  // GitHub URL
  demo?: string;  // live URL
}

export const projects: Project[] = [
  // {
  //   name: 'Project name',
  //   description: 'One sentence on what it does.',
  //   repo: 'https://github.com/nod53/project-name',
  //   demo: 'https://example.com',
  // },
];
