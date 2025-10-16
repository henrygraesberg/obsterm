import { useState } from "react"
import { TextAttributes } from "@opentui/core";
import { render, useKeyboard } from "@opentui/react";
import { useGetScenes } from "./obs/use-get-scenes";
import { closeObs } from "./obs";

function App() {
  const {scenes, currentSceneId, refetchScenes} = useGetScenes()
  const [extraMessage, setExtraMessage] = useState<string>("")

  useKeyboard((key) => {
    switch (key.name) {
      case "escape":
        closeObs()
        process.exit(0)
      case "space":
        refetchScenes()
        break
      default:
        setExtraMessage(`${key.name} pressed`)
        break
    }
  })

  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box justifyContent="center" alignItems="flex-end">
        <ascii-font font="tiny" text="OpenTUI" />
        <text attributes={TextAttributes.DIM}>{scenes.map((s) => JSON.stringify(s))}</text>
        { extraMessage && <text>{extraMessage}</text> }
      </box>
    </box>
  );
}

render(<App />);
