import React from 'react';
import { FinancialNode } from '@/lib/finance/models';
import { NodeForm } from './NodeForm';

interface NodeTreeProps {
  nodes: FinancialNode[];
  onAddNode?: (node: FinancialNode) => void;
}

export const NodeTree: React.FC<NodeTreeProps> = ({ nodes, onAddNode }) => {
  // Sort nodes by depth or date
  // For now, let's just use a simple recursive renderer if we want a tree
  const rootNodes = nodes.filter(n => !n.parentId);

  const renderNode = (node: FinancialNode, depth = 0) => {
    const children = nodes.filter(n => n.parentId === node.id);
    
    return (
      <div key={node.id} style={{ marginLeft: `${depth * 20}px` }} className="mb-2">
        <div className="p-3 bg-slate-800 border border-slate-700 rounded-md shadow-sm hover:border-slate-500 transition-colors flex justify-between items-center group">
          <div>
            <div className="font-semibold">{node.name}</div>
            <div className="text-xs text-slate-400">
              {node.date.toLocaleDateString()}
            </div>
          </div>
          {onAddNode && (
            <NodeForm parentId={node.id} onAddNode={onAddNode} />
          )}
        </div>
        {children.length > 0 && (
          <div className="mt-2">
            {children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Financial Scenario Tree</h2>
      </div>
      <div className="flex flex-col">
        {rootNodes.map(root => renderNode(root))}
      </div>
    </div>
  );
};
