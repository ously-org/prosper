import { describe, it, expect } from 'vitest';
import { FinancialTree } from './tree';
import { FinancialNode } from './models';

describe('FinancialTree', () => {
  it('should add a child node to a parent', () => {
    const root = new FinancialNode({ id: 'root', name: 'Present', date: new Date(), assets: [], expenses: [] });
    const tree = new FinancialTree(root);
    
    const child = new FinancialNode({ id: 'node1', name: 'Car', date: new Date(), assets: [], expenses: [], parentId: 'root' });
    tree.addNode(child);
    
    expect(tree.getNodes()).toContain(child);
    expect(tree.getChildren('root')).toContain(child);
  });

  it('should throw error if parent does not exist', () => {
    const root = new FinancialNode({ id: 'root', name: 'Present', date: new Date(), assets: [], expenses: [] });
    const tree = new FinancialTree(root);
    
    const child = new FinancialNode({ id: 'node1', name: 'Car', date: new Date(), assets: [], expenses: [], parentId: 'non-existent' });
    
    expect(() => tree.addNode(child)).toThrow('Parent node non-existent not found');
  });
});
