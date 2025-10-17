import { useGetScenes, type Scene } from "../obs/use-get-scenes"
import { closeObs } from "../obs"
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
	const [selectedSceneId, setSelectedSceneId] = useState<string | undefined>("")

	const { scenes, currentSceneId, refetchScenes } = useGetScenes()

	useEffect(() => {
		refetchScenes()
		const interval = setInterval(refetchScenes, 2000)
		return () => clearInterval(interval)
	}, [refetchScenes])

	useEffect(() => {
		setSelectedSceneId(currentSceneId as string)
	}, [currentSceneId])

	useKeyboard((key) => {
		switch (key.name) {
			case "escape":
				closeObs()
				process.exit(0)
				break
			case "up":
				setSelectedSceneId(scenes[getPrevScene(scenes, selectedSceneId)]?.sceneUuid)
				break
			case "down":
				setSelectedSceneId(scenes[getNextScene(scenes, selectedSceneId)]?.sceneUuid)
				break
			case "return":
				// Todo: Set scene to the selected one
				break
			default:
				break
		}
	})

	return (
		<box alignItems="center" justifyContent="center" flexGrow={1}>
			<box justifyContent="center" alignItems="flex-end">
				<ascii-font font="tiny" text="OBSTerm" />
				{scenes.map((s) => (
					<text
						key={s.sceneUuid}
						attributes={
							s.sceneUuid === selectedSceneId
								? TextAttributes.BOLD
								: TextAttributes.DIM
						}
					>
						{s.sceneUuid === currentSceneId ? <span attributes={TextAttributes.DIM}><strong>Active &gt;</strong> </span> : ""}{`${s.sceneIndex + 1}: ${s.sceneName}`}
					</text>
				))}
			</box>
		</box>
	)
}
