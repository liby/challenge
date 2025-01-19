import { CopyButton } from './CopyButton';

interface RunReportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  commitMessage: string;
  error: string | null;
}

export const RunReportPanel = ({
  commitMessage,
  error,
  isOpen,
  onClose,
}: RunReportPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-4">Generated Commit Message</h2>

        {error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">
            {error}
          </div>
        ) : (
          <CopyButton commitMessage={commitMessage} />
        )}
      </div>
    </div>
  );
};
