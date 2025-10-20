import { useCallback, useState } from "react"
import { obs } from "."

export type Scene = {
	sceneIndex: number
	sceneName: string
	sceneUuid: string
}

export const useGetScenes = () => {
	const [scenes, setScenes] = useState<Scene[]>([])
	const [currentSceneId, setCurrentScene] = useState<string>()

	const refetchScenes = useCallback(async () => {
		const response = await obs.call("GetSceneList")
		setScenes(response.scenes as Scene[])
		setCurrentScene(response.currentProgramSceneUuid)
	}, [])

	return { scenes, currentSceneId, refetchScenes, setCurrentScene }
}
