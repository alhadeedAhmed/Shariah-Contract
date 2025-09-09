import { createContext, useContext, useMemo, useState } from "react";

export type MurabahahStatus = {
  scholar: "queued" | "in_review" | "approved";
  finance: "queued" | "in_review" | "offer";
};

export type MusharakahStatus = {
  partners: "queued" | "approving" | "approved";
  scholar: "queued" | "in_review" | "approved";
  finance: "queued" | "in_review" | "offer";
  legal?: "queued" | "in_review" | "approved";
};

export type Application =
  | {
      id: string;
      type: "murabahah";
      status: MurabahahStatus;
    }
  | {
      id: string;
      type: "musharakah";
      status: MusharakahStatus;
    };

type AppStoreType = {
  applications: Application[];
  createMurabahahApplication: () => Application;
  createMusharakahApplication: () => Application;
  updateApplication: (id: string, partial: Partial<Application>) => void;
};

const AppStore = createContext<AppStoreType | undefined>(undefined);

export const AppStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const raw = localStorage.getItem("applications");
      return raw ? (JSON.parse(raw) as Application[]) : [];
    } catch {
      return [];
    }
  });

  const createMurabahahApplication = (): Application => {
    const app: Application = {
      id: `${Date.now()}`,
      type: "murabahah",
      status: { scholar: "queued", finance: "queued" },
    };
    setApplications((prev) => [app, ...prev]);
    try {
      localStorage.setItem(
        "applications",
        JSON.stringify([app, ...applications])
      );
    } catch {}
    return app;
  };

  const createMusharakahApplication = (): Application => {
    const app: Application = {
      id: `${Date.now()}`,
      type: "musharakah",
      status: {
        partners: "queued",
        scholar: "queued",
        finance: "queued",
        legal: "queued",
      },
    };
    setApplications((prev) => [app, ...prev]);
    try {
      localStorage.setItem(
        "applications",
        JSON.stringify([app, ...applications])
      );
    } catch {}
    return app;
  };

  const updateApplication = (id: string, partial: Partial<Application>) => {
    setApplications((prev) => {
      const next = prev.map((a) =>
        a.id === id
          ? {
              ...a,
              ...partial,
              status: { ...a.status, ...(partial as any).status },
            }
          : a
      );
      try {
        localStorage.setItem("applications", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const value = useMemo(
    () => ({
      applications,
      createMurabahahApplication,
      createMusharakahApplication,
      updateApplication,
    }),
    [applications]
  );

  return <AppStore.Provider value={value}>{children}</AppStore.Provider>;
};

export const useAppStore = () => {
  const ctx = useContext(AppStore);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
};
