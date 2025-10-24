import { render } from "@opentui/react"
import { AppPage } from "./routes/AppPage"
import { useState, useEffect } from "react"
import { ConnectPage } from "./routes/ConnectPage"
import { connectObs } from "./obsws"

function App() {
	const [connected, setConnected] = useState<boolean>(false)

  useEffect(() => {
    const func = async () => {

      const obs_url = process.env.OBS_WS_URL
      const obs_password = process.env.OBS_WS_PASSWORD || null

      if(obs_url) {
        try {
          await connectObs(obs_url, obs_password)
          setConnected(true)
        } catch (_e) {}
      }
    }

    func()
  }, [])

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
