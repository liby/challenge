import { useState } from "react";

export const CopyButton = ({ commitMessage }: { commitMessage: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-4">
    <pre className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm font-mono">
      {commitMessage}
    </pre>
    <div className="flex justify-end">
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(commitMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        }}
        className={`
          font-semibold py-2 px-4 rounded-lg border transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50
          active:scale-95
          ${copied
            ? 'bg-green-100 text-green-600 border-green-500 hover:bg-green-200'
            : 'bg-pink-100 text-pink-500 border-pink-500 hover:bg-pink-200'
          }
        `}
        disabled={copied}
        aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
        tabIndex={0}
      >
        <span className="flex items-center gap-2">
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </>
          )}
          </span>
        </button>
      </div>
    </div>
  )
};
