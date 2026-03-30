import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NodeTree } from './NodeTree';
import { FinancialNode } from '@/lib/finance/models';

describe('NodeTree Component', () => {
  it('should render the root node', () => {
    const rootNode = new FinancialNode({
      id: 'root',
      name: 'Present',
      date: new Date(),
      assets: [],
      expenses: []
    });

    render(<NodeTree nodes={[rootNode]} />);
    
    expect(screen.getByText('Present')).toBeInTheDocument();
  });

  it('should render multiple nodes in the tree', () => {
    const nodes = [
      new FinancialNode({ id: 'root', name: 'Present', date: new Date(), assets: [], expenses: [] }),
      new FinancialNode({ id: 'node1', name: 'Future Event', date: new Date(), assets: [], expenses: [], parentId: 'root' })
    ];

    render(<NodeTree nodes={nodes} />);
    
    expect(screen.getByText('Present')).toBeInTheDocument();
    expect(screen.getByText('Future Event')).toBeInTheDocument();
  });
});
