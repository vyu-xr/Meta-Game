# Combat Change Notes

These are the gameplay changes tested after backup commit `da7e03a Backup slash combat tuning`. They were not kept after restoring the project, but can be re-added selectively later.

## Player / Soul Changes Tested

- Added a 3-hit slash combo counter:
  - `comboStep = 0`
  - `comboTimer = 0`
  - `comboResetTime = 0.62`
- Slash press advanced the combo if pressed within the reset window:
  - Step 1 -> Step 2 -> Step 3 -> back to Step 1
- Added slash recovery movement slowdown:
  - `slashRecoveryTime = 0.12`
  - `slashRecoveryTimer = 0`
  - During recovery, movement speed became `moveSpeed * 0.62`
  - Normal move speed stayed `moveSpeed = 5`
- Slash pose animation from earlier remained subtle:
  - small wobble
  - small slash tilt
  - no forward nudge
  - no shadow slash scaling

## Slash / Attack Changes Tested

- Slash VFX accepted combo step:
  - `triggerSlashVfx(comboStep, slashDir)`
  - `slashVfxStep` changed slash size/offset per combo step
  - `slashVfxDir` froze slash direction at attack start
- Slash range became shorter than the previous larger slash:
  - Step 1 and 2 range: `1.72`
  - Step 3 range: `2.05`
- Slash cone became narrower:
  - Step 1 and 2 cone angle used `36` degrees
  - Step 3 cone angle used `46` degrees
- Slash damage changed:
  - Step 1 and 2 damage: `1`
  - Step 3 damage: `2`
- Knockback power changed:
  - Step 1 and 2 knockback: `3.8`
  - Step 3 knockback: `5.8`

## Enemy / Ghost Changes Tested

- Enemies changed from one-hit kill to health-based:
  - `hp: 3`
- Enemy material was cloned per enemy so individual ghosts could flash/change color:
  - `enemyMat.clone()`
- Added enemy states:
  - `state: 'chase'`
  - `state: 'windup'`
  - `state: 'attack'`
- Added enemy timers/data:
  - `windupTimer`
  - `attackTimer`
  - `stunTimer`
  - `knockback: { x: 0, z: 0 }`
- Added `damageEnemy(...)` helper:
  - subtracts HP
  - applies stun
  - applies knockback
  - creates hit burst
  - removes enemy when HP reaches 0
- Added stun/knockback movement after hit:
  - stun duration around `0.22`
  - knockback damped by `1 - dt * 5.5`
- Added attack telegraph behavior:
  - When close to ritual center, ghost enters `windup`
  - Windup time: `0.42`
  - Ghost turns/pulses pink-red during windup
  - After windup, ghost enters `attack`
  - Attack damages base every `0.95` seconds
  - Damage amount stayed `2`


## Future Recommendation

If re-adding combat changes, add them one at a time:

1. First add shorter directional slash only.
2. Test mobile black screen / scene stability.
3. Then add enemy HP and knockback.
4. Test again.
5. Then add 3-hit combo.
6. Test again.
7. Add enemy windup/telegraph last.

This will make it easier to find which change causes problems.