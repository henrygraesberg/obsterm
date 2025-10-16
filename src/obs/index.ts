import { OBSWebSocket } from "obs-websocket-js"

const obs = new OBSWebSocket()
	
await obs.connect("ws://10.0.0.83:4455", "XTTCTf9fUqdHZl7z")

const closeObs = () => obs.disconnect

export { obs, closeObs }
