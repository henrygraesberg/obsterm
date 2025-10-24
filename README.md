# OBSterm

A TUI for interacting with OBS through OBS websockets, made using TypeScript and openTUI

## Capabilities & planned capabilities

- Switch between active scenes using the terminal, allowing for scene switching from other devices than the one running OBS
	- TODO: Fix bug where selected scene gets set to active scene every refetch

### Planned:
- Toggle visibility of scene elements in the active scene
- Start and stop stream and recording
- Mute and unmute audio sources

## Prerequisites

- [Bun](https://bun.com/)

## Running the interface

```bash
bun install
bun run .
```

This will open the connection screen allowing you to connect to the OBS websocket from the TUI. To skip this login screen, the environment variables ```OBS_WS_URL``` and ```OBS_WS_PASSWORD``` can be set. If these are present, the tool will attempt to connect to the websocket and send you to the scene management page instantly.

Example:
```bash
OBS_WS_URL=192.168.0.111:4455 OBS_WS_PASSWORD=xxxxxxxxxxxxxxxx bun run .
```
