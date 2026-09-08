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
- Added base.glb as the primary environment layout and implemented a small local GLB mesh loader with OBJ fallback.
- Tried a steeper perspective camera pass with FOV 24, height 30, back distance 22, and look-ahead 1.5.
- Moved the camera closer so the scene reads about 15% larger on mobile and slightly increased the sleeping body plane scale.
- Tuned scale by moving the camera 5% farther out and reducing the controllable soul sprite height by 10%.
- Tested adaptive mobile FOV camera values with FOV 36/34/32, height 20, back distance 14.1, and look-ahead 2.0.
- Reduced soul movement speed and dash multiplier to improve mobile control feel.
- Moved the camera closer so the scene appears about 7% larger while keeping the soul sprite size unchanged.
- Replaced the flat black background with a dark red radial gradient for a stronger supernatural night atmosphere.
- Created base-main.glb as a named main base scene asset from the current base GLB.
- Replaced the runtime base environment with base upgrade.obj and generated the ritual ring in code for the updated layout.
- Hid the visible home ground mesh while keeping the same movement bounds for the soul.
- Added a player collider for the straight back wall in the base_ground mesh so the soul cannot pass through it.
- Updated the base upgrade environment OBJ/MTL with the latest exported layout asset.
- Applied the base ground texture asset to the base_ground mesh and extended the OBJ loader to read UV coordinates.
- Corrected the base ground texture orientation by using the exported OBJ V coordinate directly.
- Updated the base environment export, mapped base_underground to the ground texture, and skipped newly named disabled helper meshes.
- Set the soul's starting position to the player_spown_area(disable_mesh) marker from the base environment OBJ.
- Aligned the generated ritual ring radius/center and sleeping body protection position to the latest base OBJ markers.
- Added the home lobby OBJ scene as a second local environment and wired the basement exit collider to switch scenes.
- Tuned night enemy spirits to spawn from left/right/bottom only, reduced their size, slowed movement, and increased spawn spacing.
- Added slash attack VFX with a white arc and small hit burst particles when spirits are destroyed.
- Tightened the slash VFX so it appears close to the soul as a left-to-right curved swipe instead of a distant wave.
- Changed slash combat from a circular area hit to a joystick-directed cone and rotated the slash VFX toward movement direction.
- Replaced the procedural slash arc with the 9-frame slash.png spritesheet and sped up the slash animation timing.
- Added subtle soul wobble and a quick slash pose with lean, squash/stretch, and forward nudge during attacks.
- Reduced soul wobble and slash lean, removed slash forward nudge, and stopped shadow slash scaling.
- Further reduced the slash lean and slash squash/stretch on the soul sprite.
- Re-applied combat notes: shorter three-hit slash combo, enemy HP/knockback, slash recovery, and ghost windup telegraphs.
- Added enemy body collision so the soul cannot overlap ghosts during normal movement, while dash attacks still pass through for hits.
- Tuned soul/enemy collision radius lower and added ghost-to-ghost separation to reduce visual overlap.
- Tuned soul/enemy collision radius lower and added ghost-to-ghost separation to reduce visual overlap.
- Replaced the generated basic ghost texture with the new drifter ghost PNG asset while keeping current ghost behavior.
- Slowed drifter ghost movement and flipped ghost sprites horizontally based on travel direction.
- Reversed drifter ghost horizontal facing so its sprite matches the intended travel direction.
- Removed dash damage from ghosts and increased slash attack gap so combat timing is less spammy.
- Tuned Drifter ritual attacks to warn, deal one damage tick, then pause before the next warning.
- Aligned Drifter ritual attack distance to the shifted ritual center and cancelled attacks when knockback pushes ghosts away.
- Organized ghost definitions into named Drifter and Skitter sections, then switched the active spawned ghost to Skitter.
- Added Skitter-specific zig-zag movement settings and rotate-to-move ghost orientation flags.
- Gave Skitter a zig-zag chase path and rotated its bullet-like sprite toward its travel direction.
- Updated Skitter ritual behavior so it damages the circle twice, then destroys itself automatically.
- Sharpened Skitter zig-zag movement with wider dart lanes and corrected its bullet-style travel rotation.
- Fixed Skitter facing so its rotated sprite no longer flips left/right during zig-zag turns.
- Increased Skitter zig-zag spacing by about 50%, slightly raised speed, and flipped its travel alignment so the tail trails behind.
- Set Skitter zig-zag spacing to 2 and ritual damage to 2.5 per hit for a higher circle threat.
- Increased Skitter speed to 2.8, zig-zag spacing to 2.2, and added close-range slash forgiveness for point-blank enemies.
- Added short combat camera shake for successful slash hits and ritual circle impacts.
- Increased combat camera shake strength slightly so hit feedback is easier to notice during testing.
- Switched active testing enemy to Stalker, added soul health, and gave Stalker player-targeting attacks that can fail the night.
- Reduced Stalker soul damage from 12 to 5 for gentler player-targeting pressure during testing.
- Switched active testing enemy to Warden, added ritual pressure plus a close-range player area attack with a visible warning circle and cooldown.
- Tuned Warden to feel heavier with a larger player area attack, lower knockback, and uninterruptible area windup while still taking slash damage.
- Made Warden retaliate with its player area attack when slashed, including while pressuring the ritual circle.
- Renamed basement and lobby OBJ helper objects with clearer BASEMENT/LOBBY labels and updated the basement loader to the new environment filename.
- Added a full-screen 2D map overlay using the local map image and opened it from the lobby map collider.
- Updated home lobby collider bounds from the latest export: house exit opens the map, bottom collider returns to basement, and lobby spawn matches its marker.
- Temporarily set the map overlay to open on start for map button placement testing.
- Adjusted temporary map buttons to show the intended travel chain: Home to Shop, Shop to Circus, and Circus to Home.
- Enlarged the temporary Circus map button and nudged it left for placement testing.
- Standardized temporary map buttons to 50px and removed the enlarged Circus button override.
- Nudged the temporary Circus map button inward from the right edge for better spacing.
- Moved the temporary Circus map button to 80% left for placement testing.
- Moved the temporary Circus map button to 87% left for placement testing.
- Moved the temporary Home map button to 58% left and 50% top for placement testing.
- Nudged the temporary Home map button from 58% left to 55% left.
- Switched the temporary map background from lock-all to lock-two while keeping placement-tested buttons.
- Replaced visible map button circles with invisible hit areas and local map indicator stroke/fill images for placement testing.
- Scaled map indicator stroke/fill visuals down by 50% while keeping touch hit areas larger.
- Aligned map fill indicators with the invisible button destinations so selected places fill at the tapped location.
- Moved Circus map indicator and invisible hit area to 84% left and 49% top.
- Moved Circus map indicator and hit area to 83% left and 47% top.
- Converted map indicator images to CSS alpha masks so stroke and fill colors can be tuned in code.
- Tuned map indicator colors to a transparent dark stroke and bright warm parchment fill.
- Retuned map indicator colors to dark ink stroke and pale moon-cyan fill for stronger contrast on the illustrated map.
- Moved Shop map indicator and hit area to 55% left and 73% top.
- Moved Home map indicator and hit area to 55% left and 52% top.
- Moved Circus map indicator and hit area to 82% left and 45% top.
- Nudged Circus map indicator and hit area from 45% top to 46% top.
- Fine-tuned Circus map indicator and hit area to 46.3% top.
- Swapped map indicator back layer to use the fill mask shape as a larger dark shadow behind the active fill.
- Enlarged map indicators by 20% and darkened the back fill layer for stronger contrast.
- Kept active map fill indicators at 25px while leaving the darker back layer at 30px.
- Added black fade transitions for basement/lobby movement and animated map enter/select flow with scale and indicator pop effects.
- Added the shop beach scene OBJ as a map destination, with shop spawn, map-return trigger, and fade-based travel from the map overlay.
- Added the circus scene OBJ as a map destination, with circus spawn, map-return trigger, and separate scene material styling.
- Refreshed the Circus scene asset and increased the map travel zoom animation for stronger destination transitions.
- Added Soul Coin wallet logic: defeated ghosts now award currency, with Drifter set to 2 coins and stronger ghosts worth more.
- Tuned Soul Coin rewards so Drifter/Skitter/Stalker/Warden now award 2/3/4/5 coins.
- Updated the basement layout config from the underground scene markers and added a subtle ritual-only vignette overlay.
- Increased the ritual scene vignette, moved the basement spawn closer to the ritual circle, and added soft white ritual dust particles.
- Reduced the radial background gradient radius by 20 percent to make the ritual scene center glow tighter.
- Darkened the outer ritual background gradient to focus attention on the center ritual area.
- Added the ritual circle PNG as a transparent plane in the basement ritual scene for visual testing.
- Converted the ritual circle test image into procedural Three.js pieces: double rings, six sockets, connector bars, red under-glow, and pulse-ready animation hooks.
- Tuned the procedural ritual circle to use thinner, softer floor-like strokes, smaller sockets, shorter connector bars, and a subtler red under-glow.
- Removed procedural ritual connector bars and darkened the socket fill circles for a cleaner floor-mark look.
- Added fire pot props to the three candle sockets with subtle dark floor-shadow overlays and light idle bobbing.
- Added fire pot sprites to the three candle sockets with darker floor-shadow overlays and subtle billboard bobbing.
- Hid the yellow/blue OBJ candle and stone placement marker boxes while keeping the procedural ritual node circles visible.
- Reduced the procedural ritual circle size and thinned the ring/socket strokes for a cleaner floor-mark scale.
- Reduced the controllable soul character size by 10 percent for better ritual-scene scale.
- Saved the current approved main camera angle and follow settings in CAMERA_REFERENCE.md.
- Added a test TALK button that smoothly toggles a 15 percent closer cinematic dialogue camera and locks player movement while active.
- Added a night-start intro cinematic: black opening, close ritual/body camera on glowing eyes, pullback, soul reveal, and handoff to normal follow camera before enemies spawn.
- Updated the night intro so it starts from full black, fades the ritual body eyes open, and keeps the eye glow visible during night combat.
- Fixed the night intro black start by making the fade overlay active in the initial HTML instead of fading to black after load.
- Slowed the night intro fade-out and delayed the glowing-eyes reveal for a clearer dark-to-awake moment.
- Changed the intro eye-glow timing so the eyes open only after the black fade is about 90 percent complete.
- Refreshed/verified the sleeping character body art used for the closed-eye ritual body layer.
- Added local cache-busting query strings to the sleeping body and eye-glow textures so updated character art reloads during testing.
- Tuned the intro eye-glow reveal to start earlier and fade in more slowly.
- Set up two starter night waves: Wave 1 uses five Drifters, and Wave 2 mixes four Drifters with three Skitters using paced spawning.
- Updated night wave progression so Wave 2 waits until all Wave 1 ghosts are cleared before starting.
- Changed Wave 1 to spawn ten Drifters with randomized timing, and Wave 2 now starts after the Wave 1 spawn count completes instead of waiting for all enemies to be killed.
- Retuned enemy spawning with reference-inspired pressure batches: ghosts now arrive in random 1-3 enemy bursts, and a dark wave gesture plays before Wave 2.
- Retuned starter waves so Wave 1 announces after the intro, spawns slower, and Wave 2 waits until all Wave 1 ghosts are killed before showing its gesture and spawning.
- Fixed wave over-spawning by preventing spawn batches once a wave's ghost list is exhausted.
- Made Wave 2 harder with a larger Drifter/Skitter mix and added a final 'You Survived The Night' gesture after all two-wave enemies are cleared.
- Added a short night-clear pause before the final survive gesture and faded the ritual body's eye glow closed after the two starter waves are cleared.
- Added the local eight-frame first-wave fire spritesheet and made Candle A light with a looping flame animation after Wave 1 is cleared.
- Tuned the first candle flame placement, removed the temporary glow helper, and kept the approved animated fire sprite position.
- Changed Candle A from placement-test visibility to ritual progression: it now stays off at night start, then scales and fades on after the first night is survived.
- Adjusted first-night completion timing so Candle A begins lighting during the post-clear pause before the final survive message appears.
- Bumped the Candle A fire texture cache version and added a render-loop visibility failsafe so the lit candle remains enabled after night clear.
- Refreshed the updated home lobby scene OBJ and verified its spawn/map/basement marker positions against the current area config.
- Applied the Home Lobby room 2 base texture to the room2_base_ OBJ object using the exported UVs.
- Updated the scaled-down home lobby scene, refreshed its cache version, and retuned lobby bounds/spawn/map/basement colliders from the new OBJ markers.
- Added a small top-right clock UI using local clock/indicator assets, with the triangle indicator rotating around the clock edge from the clock center.
- Refreshed the home lobby scene cache after the latest export and applied the local sofa texture to the new sofa OBJ object.
- Refreshed the home lobby scene again after the latest export; existing spawn and transition collider markers still matched the new OBJ.
- Applied newly added home lobby assets to their OBJ objects: shelf, plant position, exit door mat, and grandma door mat.
- Converted the latest home lobby plant and shelf placement markers into generated textured prop planes with larger controlled sizes while hiding the marker meshes.
- Updated the home lobby to use the latest OBJ prop planes directly for plant/shelf position, size, and rotation; mapped the second plant marker to plant 2 art.
- Refreshed the home lobby scene after another prop placement update; transition colliders stayed unchanged while latest plant/shelf positions come from the OBJ.
- Added a darker offset duplicate behind the home lobby shelf prop to fake visual thickness from the current camera angle.
- Refreshed the shop beach scene after the latest export and retuned shop bounds, spawn, and map-return collider from OBJ markers.
- Refreshed the shop beach scene again and switched shop movement bounds to the new area_wher_user_can_move_hide_ marker from the OBJ.
- Refreshed the shop beach scene cache after the latest export; shop movement/spawn/map collider markers remained unchanged.
- Changed shop player movement from rectangular bounds to the exact triangulated area_wher_user_can_move_hide_ OBJ plane, snapping back to the last valid position when outside.
- Added shop scene m1/m2 texture materials and routed updated shop OBJ objects ending in _m1/_m2 to the matching local textures.
- Refreshed the expanded shop beach scene and added ShopM3 texture routing for new -m3 props like the tarot granny, tent, cards, carpet, and background.
- Fixed latest shop texture routing by mapping exported material names lambert4/lambert5/lambert7 to ShopM1/ShopM2/ShopM3, since the newest OBJ removed some _m1/_m2 object suffixes.
- Fixed shop m3 billboard props like tarot granny and tent by forcing double-sided transparent rendering, disabling depth testing, and giving m3 meshes higher render order.
- Reverted the experimental shop m3 depth-test/render-order override because it caused gameplay sprites to appear under shop props.
- Added a targeted tarot granny visibility fix in the shop scene by cloning its material, lowering alpha test, keeping it double-sided, and nudging it slightly forward without changing all m3 props.
- Refreshed the shop m3 atlas texture after the latest art update by bumping its local cache version.
- Added the required starter shop card interaction: approaching base_card-m3 auto-focuses the soul, opens a mandatory 10 Soul Coin purchase panel, spends coins, and animates the card disappearing after purchase.
- Refined the starter shop card purchase: moved the soul focus point closer to base_card-m3, simplified the bottom UI to price plus buy, and added a cancel button that re-arms after stepping away.
- Mapped the new local Human form card - 10 shop PNG directly onto the base_card-m3 shop mesh so the purchasable card appears in-scene.
- Updated the shop starter purchase so the renamed soul_platform_-m3 object acts as the in-scene trigger/platform while the card art appears only in the bottom purchase UI and animates away on buy.
- Repositioned the shop starter purchase UI to the center of the screen for a clearer tarot-card buying moment.
- Added map progression: Circus starts locked on the shop/house map, buying the Human Form card queues a Circus unlock, and opening the map reveals the Circus destination with an animated indicator pop.
- Converted the supplied FBX character/animation set into a local human_form.glb, vendored GLTFLoader, and made the Human Form card switch the controllable soul into an animated 3D human form using Idle/Walk clips.
- Rebuilt human_form.glb from the updated character switch.fbx while preserving the existing Idle/Walk/Jump animation clip setup and bumped the model cache version.
- Switched the Human Form runtime loader to the newly updated human_form.glb asset and bumped the cache version for browser/mobile testing.
- Updated the Circus destination to load the new circus enviornment OBJ, mapped its local m1/m2/m3/m5/popcorn textures, and refreshed spawn/map/walking markers from the new export.
- Converted the inside circus tent FBX into a local OBJ/MTL, added a Circus Tent interior scene, and wired the outside tent collider to fade into the interior with an exit back to Circus.
- Fixed the Circus Tent interior area config and transition spawn override so exiting the tent returns the player beside the outside tent entrance.
- Fixed Circus outside scene loading after moving the circus environment OBJ/MTL into the Circus scene textures folder; restored the circusGroup fetch before the tent-interior fetch.
- Refreshed the inside circus tent scene from the updated FBX, bumped its OBJ cache, and wired the new base_platform_where_user_move and back_to_circus_collider markers into movement/exit logic.
- Reconverted the updated inside circus tent FBX, bumped the tent OBJ cache to 20260907b, and aligned the tent entry spawn to the new entry_poing_ marker.
- Fixed the Circus Tent entry spawn so the player appears inside the walkable platform instead of on the outside entry marker, preventing a stuck start state.
- Added the first Circus Tent obstacle trial: owner intro, directional arrow warnings, sweeping bar obstacles, four sequential collectible planes, jump handling, and completion feedback.
- Tuned the Circus Tent jump cooldown from 0.62s to 0.5s for a more responsive dodge rhythm.
- Extended the Circus Tent trial from 4 to 5 collectibles while keeping the existing obstacle speed and intensity tuning.
- Tuned the Circus Tent trial jump to 0.46s duration, 0.47s cooldown, slightly higher jump height, and a slower first obstacle phase for readability.
- Retuned Circus Tent obstacle stage delays/speeds and changed obstacle warnings so bars appear during the arrow telegraph before moving.
- Retuned Circus Tent obstacle stages, made post-collect obstacle timing respect the next stage delay, and added tent hit cooldown so collision does not stall the trial.
- Pulled Circus Tent collectibles away from arena edges, softened late-stage obstacle speed/delay, and removed collision knockback so hits do not lock the player against colliders.
- Changed Circus Tent obstacle contact from health damage to an immediate trial fail with a short automatic retry.
- Hid the TALK button and moved Circus Tent jump input onto the slash button position while hiding dash during the arcade trial.
- Changed Circus Tent collectibles to spawn at random safe inner arena spots and added a short delay before the next collectible appears.
- Increased Circus Tent collectible reveal delay to 2.0s and made random collectible placement avoid spawning too close to the player.
- Adjusted Circus Tent post-collect obstacle timing so it waits only for the collectible reveal delay, without adding the next stage delay.
- Changed Circus Tent post-collect flow so the next charm appears after a random 3-5s delay while obstacles continue spawning at the next stage pace.
- Tuned the Circus Tent collectible reveal delay to a random 7-10s window and bumped the tent scene cache for the refreshed layout.
- Refreshed the inside circus tent scene from the latest FBX and preserved the disabled arcade bar mesh as the obstacle prototype for the tent trial.
- Tuned Circus Tent collectible reveal delay to a random 8-12s window and made the first charm wait before appearing after the intro.
- Replaced the generated Circus Tent owner placeholder with the exported staff_stahd mesh for the intro move-and-hide sequence.
- Adjusted the Circus Tent staff_stahd intro so it slides 5 units to the right without z drift or scale change before hiding.

- Refreshed the circus tent FBX export from the updated circus tent folder, remapped its interior textures, and kept the staff_stahd intro slide as the trial opener.

- Inspected the updated circus tent FBX mesh export; it currently contains the obstacle-only _m2 mesh, so the playable tent scene export was kept intact while material mapping now recognizes _m2/Material.001.
- Tightened circus tent texture assignment so `_m1` entry/base meshes use the m1 interior texture while `_m2` arcade obstacle meshes use the m2 texture.
- Updated the circus tent OBJ loader so arcade obstacle meshes keep their m2 texture material during runtime spawning and entry meshes get generated planar UVs when needed.
- Added randomized circus obstacle tint colors using red, yellow, and cyan while keeping the same obstacle behavior.
- Changed circus arcade obstacles to use flat randomized colors without applying the obstacle texture during runtime.
- Set circus arcade obstacles back to a single red color for clearer danger readability.
- Hid the slash button in the circus tent and moved the jump action onto the dash button while the arcade trial is active.
- Switched the human form model source to the new character switch 3d/ch boy.glb asset while keeping the existing unlock flow.
- Built and loaded ch_boy_game.glb with the new character texture embedded plus Idle, Walk, and Jump clips from the character switch 3d FBX files; adjusted facing offset for the new model.
- Forced the new 3D boy to flat textured MeshBasicMaterial and updated animation state selection so jumping is not immediately overwritten by idle/walk.
- Added a light runtime correction to the new Mixamo boy hand and forearm bones so the stylized model avoids the curled/twisted hand pose while animations play.
- Strengthened the runtime wrist correction for the 3D boy so the small-screen hand pose reads cleaner.
- Added a 35% upper-arm/shoulder neutral blend to reduce the new 3D boy character arms rotating inward.
- Replaced the 3D human-form GLB with a 2D animated sprite plane using the new character switch 2d idle/front/back/side run strips.
- Added 2D human-form strip playback for idle, front run, back run, and side run with direction-based sprite switching and jump-height reuse.
- Increased the 2D human-form sprite scale by about 20% while keeping the soul sprite unchanged.
- Increased the circus tent jump height for the 2D human-form character and matching obstacle-clearance check, without changing jump cooldown or obstacle timing.
- Tuned circus tent jump values to visual lift 1.0 and obstacle-clearance height 1.15 for a smaller difficulty adjustment.
- Refreshed cache keys for the updated 2D human-form character sheets after confirming frame dimensions were unchanged.
- Moved the circus tent jump action from the dash button to the hidden talk-button position, showing it as JUMP only during the tent trial.
- Enlarged the circus tent jump button and hid the dash button until its unlock/enable timing is decided.
- Added the first pass of the day/night flow: night exit locks, two timed day parts, circus day-part spending, circus closed messaging, and clock sector movement.
- Expanded daytime to three 20-second parts, kept circus available only during the first two day parts, added a final prep/shop period, and delayed night start while the player is still shopping or buying.
- Changed circus trial failure so it opens the tent exit instead of auto-restarting, letting the player leave and retry later if day time remains.
- Changed circus trial attempts to consume one day part when the trial begins, so failed attempts also count toward the two daytime circus plays.
- Adjusted night onboarding so Night 1 uses only Wave 1 and does not light the first ritual fire; Night 2 and later use the fuller wave set and can light the candle after survival.
- Refreshed the clock UI cache key after updating the clock PNG asset.
- Added automatic player form switching so basement/night gameplay always shows the ghost soul, while the 2D human form appears only during daytime outside the basement.

## Session 33
- Adjusted the 2D human-form sprite render layer so flat environment props no longer visually overlap the player character.

## Session 34
- Added Night 1 story progression so surviving the first night automatically unlocks the human form and marks the starter shop card as obtained.
- Added night-attempt soul coin tracking: ghosts killed during a night count toward that night's earnings, and failing the night removes 50% of only those earned coins before retrying the same night.

## Session 35
- Added a four-panel opening story intro using the new start story slate PNGs, with two-second auto advance and tap/click to advance faster.
- Paused gameplay, clock, movement, and enemy spawning until the story intro finishes, then handed off to the existing ritual eye-glow intro.

## Session 36
- Fixed the opening story intro to use start stories.jpg as the visible story art and b1-b4.png as fading black reveal slates instead of displaying the black slates as standalone slides.

## Session 37
- Adjusted the opening story reveal so the first panel starts visible, removed b1.png from the black reveal stack, and slowed auto reveal timing to five seconds per panel.

## Session 38
- Added a post-story black-screen Grandma dialogue beat after the final story reveal, with tap/click advance and a short pause before the ritual intro starts.

## Session 39
- Slowed the Day message gesture and separated the Human Form Awakened message from the Day 1 message so day-start feedback is readable.

## Session 40
- Refreshed the shop OBJ cache version to load the updated shop layout.
- Read the hidden soul platform's exported position for the shop card interaction without displaying its mesh.

## Session 41
- Refreshed the updated shop m2 texture and assigned taort tent.png to the tarot_tent mesh using its exported UVs.
- Used a double-sided transparent material for the tent image.

## Session 42
- Assigned t1-t4 PNG tree variants to the shop tree planes using a stable name-based random mix.
- Preserved exported placement and UVs, with double-sided alpha cutouts for the tree silhouettes.

## Session 43
- Refreshed the latest shop OBJ and updated m2 texture cache versions.
- Checked that the exported mesh names still match the existing shop and tree material assignments.

## Session 44
- Constrained the shop purchase approach to the exported walkable plane and shop bounds.
- Removed the unconditional saving of the purchase position as valid, which could trap the player outside the movement area after changing to human form.

## Session 45
- Added the shopkeeper's five-line introduction in a black bottom dialogue panel, with automatic advance and tap to continue.
- Revealed the Human Form Card after the dialogue as a free starter gift with a TAKE action and the existing acquisition animation.
- Added a three-card shop view using placeholder Human Form artwork: Dash (100), Soul Mine (20), and Aura Shield (50), all locked.
- Paused movement and day time during the shop session; added close and return-to-shop flow without replaying the introduction.
- Browser-checked the dialogue, zero-coin gift acquisition, locked upgrade buttons, paused day timer, valid player position, and shop reopening without runtime errors.

## Session 46
- Added a short card shake before the Human Form Card shrinks away.
- Revealed the boy with a subtle transformation shake and a 1.6-second unobstructed pause before opening the locked shop cards.
- Kept movement and day time paused throughout the acquisition and transformation reveal.

## Session 47
- Replaced the three shop placeholder images with the supplied Dash, Soul Mine, and Aura Shield card artwork.
- Preserved their prices and locked buttons.

## Session 48
- Added the supplied Enter and Exit images as camera-facing signs at all seven existing scene transition triggers.
- Positioned signs from the same collider rectangles used for travel, with scene-local visibility and no collider or progression changes.

## Session 49
- Refreshed the home lobby exit-door mat and room-base texture cache versions to load the updated images.

## Session 50
- Hid the Dash button in its default CSS so it no longer appears at startup before a scene switch.

## Session 51
- Added the circus instruction to jump over bars and collect four stone parts, with a matching four-part goal and counter.
- Made Jump appear alongside the boy during the Human Form Card reveal and work throughout daytime human-form exploration.
- Kept Jump hidden in soul form and blocked input during shop, map, and cinematic sequences; preserved jump height and cooldown.

## Session 52
- Converted the updated circus tent FBX to the runtime OBJ with preserved geometry and UVs, and refreshed the exterior OBJ.
- Assigned the new circus owner and outdoor owner-banner textures to their matching meshes.
- Added a first-visit instruction dialogue inside the tent, followed by the owner's slide-right animation when START is pressed.
- Kept the owner hidden on subsequent visits within the current game; the introductory dialogue and slide do not repeat.

## Session 53
- Read circus spawn, walking bounds, map exit, and tent entrance from the updated OBJ markers instead of the old layout coordinates.
- Moved the tent return spawn and Enter/Exit signs to match the updated routes, fixing the player spawning outside the walkable area.

## Session 54
- Hid Enter/Exit signs when their routes are locked, their scenes are inactive, or a story, transition, map, or shop overlay is active.
- Showed the basement exit after night combat clears and the tent exit after trial completion; hid the circus entrance when closed.

## Session 55
- Added the supplied circus-owner comic with its three row reveal masks, five-second reading intervals, and tap/keyboard advance.
- Changed the first tent visit to story, then owner slide, then game instructions and START; obstacles wait until START.
- Kept repeat visits free of the story and owner introduction.

## Session 56
- Replaced separate ritual and soul health with one 100-point Body Connection pool; either target taking damage now weakens the same connection.
- Added a ritual-only connection meter with soul/body endpoints, hit feedback, a critical state, and a shared-connection explanation.
- Restyled Soul Coins with a compact counter and collection feedback; removed the old movement instruction and health text.
- Restored full connection when a night clears, at day start, before each new night, and on a failed-night retry.

## Session 57
- Created DESIGN_INTENT.docx with 397 words covering the audience, premise, current prototype, and future-state vision.
- Embedded the three supplied stone PNGs in a table explaining challenge, crafting, and trading acquisition paths.
- Validated the document text and embedded images and checked a browser-rendered page preview.

## Session 58
- Refreshed the latest shop beach OBJ and read its walking bounds, spawn, and map exit from the exported markers.
- Expanded the left movement limit to match the updated walking plane and kept the Exit sign aligned.

## Session 59
- Added the two supplied instruction images after the first night's opening wave clears.
- Added NEXT on the first page and BEGIN on the second; Day 1 begins only after BEGIN is pressed.
- Paused gameplay and kept exits locked during this one-time instruction sequence; later nights retain their normal day transition.

## Session 60
- Added the generated Grandma's Veil icon before the opening story: fade in from black, hold, and fade back to black.
- Added the supplied Rite of the Hollow Glade audio as a continuous loop at 15% volume, with user-gesture playback fallback for mobile browsers.
- Pause music while the page is hidden and resume previously unlocked playback on return.
- Increased background music volume from 15% to 25% after playtesting.

## Session 61
- Fixed direct index.html playback: bundled the five OBJ scenes, image textures, and map masks to avoid browser file-origin restrictions.
- Kept server loading on original assets and shared the same scene parsing and game logic between both modes.
- Added scripts/build-offline.cjs and OFFLINE.md so the direct-file bundle can be refreshed after future asset updates.
- Verified all five scenes, local images, and music using a direct file URL with networking disabled; no failed requests or JavaScript errors, and scene object counts match the server version.
