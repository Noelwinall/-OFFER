import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface LayoutContextValue {
  isFullBleed: boolean;
  setFullBleed: (value: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isFullBleed, setIsFullBleed] = useState(false);

  const setFullBleed = useCallback((value: boolean) => {
    setIsFullBleed(value);
  }, []);

  return (
    <LayoutContext.Provider value={{ isFullBleed, setFullBleed }}>
      {children}
    </LayoutContext.Provider>
  );
}

/**
 * Hook to access layout context.
 * Use setFullBleed(true) in pages that need full-width layout (e.g., Map).
 */
export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
}

/**
 * Hook to mark a page as full-bleed (no max-width constraint).
 * Call this in useEffect at the top of your component.
 *
 * @example
 * function MapPage() {
 *   useFullBleed();
 *   return <View>...</View>;
 * }
 */
export function useFullBleed() {
  const { setFullBleed } = useLayout();

  // Set fullBleed on mount, reset on unmount
  useState(() => {
    setFullBleed(true);
    return () => setFullBleed(false);
  });
}
