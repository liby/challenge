import type { Edge, EdgeTypes } from '@xyflow/react';

export const initialEdges: Edge[] = [
  { id: 'diff-prompt', source: 'diff', target: 'prompt', animated: true },
  { id: 'config-prompt', source: 'config', target: 'prompt', animated: true },
];


export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
