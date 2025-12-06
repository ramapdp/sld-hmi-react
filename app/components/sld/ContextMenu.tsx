import { useEffect } from "react";
import { LuCopy, LuScissors, LuClipboard, LuCopyPlus, LuTrash2, LuLock, LuLockOpen, LuFolderInput, LuFolderOutput } from "react-icons/lu";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onCopy?: () => void;
  onCut?: () => void;
  onPaste?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onGroup?: () => void;
  onUngroup?: () => void;
  onLockPosition?: () => void;
  onUnlockPosition?: () => void;
  hasClipboard?: boolean;
  hasSelection?: boolean;
  hasGroup?: boolean;
  hasLockedNodes?: boolean;
}

export const ContextMenu = ({
  x,
  y,
  onClose,
  onCopy,
  onCut,
  onPaste,
  onDuplicate,
  onDelete,
  onGroup,
  onUngroup,
  onLockPosition,
  onUnlockPosition,
  hasClipboard = false,
  hasSelection = false,
  hasGroup = false,
  hasLockedNodes = false,
}: ContextMenuProps) => {
  useEffect(() => {
    const handleClickOutside = () => onClose();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div
      className="fixed bg-white dark:bg-[#2d2d2d] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 min-w-[200px]"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Copy */}
      {hasSelection && onCopy && (
        <button
          onClick={() => handleAction(onCopy)}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
        >
          <LuCopy size={16} />
          Copy
          <span className="ml-auto text-xs text-gray-400">Ctrl+C</span>
        </button>
      )}

      {/* Cut */}
      {hasSelection && onCut && (
        <button
          onClick={() => handleAction(onCut)}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
        >
          <LuScissors size={16} />
          Cut
          <span className="ml-auto text-xs text-gray-400">Ctrl+X</span>
        </button>
      )}

      {/* Paste */}
      {hasClipboard && onPaste && (
        <button
          onClick={() => handleAction(onPaste)}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
        >
          <LuClipboard size={16} />
          Paste
          <span className="ml-auto text-xs text-gray-400">Ctrl+V</span>
        </button>
      )}

      {/* Duplicate */}
      {hasSelection && onDuplicate && (
        <button
          onClick={() => handleAction(onDuplicate)}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
        >
          <LuCopyPlus size={16} />
          Duplicate
          <span className="ml-auto text-xs text-gray-400">Ctrl+D</span>
        </button>
      )}

      {(hasSelection || hasClipboard) && <div className="border-t border-gray-200 dark:border-gray-600 my-1" />}

      {/* Group */}
      {hasSelection && onGroup && (
        <button
          onClick={() => handleAction(onGroup)}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
        >
          <LuFolderInput size={16} />
          Group
          <span className="ml-auto text-xs text-gray-400">Ctrl+G</span>
        </button>
      )}

      {/* Ungroup */}
      {hasGroup && onUngroup && (
        <button
          onClick={() => handleAction(onUngroup)}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
        >
          <LuFolderOutput size={16} />
          Ungroup
          <span className="ml-auto text-xs text-gray-400">Ctrl+Shift+G</span>
        </button>
      )}

      {(hasSelection || hasGroup) && <div className="border-t border-gray-200 dark:border-gray-600 my-1" />}

      {/* Lock/Unlock Position */}
      {hasSelection && (
        <>
          {!hasLockedNodes && onLockPosition && (
            <button
              onClick={() => handleAction(onLockPosition)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <LuLock size={16} />
              Lock Position
              <span className="ml-auto text-xs text-gray-400">Ctrl+L</span>
            </button>
          )}
          {hasLockedNodes && onUnlockPosition && (
            <button
              onClick={() => handleAction(onUnlockPosition)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <LuLockOpen size={16} />
              Unlock Position
              <span className="ml-auto text-xs text-gray-400">Ctrl+Shift+L</span>
            </button>
          )}
        </>
      )}

      {hasSelection && <div className="border-t border-gray-200 dark:border-gray-600 my-1" />}

      {/* Delete */}
      {hasSelection && onDelete && (
        <button
          onClick={() => handleAction(onDelete)}
          className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600 dark:text-red-400"
        >
          <LuTrash2 size={16} />
          Delete
          <span className="ml-auto text-xs text-red-400">Del</span>
        </button>
      )}
    </div>
  );
};
