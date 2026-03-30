# Implementation Plan: core_logic_ui_20260330

## Phase 1: Core Financial Planning Engine [checkpoint: d6be1a1]

- [x] **Task: Phase 1.1: Core Data Models** [6834afb]
    - [x] Write unit tests for financial asset, expense, and growth rate data structures.
    - [x] Implement TypeScript interfaces and classes for Assets, Expenses, and Growth Rates.
    - [x] Verify models correctly handle various asset types (Stocks, Cash, Real Estate).
- [x] **Task: Phase 1.2: Single-Branch Projection Engine** [44d8b90]
    - [x] Write unit tests for a 10-year projection with compound growth.
    - [x] Implement the core projection function to calculate net worth over time.
    - [x] Verify accuracy against a set of baseline financial scenarios.
- [x] **Task: Phase 1.3: Multi-Year Simulation Logic** [a09f347]
    - [x] Write unit tests for a 50-year simulation including recurring expenses and inflation.
    - [x] Extend the engine to handle long-term projections and real-time environment variables (e.g., ROI).
    - [x] Verify the engine can handle custom growth rates per asset type.
- [x] **Task: Conductor - User Manual Verification 'Phase 1: Financial Engine' (Protocol in workflow.md)** [d6be1a1]

## Phase 2: Node Tree & Branching UI

- [x] **Task: Phase 2.1: Basic Node Tree Visualization** [8f14597]
    - [x] Write component tests for the graphical node tree using shadcn/ui and a graph visualization library.
    - [x] Implement the Root Node (The Present) and basic branching visualization.
    - [x] Verify nodes are rendered correctly and sorted by date.
- [ ] **Task: Phase 2.2: Node Creation & Linking**
    - [ ] Write unit tests for adding Action Nodes and linking them within the tree structure.
    - [ ] Implement a modal/form for adding financial actions (e.g., "Change Career").
    - [ ] Verify nodes can be successfully added to any branch in the tree.
- [ ] **Task: Phase 2.3: Scenario Branching Logic (Forking)**
    - [ ] Write unit tests for the "Fork" functionality, creating a new scenario from any node.
    - [ ] Implement logic to duplicate and modify a branch to create a parallel financial scenario.
    - [ ] Verify that changes in a branch only affect its downstream nodes and do not impact other branches.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Node Tree UI' (Protocol in workflow.md)**

## Phase 3: Goal Tracking & Summaries

- [ ] **Task: Phase 3.1: Goal Tracking System**
    - [ ] Write unit tests for the three goal types: Fixed Date, Action-Based, and Measured.
    - [ ] Implement the core goal logic and the visual progress markers in the tree.
    - [ ] Verify goals correctly trigger based on node events or financial conditions.
- [ ] **Task: Phase 3.2: Outcome Summary Table**
    - [ ] Write component tests for the real-time outcome summary table.
    - [ ] Implement the UI table that displays key financial metrics for the selected branch.
    - [ ] Verify the table updates instantly as nodes or branches are modified.
- [ ] **Task: Phase 3.3: End-to-End Simulation Integration**
    - [ ] Write integration tests for a complete planning flow: Create Root -> Add Node -> Fork Branch -> Check Goal Status.
    - [ ] Fine-tune the simulation performance and data-rich aesthetics.
    - [ ] Verify the entire planning and branching experience works as specified.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Goal Tracking & Summaries' (Protocol in workflow.md)**
