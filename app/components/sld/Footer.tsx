import type { Edge, Node } from "reactflow";

type FooterProps = {
  nodes: Node[];
  edges: Edge[];
};

const Footer = ({ nodes, edges }: FooterProps) => {
  return (
    <footer>
      <div className="p-2 border-t border-gray-200 dark:border-gray-700 h-fit flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 HMI SLD Application
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Nodes: {nodes.length} | Edges: {edges.length}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
