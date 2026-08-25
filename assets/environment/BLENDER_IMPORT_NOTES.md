# Blender Import Notes

Import `base_layout.obj` as a scene template.

- Current scale matches the Three.js prototype: X/Z are ground axes, Y is up.
- The square ground is 24 by 24 units.
- The center base circle has radius 3.
- The ritual markers sit on a perfect radius 5 circle.
- Keep the ritual object order: candle A, stone A, candle B, stone B, candle C, stone C.

Suggested final scene object names:

- `COLLIDER_wall_01`
- `SPAWN_player_home`
- `SPAWN_enemy_north`
- `INTERACT_ritual_circle`
- `RITUAL_candle_A`
- `RITUAL_stone_A`
- `RITUAL_candle_B`
- `RITUAL_stone_B`
- `RITUAL_candle_C`
- `RITUAL_stone_C`
