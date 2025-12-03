import React, { useState } from "react";
import { HiChevronRight, HiChevronDown, HiOutlineUpload } from "react-icons/hi";
import { TbFileImport, TbFileExport } from "react-icons/tb";
import { AiOutlineClear } from "react-icons/ai";
import { componentsList } from "~/components/sld/componentList";

interface ComponentSidebarProps {
  sidebarWidth: number;
  onClose: () => void;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    data: any
  ) => void;
  selectedTool: string | null;
  setSelectedTool: (tool: string | null) => void;
  onUploadSVG: () => void;
  onClear: () => void;
  onExport: () => void;
  onImport: () => void;
}

export const ComponentSidebar: React.FC<ComponentSidebarProps> = ({
  sidebarWidth,
  onClose,
  onDragStart,
  selectedTool,
  setSelectedTool,
  onUploadSVG,
  onClear,
  onExport,
  onImport,
}) => {
  const [collapsedCategories, setCollapsedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <aside
      className="p-4 overflow-auto bg-white dark:bg-transparent border-r border-[#494949]"
      style={{ width: `${sidebarWidth}px`, flexShrink: 0 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-sm font-bold">Drawing Tools</h1>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 dark:hover:bg-[#044556] rounded cursor-pointer"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pb-4 mb-2 border-b border-gray-200 dark:border-[#494949]">
        <button
          className="cursor-pointer"
          title="Upload SVG"
          onClick={onUploadSVG}
        >
          <HiOutlineUpload className="inline mr-1 text-lg" />
        </button>
        <button
          className="cursor-pointer"
          title="Import File"
          onClick={onImport}
        >
          <TbFileImport className="inline mr-1 text-lg" />
        </button>
        <button
          className="cursor-pointer"
          title="Export File"
          onClick={onExport}
        >
          <TbFileExport className="inline mr-1 text-lg" />
        </button>
        <button className="cursor-pointer" title="Clear" onClick={onClear}>
          <AiOutlineClear className="inline mr-1 text-lg" />
        </button>
      </div>

      {/* Components */}
      <div className="space-y-1">
        {componentsList.map((category) => (
          <div
            key={category.category}
            className="border-b border-gray-200 dark:border-[#494949]"
          >
            <button
              onClick={() => toggleCategory(category.category)}
              className="w-full flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  {collapsedCategories[category.category] ? (
                    <HiChevronRight />
                  ) : (
                    <HiChevronDown />
                  )}
                </span>
                <h3 className="text-xs text-gray-900 dark:text-gray-100">
                  {category.category}
                </h3>
              </div>
            </button>

            {!collapsedCategories[category.category] && (
              <div className="flex flex-row flex-wrap gap-0.5 pl-1 mb-2">
                {category.items.map((component, index) => (
                  <div
                    key={`${category.category}-${component.type}-${index}`}
                    draggable
                    onDragStart={(e) =>
                      onDragStart(e, component.type, component.defaultData)
                    }
                    onClick={() => {
                      // For General category items, set as selected tool
                      if (
                        category.category === "General" &&
                        ["line", "rectangle", "circle", "text"].includes(
                          component.type
                        )
                      ) {
                        setSelectedTool(
                          selectedTool === component.type
                            ? null
                            : component.type
                        );
                      }
                    }}
                    className={`flex flex-row items-center gap-2 rounded cursor-pointer transition-colors ${
                      selectedTool === component.type
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    title={component.label}
                  >
                    <span className="">{component.icon}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
