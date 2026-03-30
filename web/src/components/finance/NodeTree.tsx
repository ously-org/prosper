import React from 'react';
import { FinancialNode } from '@/lib/finance/models';

interface NodeTreeProps {
  nodes: FinancialNode[];
}

export const NodeTree: React.FC<NodeTreeProps> = ({ nodes }) => {
  return (
    <div className="p-4 bg-slate-900 text-white rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4">Financial Scenario Tree</h2>
      <div className="flex flex-col gap-4">
        {nodes.map((node) => (
          <div 
            key={node.id} 
            className="p-3 bg-slate-800 border border-slate-700 rounded-md shadow-sm hover:border-slate-500 transition-colors"
          >
            <div className="font-semibold">{node.name}</div>
            <div className="text-xs text-slate-400">
              {node.date.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
