import { useState } from "react"
import { connectObs } from "../obsws"
import { TextAttributes } from "@opentui/core"
import { useKeyboard } from "@opentui/react"
import clipboard from "clipboardy"

export function ConnectPage({ onConnect }: { onConnect: () => void }) {
	const [address, setAddress] = useState("")
	const [password, setPassword] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [focused, setFocused] = useState<"address" | "password">("address")

	const handleConnect = async () => {
		setLoading(true)
		setError(null)
		try {
			await connectObs(address, password)
			onConnect()
		} catch (err) {
			setError((err as Error).message)
		} finally {
			setLoading(false)
		}
	}

	useKeyboard(async (key) => {
		if ((key.ctrl || key.meta) && key.name === "v") {
			try {
				const text = await clipboard.read()
				if (focused === "address") setAddress((a) => a + text)
				else setPassword((p) => (p == null ? text : p + text))
			} catch (_err) {
				setError("Pasting from clipboard failed - Please insert info manually")
			}
		}

		switch (key.name) {
			case "escape":
				process.exit(0)
				break
			case "tab":
				setFocused((prev) => (prev === "address" ? "password" : "address"))
				break
			case "return":
				await handleConnect()
				break
			default:
				break
		}
	})

	return (
		<box padding={1} alignItems="center">
			<text attributes={TextAttributes.BOLD}>Connect to OBS</text>

			<box flexDirection="column" gap={1}>
				<text>WebSocket URL:</text>
				<input
					value={address}
					onChange={setAddress}
					placeholder="192.168.0.x:4455"
					focused={focused === "address"}
				/>

				<text>Password:</text>
				<input
					value={password === null ? "" : password}
					onChange={setPassword}
					placeholder="Password"
					focused={focused === "password"}
				/>

				{loading && <text>Connecting...</text>}

				{error && <text attributes={TextAttributes.BOLD}>{error}</text>}
			</box>
		</box>
	)
}
