import { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import { RunButton } from "./components/RunButton";
import { RunReportPanel } from "./components/RunReportPanel";
import { Logo } from "./components/Logo";
import { generateCommitMessage } from "./services/ai";
import { isPromptNode, isDiffTextNode } from "./nodes/types";

import "@xyflow/react/dist/style.css";

const errorMessage = "Please paste the git diff content first."

const Flow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCommit, setGeneratedCommit] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { getNodes } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const canGenerate = useCallback(() => {
    const diffNode = getNodes().find(isDiffTextNode);
    return diffNode?.data.diff && diffNode.data.diff.trim().length > 0;
  }, [getNodes]);

  const handleRun = async () => {
    if (!canGenerate()) {
      setError(errorMessage);
      setIsPanelOpen(true);
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const promptNode = getNodes().find(isPromptNode);
      if (!promptNode?.data.prompt) {
        throw new Error('No prompt available. Please connect and configure all nodes.');
      }

      const commitMessage = await generateCommitMessage(promptNode.data.prompt);
      setGeneratedCommit(commitMessage);
      setIsPanelOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Logo />
      <RunButton
        onRun={handleRun}
        isGenerating={isGenerating}
        disabled={!canGenerate()}
        tooltip={!canGenerate() ? "errorMessage" : undefined}
      />
      <RunReportPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        commitMessage={generatedCommit}
        error={error}
      />
    </ReactFlow>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}
