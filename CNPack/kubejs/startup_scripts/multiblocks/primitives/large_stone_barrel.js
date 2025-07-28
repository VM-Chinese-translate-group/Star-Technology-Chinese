GTCEuStartupEvents.registry('gtceu:recipe_type', event => {

    event.create('large_stone_barrel')
        .category('primitive')
        .setMaxIOSize(2, 1, 2, 1)
        .setProgressBar(GuiTextures.PROGRESS_BAR_BATH , FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.BATH);

});

GTCEuStartupEvents.registry('gtceu:machine', event => {

    event.create('large_stone_barrel', 'primitive')
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType('large_stone_barrel')
        .appearanceBlock(GTBlocks.TREATED_WOOD_PLANK)
        .pattern(definition => FactoryBlockPattern.start()
            .aisle('DDD', 'PPP', 'PPP', 'PPP')
            .aisle('DDD', 'P P', 'P P', 'P P')
            .aisle('DDD', 'PCP', 'PPP', 'PPP')
            .where('C', Predicates.controller(Predicates.blocks(definition.get())))
            .where('P', Predicates.blocks('minecraft:stone')
                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(2).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setMaxGlobalLimited(2).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(2).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(2).setPreviewCount(1)))
            .where('D', Predicates.blocks('minecraft:stone_bricks'))
            .where(' ', Predicates.air())
            .build())
        .workableCasingRenderer('minecraft:block/stone',
        'kubejs:block/multiblock/primitive_blast_furnace', false)
        .editableUI(
			global.ui_builder({
				group: 'primitive',
				name: 'large_stone_barrel',
				size: [166, 76],
				background: GuiTextures.PRIMITIVE_BACKGROUND,
				progress: {
					pos: [74, 29],
					size: [20, 20],
					texture: GuiTextures.PROGRESS_BAR_BATH
				},
				inputs: [
					{ type: 'item', index: 0, pos: [42, 20], texture: GuiTextures.PRIMITIVE_SLOT },
					{ type: 'item', index: 1, pos: [42, 38], texture: GuiTextures.PRIMITIVE_SLOT },
					{ type: 'fluid', index: 0, pos: [24, 20], texture: GuiTextureGroup(GuiTextures.PRIMITIVE_SLOT, GuiTextures.PRIMITIVE_LARGE_FLUID_TANK_OVERLAY.getSubTexture(0, 0.04, 1, 0.22)) },
					{ type: 'fluid', index: 1, pos: [24, 38], texture: GuiTextureGroup(GuiTextures.PRIMITIVE_SLOT, GuiTextures.PRIMITIVE_LARGE_FLUID_TANK_OVERLAY.getSubTexture(0, 0.04, 1, 0.22)) }
                ],
				outputs: [
					{ type: 'item', index: 0, pos: [114, 20], texture: GuiTextures.PRIMITIVE_SLOT },
					{ type: 'fluid', index: 0, pos: [114, 38], texture: GuiTextureGroup(GuiTextures.PRIMITIVE_SLOT, GuiTextures.PRIMITIVE_LARGE_FLUID_TANK_OVERLAY.getSubTexture(0, 0.04, 1, 0.22)) },
				],
			})
		);

});