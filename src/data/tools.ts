export interface Tool {
  name: string;
  description: string;
  url: string; // e.g. '/tools/my-tool/' for a page you add under src/pages/tools/
}

export const tools: Tool[] = [];
