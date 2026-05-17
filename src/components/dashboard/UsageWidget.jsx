const UsageWidget = ({ usage }) => {
  if (!usage) return null;

  const { kb_files, vocab_terms, notes } = usage;
  const percentage = kb_files?.percentage || 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
      <h3 className="text-sm font-semibold text-gray-900 mb-5">Usage</h3>

      <div className="flex flex-col gap-5">
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-500 font-medium">Knowledge Base Files</span>
            <span className="text-gray-900 font-semibold">
              {kb_files?.used} / {kb_files?.limit}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">{percentage}% used</p>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-medium">Vocab Terms</span>
            <span className="text-sm text-gray-900 font-semibold">{vocab_terms}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-medium">Notes</span>
            <span className="text-sm text-gray-900 font-semibold">{notes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageWidget;
