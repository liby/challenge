interface RunButtonProps {
  onRun: () => void;
  isGenerating: boolean;
  disabled?: boolean;
  tooltip?: string;
}

export const RunButton = ({ onRun, isGenerating, disabled, tooltip }: RunButtonProps) => {
  return (
    <button
      onClick={onRun}
      disabled={isGenerating || disabled}
      title={tooltip}
      className={`
        absolute text-lg top-4 right-4 font-semibold py-2 px-4 rounded-lg border transition-colors z-50 flex items-center gap-2
        ${isGenerating || disabled
          ? 'bg-gray-100 text-gray-400 border-gray-300'
          : 'bg-pink-100 hover:bg-pink-200 text-pink-500 border-pink-500'
        }
      `}
    >
      {isGenerating ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Generating...
        </>
      ) : (
        'Generate Commit'
      )}
    </button>
  );
}
