PlayerEvents.tick(event => {
    const { player } = event;

    // Sand Erosion
    if (global.packmode !== 'abydos'){
        (() => {
    if (player.hasEffect('kubejs:sand_erosion')) {
        
        let effects = ['minecraft:slowness'];

        if (player.age % 40 === 0) {
            effects.forEach(effect => {
                player.potionEffects.add(effect, 60, 1, false, false)
            })
        }

        if (player.age % 100 === 0) {
            player.potionEffects.add('minecraft:hunger', 100, 2, false, false)
            event.server.runCommandSilent(`execute as ${event.player.username} run damage ${event.player.username} 2 kubejs:heat_exhaustion`);
        }

        if (global.packmode !== 'abydos'){
            (() => {        
                if (player.age % 200 === 0) {
                    player.tell(Text.of('§eThe sands of Abydos are eroding you...').red())
                }
            })()
        }

    }
    })()
    }   

    // Radiation Poisoning
    if (player.hasEffect('kubejs:radiation_poisoning')) {
        
        let effects = ['minecraft:poison'];

        if (player.age % 40 === 0) {
            effects.forEach(effect => {
                player.potionEffects.add(effect, 60, 1, false, false)
            })
        }
        
        if (player.age % 40 === 0) {
            if (player.getHealth() <= 2) {
                event.server.runCommandSilent(`execute as ${event.player.username} run damage ${event.player.username} 100 kubejs:radiation`);
                // player.tell('big damage')
                return
            }
            event.server.runCommandSilent(`execute as ${event.player.username} run damage ${event.player.username} 4 kubejs:radiation`);
                // player.tell(`small damage hp:${player.getHealth()}`)
        }
        
        if (player.age % 200 === 0) {
            player.tell(Text.of('§cYou feel sick from radiation...').red())
        }
    }
    
    // Toxic Atmosphere
    if (player.hasEffect('kubejs:toxic_atmosphere')) {
        let effects = ['minecraft:weakness', 'minecraft:nausea', 'minecraft:darkness'/*, ' minecraft:mining_fatigue'*/];

        if (player.age % 40 === 0) {
            effects.forEach(effect => {
                player.potionEffects.add(effect, 60, 1, false, false)
            })
        }
    }

    // Abyssal Drain
    if (player.hasEffect('kubejs:abyssal_drain')) {
        let effects = ['minecraft:darkness'];

        if (player.age % 40 === 0) {
            effects.forEach(effect => {
                player.potionEffects.add(effect, 60, 1, false, false)
            })
            
            if (Math.random() > 0.95) {
                event.server.runCommandSilent(`execute as ${event.player.username} run damage ${event.player.username} 100 kubejs:abyssal_pull`);
                // player.tell('void dmg applied')
            }
        }
    }

});