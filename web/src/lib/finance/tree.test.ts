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

  it('should retrieve the path from root to a specific node', () => {
    const root = new FinancialNode({ id: 'root', name: 'Present', date: new Date(), assets: [], expenses: [] });
    const node1 = new FinancialNode({ id: 'node1', name: 'A', date: new Date(), assets: [], expenses: [], parentId: 'root' });
    const node2 = new FinancialNode({ id: 'node2', name: 'B', date: new Date(), assets: [], expenses: [], parentId: 'node1' });
    
    const tree = new FinancialTree(root);
    tree.addNode(node1);
    tree.addNode(node2);
    
    const path = tree.getPathTo('node2');
    expect(path.map(n => n.id)).toEqual(['root', 'node1', 'node2']);
  });

  it('should support multiple branches from the same parent', () => {
    const root = new FinancialNode({ id: 'root', name: 'Present', date: new Date(), assets: [], expenses: [] });
    const branch1 = new FinancialNode({ id: 'b1', name: 'Path 1', date: new Date(), assets: [], expenses: [], parentId: 'root' });
    const branch2 = new FinancialNode({ id: 'b2', name: 'Path 2', date: new Date(), assets: [], expenses: [], parentId: 'root' });
    
    const tree = new FinancialTree(root);
    tree.addNode(branch1);
    tree.addNode(branch2);
    
    expect(tree.getChildren('root')).toHaveLength(2);
    expect(tree.getPathTo('b1').map(n => n.id)).toEqual(['root', 'b1']);
    expect(tree.getPathTo('b2').map(n => n.id)).toEqual(['root', 'b2']);
  });
});
