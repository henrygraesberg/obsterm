import { OBSWebSocket } from "obs-websocket-js"

const obs = new OBSWebSocket()

export async function connectObs(address: string, password: string | null) {
	if (password === null && address === "") {
		password = "fMqECcI1TrnxVgWw"
		address = "10.0.0.83:4455"
	}

	if (password === null) {
		await obs.connect(`ws://${address}`)
	} else {
		await obs.connect(`ws://${address}`, password)
	}

	return obs
}

export const closeObs = async () => {
	try {
		await obs.disconnect()
	} catch (_e) {
		// ignore
	}
}

export { obs }
