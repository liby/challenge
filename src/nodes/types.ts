import type { Node } from "@xyflow/react";

interface DiffTextNodeData extends Record<string, unknown> {
  diff: string;
}

interface ConfigNodeData extends Record<string, unknown> {
  useConventional: boolean;
  maxLength: number;
  detailed: boolean;
  language: 'en' | 'zh';
}

interface PromptNodeData extends Record<string, unknown> {
  prompt: string;
}

export type DiffTextNodeStruct = Node<DiffTextNodeData, 'diff'>;
export type ConfigNodeStruct = Node<ConfigNodeData, 'config'>;
export type PromptNodeStruct = Node<PromptNodeData, 'prompt'>;
export type AppNode = DiffTextNodeStruct | ConfigNodeStruct | PromptNodeStruct;

export function isDiffTextNode(node: any): node is DiffTextNodeStruct {
  return node?.type === 'diff';
}

export function isConfigNode(node: any): node is ConfigNodeStruct {
  return node?.type === 'config';
}

export function isPromptNode(node: any): node is PromptNodeStruct {
  return node?.type === 'prompt';
}
