import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserCredentials } from "../../../../App";

import ListThemesDashboard from './ListThemesDashboard'

export default function ThemesDashboard({ themes, setEditTheme }) {
  const { userCredentials } = useContext(UserCredentials);
  console.log(themes)
  return (
    Object.entries(themes).length > 0
    ? <article>
        <h3 className="refemi">Thèmes en attente</h3>
        {themes.pending.sort((a, b) => a.label.localeCompare(b.label)).map((theme) => (
          <ListThemesDashboard key={uuidv4()} theme={theme} setEditTheme={setEditTheme} />
          ))}
        <h3 className="refemi">Thèmes publiés</h3>
        {themes.active.sort((a, b) => a.label.localeCompare(b.label)).map((theme) => (
          <ListThemesDashboard key={uuidv4()} theme={theme} setEditTheme={setEditTheme} />
        ))}
      </article>
    : <p>Error</p>
  )
}