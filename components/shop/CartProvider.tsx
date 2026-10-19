"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type PreOrderLine = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

/** @deprecated Use PreOrderLine */
export type CartLine = PreOrderLine;

type PreOrderContextValue = {
  items: PreOrderLine[];
  count: number;
  subtotal: number;
  addItem: (item: Omit<PreOrderLine, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const PreOrderContext = createContext<PreOrderContextValue | null>(null);
const STORAGE_KEY = "pml-preorder";
const LEGACY_STORAGE_KEY = "foodtuck-cart";
const EMPTY: PreOrderLine[] = [];

let memoryCart: PreOrderLine[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function readStorage(): PreOrderLine[] {
  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as PreOrderLine[];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  memoryCart = readStorage();
  hydrated = true;
}

function subscribe(listener: () => void) {
  ensureHydrated();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  ensureHydrated();
  return memoryCart;
}

function getServerSnapshot() {
  return EMPTY;
}

function commit(next: PreOrderLine[]) {
  memoryCart = next;
  hydrated = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    /* ignore quota errors */
  }
  emit();
}

export function PreOrderProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback(
    (item: Omit<PreOrderLine, "quantity">, quantity = 1) => {
      const current = getSnapshot();
      const existing = current.find((line) => line.id === item.id);
      if (existing) {
        commit(
          current.map((line) =>
            line.id === item.id
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          ),
        );
        return;
      }
      commit([...current, { ...item, quantity }]);
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    commit(getSnapshot().filter((line) => line.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      commit(getSnapshot().filter((line) => line.id !== id));
      return;
    }
    commit(
      getSnapshot().map((line) =>
        line.id === id ? { ...line, quantity } : line,
      ),
    );
  }, []);

  const clear = useCallback(() => commit(EMPTY), []);

  const value = useMemo<PreOrderContextValue>(() => {
    const count = items.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = items.reduce(
      (sum, line) => sum + line.price * line.quantity,
      0,
    );
    return {
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clear,
    };
  }, [items, addItem, removeItem, setQuantity, clear]);

  return (
    <PreOrderContext.Provider value={value}>{children}</PreOrderContext.Provider>
  );
}

/** @deprecated Use PreOrderProvider */
export const CartProvider = PreOrderProvider;

export function usePreOrder() {
  const ctx = useContext(PreOrderContext);
  if (!ctx) {
    throw new Error("usePreOrder must be used within PreOrderProvider");
  }
  return ctx;
}

/** @deprecated Use usePreOrder */
export function useCart() {
  return usePreOrder();
}
