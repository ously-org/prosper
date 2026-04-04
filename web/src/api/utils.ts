/**
 * Standard delay function to simulate network latency.
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
