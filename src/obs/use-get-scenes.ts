import { useState } from "react"
import { obs } from "./index"

export const useGetScenes = () => {
	const [scenes, setScenes] = useState<Object[]>([])
	const [currentSceneId, setCurrentScene] = useState<string>()

	const refetchScenes = async () => {
		const response = await obs.call("GetSceneList")

		setScenes(response.scenes)

		setCurrentScene(response.currentProgramSceneUuid)
	}	

	return {scenes, currentSceneId, refetchScenes}
}
