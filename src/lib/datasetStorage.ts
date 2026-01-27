import type { DataRow } from "@/types/data";

const STORAGE_KEY = "data-hub-dataset";

export interface StoredDataset {
  data: DataRow[];
  fileName: string;
}

function isValidDataset(raw: unknown): raw is StoredDataset {
  if (!raw || typeof raw !== "object") return false;
  const o = raw as Record<string, unknown>;
  if (!Array.isArray(o.data) || typeof o.fileName !== "string") return false;
  if (o.data.length === 0) return false;
  const row = o.data[0];
  if (!row || typeof row !== "object") return false;
  return true;
}

export function saveDataset(data: DataRow[], fileName: string): void {
  try {
    const payload: StoredDataset = { data, fileName };
    const json = JSON.stringify(payload);
    localStorage.setItem(STORAGE_KEY, json);
  } catch (e) {
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      console.warn("[datasetStorage] Quota exceeded, dataset not persisted.");
    } else {
      console.warn("[datasetStorage] Failed to save:", e);
    }
  }
}

export function loadDataset(): StoredDataset | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!isValidDataset(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearDataset(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* no-op */
  }
}
