import { useGetScenes } from "../obsws/use-get-scenes"
import { closeObs, obs } from "../obsws"
import { useState, useEffect } from "react"
import { useKeyboard } from "@opentui/react"
import { TextAttributes } from "@opentui/core"

export const AppPage = () => {
	const [selectedSceneNumber, setSelectedSceneNumber] = useState<number>(0)

	const { scenes, currentSceneId, refetchScenes, setCurrentScene } =
		useGetScenes()

	useEffect(() => {
		refetchScenes()
		const interval = setInterval(refetchScenes, 2000)
		return () => clearInterval(interval)
	}, [refetchScenes])

	useEffect(() => {
		setSelectedSceneNumber(
			scenes.findIndex((scene) => scene.sceneUuid === currentSceneId),
		)
	}, [scenes, currentSceneId])

	useKeyboard((key) => {
		switch (key.name) {
			case "q":
			case "escape":
				closeObs()
				process.exit(0)
				break
			case "up":
				setSelectedSceneNumber((p) => p - 1)
				break
			case "down":
				setSelectedSceneNumber((p) => p + 1)
				break
			case "return":
				obs.call("SetCurrentProgramScene", {
					sceneUuid: scenes[selectedSceneNumber]?.sceneUuid,
				})
				setCurrentScene(scenes[selectedSceneNumber]?.sceneUuid)
				break
			default:
				break
		}
	})

	return (
		<box justifyContent="center" alignItems="flex-end">
			<text>Scenes</text>
			{scenes.map((s, i) => (
				<text
					key={s.sceneUuid}
					attributes={
						i === selectedSceneNumber ? TextAttributes.BOLD : TextAttributes.DIM
					}
				>
					{s.sceneUuid === currentSceneId ? (
						<span attributes={TextAttributes.DIM}>
							<strong>Active -&gt;</strong>{" "}
						</span>
					) : (
						""
					)}
					{`${s.sceneIndex + 1}: ${s.sceneName}`}
				</text>
			))}
		</box>
	)
}
