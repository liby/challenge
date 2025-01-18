import { memo } from 'react';
import {
  Position,
  Handle,
  useReactFlow,
  type NodeProps,
} from '@xyflow/react';
import { type DiffTextNodeStruct } from '../nodes/types';

export const DiffInputNode = memo(({ id, data }: NodeProps<DiffTextNodeStruct>) => {
  const { updateNodeData } = useReactFlow();

  return (
    <div className="flow-node-base min-w-[300px]">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="font-medium">Git Diff Input</span>
        <div className="custom-drag-handle" />
      </div>
      <div className="w-full space-y-2">
        <div className="text-sm text-gray-500">
          Paste your git diff here or use command:
          <code className="mx-2 px-2 py-1 bg-gray-100 rounded text-xs">
            git diff --staged | pbcopy
          </code>
        </div>
        <textarea
          className="flow-text-box w-full h-40 resize-none focus:outline-none focus:border-node-selected focus:ring-1 focus:ring-node-selected"
          placeholder="Paste git diff here..."
          onChange={(evt) => updateNodeData(id, { diff: evt.target.value })}
          value={data.diff || ''}
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="flow-handle"
      />
    </div>
  );
});