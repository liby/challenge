import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
} from '@xyflow/react';
import { memo } from 'react';
import { DiffTextNodeStruct, isDiffTextNode, type AppNode } from '../nodes/types';

export const ResultNode = memo(() => {
  const connections = useNodeConnections({
    handleType: 'target',
  });
  const nodesData = useNodesData<AppNode>(
    connections.map((connection) => connection.source),
  );
  const diffTextNodes = nodesData.filter((node): node is DiffTextNodeStruct =>
    node && isDiffTextNode(node)
  );

  return (
    <div className="flow-node-base">
      <Handle
        type="target"
        position={Position.Left}
        className="flow-handle"
      />
      <div className="w-full">
        <div className="font-medium mb-2">Incoming Texts:</div>
        <div className="space-y-2">
          {diffTextNodes.length > 0 ? (
            diffTextNodes.map(({ id, data }) => (
              <div key={id} className="flow-text-box">
                {data.diff}
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">No incoming connections</div>
          )}
        </div>
      </div>
    </div>
  );
});
