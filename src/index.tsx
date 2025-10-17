import { render } from "@opentui/react"
import { AppPage } from "./routes/AppPage"
import { useState } from "react"
import { ConnectPage } from "./routes/ConnectPage"

function App() {
	const [connected, setConnected] = useState<boolean>(false)

	if (!connected) {
		return (
			<ConnectPage
				onConnect={() => {
					setConnected(true)
				}}
			/>
		)
	}

	return <AppPage />
}

render(<App />)
