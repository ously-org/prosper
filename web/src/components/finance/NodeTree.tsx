import React from 'react';
import { FinancialNode } from '@/lib/finance/models';
import { NodeForm } from './NodeForm';

interface NodeTreeProps {
  nodes: FinancialNode[];
  onAddNode?: (node: FinancialNode) => void;
}

export const NodeTree: React.FC<NodeTreeProps> = ({ nodes, onAddNode }) => {
  return (
    <div className="p-4 bg-slate-900 text-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Financial Scenario Tree</h2>
      </div>
      <div className="flex flex-col gap-4">
        {nodes.map((node) => (
          <div 
            key={node.id} 
            className="p-3 bg-slate-800 border border-slate-700 rounded-md shadow-sm hover:border-slate-500 transition-colors flex justify-between items-center"
          >
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
        ))}
      </div>
    </div>
  );
};
