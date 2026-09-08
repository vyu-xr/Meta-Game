# Offline Play

Open `index.html` directly in a browser. Keep `assets/` and `vendor/` beside it. No installation, server, or internet connection is required. Music may require a tap before playback.

The direct-file version uses `assets/offline-data.js` for scene meshes, WebGL textures, and map masks because browsers restrict loading these from file URLs. Other images and music remain local files. The server version continues to read the original assets.

After replacing scene OBJs, textures, or adding asset references, rebuild the bundle from the project folder:

```sh
node scripts/build-offline.cjs
```

Include the regenerated `assets/offline-data.js` when sharing the game. Do not edit this generated file manually. Refresh the browser after rebuilding.

Game logic remains readable in `index.html`; the bundle contains asset data, not a second copy of the game logic. The script in `scripts/` is a development build tool and is not needed to play.
