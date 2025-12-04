interface ToolbarProps {
  mode: "edit" | "command";
  onModeChange: (mode: "edit" | "command") => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Toolbar = ({
  mode,
  onModeChange,
  isSidebarOpen,
  setIsSidebarOpen,
}: ToolbarProps) => {
  const handleToggleMode = () => {
    onModeChange(mode === "edit" ? "command" : "edit");
  };
  console.log("isSidebarOpen:", isSidebarOpen);

  return (
    <div className="m-1 flex items-center space-x-2 bg-[#a3a3a3]/20 rounded-md py-1 px-1.5">
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
    </div>
  );
};

export default Toolbar;
