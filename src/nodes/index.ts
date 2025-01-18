import { type NodeTypes } from "@xyflow/react";

import { DiffInputNode } from "../components/DiffInputNode";
import { ConfigNode } from "../components/ConfigNode";
import { PromptNode } from "../components/PromptNode";
import { type AppNode } from "./types";

export const initialNodes: AppNode[] = [
  {
    id: 'diff',
    type: 'diff',
    dragHandle: '.custom-drag-handle',
    data: {
      diff: '',
    },
    position: { x: 5, y: 70 },
  },
  {
    id: 'config',
    type: 'config',
    dragHandle: '.custom-drag-handle',
    data: {
      useConventional: true,
      maxLength: 100,
      detailed: true,
      language: 'en',
    },
    position: { x: 250, y: 500 },
  },
  {
    id: 'prompt',
    type: 'prompt',
    dragHandle: '.custom-drag-handle',
    data: {
      prompt: '',
    },
    position: { x: 850, y: 250 },
  },
];

export const nodeTypes = {
  diff: DiffInputNode,
  config: ConfigNode,
  prompt: PromptNode,
} satisfies NodeTypes;
