function attemptJump () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters

    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        if (hero.vy >= 40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
        animateJumps(hero)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function intializeLevel (level: number) {
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(assets.tile`tile6`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    controller.moveSprite(player2, 100, 0)
    scene.cameraFollowSprite(player2)
    player2.z = 5
    info.setScore(0)
    info.setLife(3)
}
function animateJumps(sprite: Sprite){
    if (sprite.vx > 0){
        animation.runImageAnimation(
        sprite,
        heroJumpRightImgs,
        150,
        false
        )
        sprite.setImage(heroIdleRightImg)
    }
    else {
        animation.runImageAnimation(
        sprite,
        heroJumpLeftImgs,
        150,
        false
        )
        sprite.setImage(heroIdleLeftImg)
    }
}
 hero = sprites.create(heroIdleRightImg, SpriteKind.Player)
createPlayer(hero)
intializeLevel(currentLevel)
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
