import { useState } from "react";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { NodeTree } from "./components/finance/NodeTree";
import { FinancialNode } from "./lib/finance/models";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  const [nodes, setNodes] = useState<FinancialNode[]>([
    new FinancialNode({
      id: "root",
      name: "Present",
      date: new Date(),
      assets: [],
      expenses: [],
    }),
  ]);

  const handleAddNode = (newNode: FinancialNode) => {
    setNodes([...nodes, newNode]);
  };

  return (
    // <SidebarProvider>
    //   <AppSidebar>
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Prosper Financial Planner
      </h1>
      <NodeTree nodes={nodes} onAddNode={handleAddNode} />
    </div>
    //   </AppSidebar>
    // </SidebarProvider>
  );
}

export default App;
