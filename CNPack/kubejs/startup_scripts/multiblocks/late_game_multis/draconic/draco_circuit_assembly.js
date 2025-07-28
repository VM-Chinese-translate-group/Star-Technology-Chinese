GTCEuStartupEvents.registry('gtceu:recipe_type', event => {

    event.create('draco_circuit_assembler')
        .category('extemely_advanced')
        .setEUIO('in')
        .setMaxIOSize(16, 1, 3, 0)
        .setSlotOverlay(false, false, GuiTextures.SOLIDIFIER_OVERLAY)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW_MULTIPLE, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.ASSEMBLER)
        .setMaxTooltips(4)
        .setHasResearchSlot(true);

});

GTCEuStartupEvents.registry('gtceu:machine', event => {

    event.create('draco_circuit_assembler', 'multiblock')
        .rotationState(RotationState.NON_Y_AXIS)
        .machine((holder) => new $AssemblyLineMulti(holder))
        .recipeType('draco_circuit_assembler')
        .recipeModifiers([GTRecipeModifiers.PARALLEL_HATCH, GTRecipeModifiers.OC_NON_PERFECT_SUBTICK])
        .appearanceBlock(() => Block.getBlock('kubejs:enriched_naquadah_machine_casing'))
        .pattern(definition => FactoryBlockPattern.start($RelativeDirection.BACK, $RelativeDirection.UP, $RelativeDirection.RIGHT)
            .aisle('SSISS', 'SSDSS', '@SPSS', ' SSS ')
            .aisle('SSISS', 'GCDCG', 'RACAR', ' SGS ').setRepeatable(3, 15)
            .aisle('SSOSS', 'SSDSS', 'SSSSS', ' SSS ')
            .where('@', Predicates.controller(Predicates.blocks(definition.get())))
            .where('S', Predicates. blocks('kubejs:enriched_naquadah_machine_casing')
                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(3).setPreviewCount(0))
                .or(Predicates.abilities(PartAbility.INPUT_ENERGY).setMaxGlobalLimited(2).setPreviewCount(0))
                .or(Predicates.abilities(PartAbility.OPTICAL_DATA_RECEPTION).setExactLimit(1)))     
            .where('G', Predicates.blocks('kubejs:draco_resilient_fusion_glass'))
            .where('A', Predicates.blocks('gtceu:assembly_line_casing'))
            .where('C', Predicates.blocks('gtceu:assembly_line_unit'))
            .where('D', Predicates.blocks('kubejs:draco_ware_casing'))
            .where('I', Predicates.abilities(PartAbility.IMPORT_ITEMS))
            .where('O', Predicates.abilities(PartAbility.EXPORT_ITEMS).addTooltips(Component.translatable("gtceu.multiblock.pattern.location_end")))
            .where('P', Predicates. blocks('kubejs:enriched_naquadah_machine_casing')
                .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1)))
            .where('R', Predicates.blocks('kubejs:draco_assembly_grating'))
            .where(' ', Predicates.any())
            .build())
        .workableCasingRenderer('kubejs:block/casings/naquadah/casing',
            'gtceu:block/multiblock/assembly_line', false);

});