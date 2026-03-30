import { FinancialNode } from './models';

export class FinancialTree {
  private nodes: Map<string, FinancialNode> = new Map();
  private children: Map<string, string[]> = new Map();

  constructor(rootNode: FinancialNode) {
    this.addNodeInternal(rootNode);
  }

  addNode(node: FinancialNode) {
    if (!node.parentId) {
      throw new Error('Node must have a parentId except for root');
    }
    if (!this.nodes.has(node.parentId)) {
      throw new Error(`Parent node ${node.parentId} not found`);
    }
    this.addNodeInternal(node);
  }

  private addNodeInternal(node: FinancialNode) {
    this.nodes.set(node.id, node);
    if (node.parentId) {
      const currentChildren = this.children.get(node.parentId) ?? [];
      this.children.set(node.parentId, [...currentChildren, node.id]);
    }
  }

  getNodes(): FinancialNode[] {
    return Array.from(this.nodes.values());
  }

  getChildren(nodeId: string): FinancialNode[] {
    const childIds = this.children.get(nodeId) ?? [];
    return childIds
      .map(id => this.nodes.get(id))
      .filter((node): node is FinancialNode => !!node);
  }

  getNode(nodeId: string): FinancialNode | undefined {
    return this.nodes.get(nodeId);
  }

  getPathTo(nodeId: string): FinancialNode[] {
    const path: FinancialNode[] = [];
    let currentId: string | undefined = nodeId;

    while (currentId) {
      const node = this.nodes.get(currentId);
      if (!node) break;
      path.unshift(node);
      currentId = node.parentId;
    }

    return path;
  }
}
