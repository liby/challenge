import { memo, useEffect, useMemo } from 'react';
import {
  Position,
  Handle,
  useNodeConnections,
  useNodesData,
  useReactFlow,
  type NodeProps,
} from '@xyflow/react';
import { type PromptNodeStruct, type AppNode, isDiffTextNode, isConfigNode } from '../nodes/types';

const PROMPT_TEMPLATE = `You are a helpful AI assistant that helps developers write better git commit messages.

I want you to help me generate a git commit message based on the following git diff:

\`\`\`
{diff}
\`\`\`

Requirements:
{requirements}

Please generate a {language} git commit message that meets all the above requirements.
If there are multiple changes, please use a bullet point list in the commit body.

Note: Focus on explaining WHAT changes were made and WHY they were necessary.`;

export const PromptNode = memo(({ id, data }: NodeProps<PromptNodeStruct>) => {
  const { updateNodeData } = useReactFlow();
  const connections = useNodeConnections({
    handleType: 'target',
  });

  const sourceIds = useMemo(() =>
    connections.map((connection) => connection.source),
    [connections]
  );

  const nodesData = useNodesData<AppNode>(sourceIds);

  const { diffNode, configNode } = useMemo(() => ({
    diffNode: nodesData.find(isDiffTextNode),
    configNode: nodesData.find(isConfigNode),
  }), [nodesData]);

  const generatePrompt = () => {
    if (!diffNode?.data.diff || !configNode) {
      return 'Waiting for input and configuration...';
    }

    const config = configNode.data;
    const requirements = [
      config.useConventional
        ? '- Follow the Conventional Commits format (https://www.conventionalcommits.org)'
        : '- No need to follow Conventional Commits format, write in free form',
      config.maxLength && `- The commit message should not exceed ${config.maxLength} characters`,
      config.detailed && '- Include both the changes made and the reasoning behind them',
    ].filter(Boolean).join('\n');

    return PROMPT_TEMPLATE
      .replace('{diff}', diffNode.data.diff.trim())
      .replace('{requirements}', requirements)
      .replace('{language}', config.language === 'zh' ? 'Chinese' : 'English');
  };

  useEffect(() => {
    const prompt = generatePrompt();
    if (prompt !== data.prompt) {
      updateNodeData(id, { prompt });
    }
  }, [
    sourceIds,
    diffNode?.data?.diff,
    configNode?.data?.useConventional,
    configNode?.data?.maxLength,
    configNode?.data?.detailed,
    configNode?.data?.language,
    id,
    data.prompt,
    updateNodeData
  ]);

  return (
    <div className="flow-node-base min-w-[400px]">
      <Handle
        type="target"
        position={Position.Left}
        className="flow-handle"
      />
      <div className="flex items-center justify-between w-full mb-4">
        <span className="font-medium">Generated Prompt</span>
        <div className="custom-drag-handle" />
      </div>
      <div className="w-full space-y-4">
        <pre className="flow-text-box w-full min-h-[200px] whitespace-pre-wrap text-sm">
          {data.prompt || generatePrompt()}
        </pre>
      </div>
    </div>
  );
});