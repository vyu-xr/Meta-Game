# Main Camera Reference

This is the current approved main camera angle for the portrait 2.5D prototype.

## Camera Type

- Type: PerspectiveCamera
- Near: 0.1
- Far: 1000
- Aspect: window.innerWidth / window.innerHeight
- Initial position: x 0, y 18.7, z 13.2

## Adaptive FOV

The game uses adaptive vertical FOV based on screen aspect:

```js
const aspect = window.innerWidth / window.innerHeight;
if (aspect < 0.55) return 36; // tall phone
if (aspect < 0.75) return 34; // normal portrait
return 32;                    // wider/tablet-ish
```

## Runtime Follow Values

```js
const cameraHeight = 18.7;
const cameraBackDistance = 13.2;
const cameraLookAhead = 2.0;
```

Runtime camera follow:

```js
camera.position.x = characterGroup.position.x;
camera.position.z = characterGroup.position.z + cameraBackDistance;
camera.position.y = cameraHeight;

camera.lookAt(
    characterGroup.position.x,
    0,
    characterGroup.position.z - cameraLookAhead
);
```

## Visual Intent

- Portrait mobile 2.5D view.
- Character sits slightly low/near center while the player can see forward.
- Similar elevated dramatic perspective family to Cult of the Lamb references, but adapted to the current Three.js mobile scene.
- Keep this as the baseline before changing zoom, FOV, or scene scale.

## Notes

- Resize handler updates camera aspect and adaptive FOV.
- Screen shake offsets camera x/z slightly during combat, but does not change the baseline angle.

## Dialogue Cinematic Zoom

Temporary test mode uses the same perspective family but eases about 15 percent closer for conversations.

`js
const normalCamera = { height: 18.7, backDistance: 13.2, lookAhead: 2.0 };
const cinematicCamera = { height: 15.9, backDistance: 11.2, lookAhead: 1.4 };
` 

Current prototype test control: tap the TALK button to toggle this zoom and lock movement while active.

## Night Start Intro Camera

The basement starts with a temporary intro camera before normal follow unlocks.

- Duration: 3.15 seconds
- Starts black for about 0.36 seconds
- Close ritual/body view starts around y 9.4, z 5.9
- Pulls back to y 13.8, z 9.2 while glowing-eye overlay is visible
- Blends into the normal follow camera by the end
- Movement and enemy spawning are locked during the intro


Intro update: the scene now holds full black longer, fades the glowing eyes open, and keeps the eye-glow overlay active during basement/night gameplay. Later day-start logic should fade or swap this back to closed eyes.
