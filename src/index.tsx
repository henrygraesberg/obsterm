import { render } from "@opentui/react"
import { AppPage } from "./routes/AppPage"
import { useState } from "react"
import { ConnectPage } from "./routes/ConnectPage"

function App() {
	const [connected, setConnected] = useState<boolean>(false)

	return (
		<box alignItems="center" justifyContent="center" flexGrow={1}>
			<ascii-font font="tiny" text="OBSTerm" />
			{connected ? (
				<AppPage />
			) : (
				<ConnectPage onConnect={() => setConnected(true)} />
			)}
		</box>
	)
}

render(<App />)
