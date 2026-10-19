import React, { createContext, useContext, useState, useCallback } from "react";
import { loadProjects, saveProjects } from "../data/projectsData";

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
  const [data, setData] = useState(() => loadProjects());

  const update = useCallback((newData) => {
    setData(newData);
    saveProjects(newData);
  }, []);

  return (
    <ProjectsContext.Provider value={{ data, update }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used inside ProjectsProvider");
  return ctx;
}
