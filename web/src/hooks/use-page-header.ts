import { useEffect } from "react";
import { useHeaderStore } from "@/store/use-header-store";

/**
 * Helper hook to set the page header from any component.
 */
export function usePageHeader(config: { title: string; description?: string; headerChildren?: React.ReactNode }) {
  const setHeader = useHeaderStore((state) => state.setHeader);
  const clearHeader = useHeaderStore((state) => state.clearHeader);

  useEffect(() => {
    setHeader(config);
    return () => clearHeader();
  }, [config.title, config.description, config.headerChildren, setHeader, clearHeader]);
}
