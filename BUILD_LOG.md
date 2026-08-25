# Build Log

## Session 1
- Defined the game direction as a portrait mobile Three.js survival and resource-management prototype.
- Planned the supernatural spirit-separation premise, Grandma's house hub, and three-stone ritual progression with AI assistance.
- Added a simple home base ground plane to make the current prototype play area readable.
- Created a Blender-friendly OBJ base layout template with home ground, center base circle, and six ritual markers on a perfect circular ring.
- Updated the runtime scene to load the Blender-edited base_layout.obj as the home/base layout.
- Replaced the controllable player sprite with the local soul-hero.png asset and added left/right facing flip behavior.
- Removed the temporary zoom button and moved the virtual joystick upward for better mobile thumb placement.
- Added player movement limits so the soul stays on the home ground and cannot enter the ritual center.
- Tuned the camera toward a Cult of the Lamb-style fixed elevated perspective with the player framed lower and more ritual space visible ahead.
- Updated the Blender base layout asset and adjusted the runtime loader for centimeter-scale OBJ exports and updated floor bounds.
- Replaced the base layout export and restored direct game-scale OBJ loading for the updated Maya/layout asset.
- Adjusted camera framing to reduce vertical stretch and make the home scene feel larger on mobile.
- Added the sleeping body PNG as a center ritual plane and hid temporary middle body/block layout meshes.
- Updated base_layout.obj again, removing the extra base circle and mapping the new base_of_house mesh into the scene material setup.
- Added base.fbx as a source environment asset; runtime still uses OBJ until a browser-ready GLB/OBJ export is provided.
