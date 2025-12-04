import { LuUndo, LuRedo, LuRotateCw, LuTrash2 } from "react-icons/lu";

interface ToolbarProps {
  mode: "edit" | "command";
  onModeChange: (mode: "edit" | "command") => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  hasSelectedNode: boolean;
  onRotate: () => void;
  hasSelectedElement: boolean;
  onDelete: () => void;
}

const Toolbar = ({
  mode,
  onModeChange,
  isSidebarOpen,
  setIsSidebarOpen,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  hasSelectedNode,
  onRotate,
  hasSelectedElement,
  onDelete,
}: ToolbarProps) => {
  const handleToggleMode = () => {
    onModeChange(mode === "edit" ? "command" : "edit");
  };

  return (
    <div className="m-1 flex items-center space-x-1.5 bg-[#a3a3a3]/20 rounded-md py-1 px-1.5">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`p-1 bg-[#044556] cursor-pointer hover:opacity-80 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isSidebarOpen ? "hidden" : ""}`}
        aria-label="Open sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <button
        onClick={handleToggleMode}
        className="px-2 py-1 text-[12px] cursor-pointer font-medium rounded text-white bg-[#044556] hover:opacity-80 transition-colors flex items-center space-x-2"
      >
        {mode === "edit" ? (
          <span>Switch to Command Mode</span>
        ) : (
          <span>Switch to Edit Mode</span>
        )}
      </button>

      {/* Undo Button */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`p-1 rounded transition-colors ${
          canUndo
            ? "hover:bg-[#044556] cursor-pointer text-white"
            : "cursor-not-allowed text-gray-500"
        }`}
        aria-label="Undo (Ctrl+Z)"
        title="Undo (Ctrl+Z)"
      >
        <LuUndo size={16} />
      </button>

      {/* Redo Button */}
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`p-1 rounded transition-colors ${
          canRedo
            ? " hover:bg-[#044556] cursor-pointer text-white"
            : "cursor-not-allowed text-gray-500"
        }`}
        aria-label="Redo (Ctrl+Y)"
        title="Redo (Ctrl+Y)"
      >
        <LuRedo size={16} />
      </button>

      {/* Rotate Button */}
      <button
        onClick={onRotate}
        disabled={!hasSelectedNode}
        className={`p-1 rounded transition-colors ${
          hasSelectedNode
            ? "hover:bg-[#044556] cursor-pointer text-white"
            : "cursor-not-allowed text-gray-500"
        }`}
        aria-label="Rotate Node 90° (R)"
        title="Rotate Node 90° (R)"
      >
        <LuRotateCw size={16} />
      </button>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        disabled={!hasSelectedElement}
        className={`p-1 rounded transition-colors ${
          hasSelectedElement
            ? "hover:bg-red-600 cursor-pointer text-white"
            : "cursor-not-allowed text-gray-500"
        }`}
        aria-label="Delete (Delete/Backspace)"
        title="Delete (Delete/Backspace)"
      >
        <LuTrash2 size={16} />
      </button>
    </div>
  );
};

export default Toolbar;
