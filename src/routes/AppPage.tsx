import { useGetScenes, type Scene } from "../obsws/use-get-scenes"
import { closeObs, obs } from "../obsws"
import { useState, useEffect } from "react"
import { useKeyboard } from "@opentui/react"
import { TextAttributes } from "@opentui/core"

const getPrevScene = (scenes: Scene[], selectedSceneId: string | undefined) => {
	const prev = scenes.findIndex((s) => s.sceneUuid == selectedSceneId) - 1

	if (prev <= -1) {
		return scenes.length - 1
	}

	return prev
}

const getNextScene = (scenes: Scene[], selectedSceneId: string | undefined) => {
	const next = scenes.findIndex((s) => s.sceneUuid == selectedSceneId) + 1

	if (next >= scenes.length) {
		return 0
	}

	return next
}

export const AppPage = () => {
	const [selectedSceneNumber, setSelectedSceneNumber] = useState<number>(1)

	const { scenes, currentSceneId, refetchScenes, setCurrentScene } = useGetScenes()

	useEffect(() => {
		refetchScenes()
		const interval = setInterval(refetchScenes, 2000)
		return () => clearInterval(interval)
	}, [refetchScenes])

	useEffect(() => {
		setSelectedSceneNumber(scenes.findIndex((scene) => scene.sceneUuid == currentSceneId))
	}, [currentSceneId])

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
				obs.call("SetCurrentProgramScene", {sceneUuid: scenes[selectedSceneNumber]?.sceneUuid})
				setCurrentScene(scenes[selectedSceneNumber]?.sceneUuid)
				break
			default:
				break
		}
	})

	return (
		<box alignItems="center" justifyContent="center" flexGrow={1}>
			<box justifyContent="center" alignItems="flex-end">
				<ascii-font font="tiny" text="OBSTerm" />
				{scenes.map((s, i) => (
					<text
						key={s.sceneUuid}
						attributes={
							i === selectedSceneNumber
								? TextAttributes.BOLD
								: TextAttributes.DIM
						}
					>
						{s.sceneUuid === currentSceneId ? <span attributes={TextAttributes.DIM}><strong>Active -&gt;</strong> </span> : ""}{`${s.sceneIndex + 1}: ${s.sceneName}`}
					</text>
				))}
			</box>
		</box>
	)
}
