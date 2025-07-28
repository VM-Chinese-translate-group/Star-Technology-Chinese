if (global.packmode !== 'hard'){

ServerEvents.recipes(event => {
    const id = global.id;

    event.shaped('gtceu:void_extractor',[
        'ABC',
        'ADE',
        'FGC'],{
        A: 'gtceu:soul_infused_hex_wire',
        B: 'gtceu:lv_electric_pump',
        C: 'gtceu:lv_electric_piston',
        D: 'gtceu:hp_steam_miner',
        E: '#gtceu:circuits/lv',
        F: 'gtceu:lv_robot_arm',
        G: 'gtceu:lv_conveyor_module'
    }).id('start:shaped/void_extractor');

    event.shaped('gtceu:void_excavator',[
        'ABC',
        'ADE',
        'FGC'],{
        A: 'gtceu:twinite_hex_wire',
        B: 'gtceu:luv_electric_pump',
        C: 'gtceu:luv_electric_piston',
        D: 'gtceu:luv_large_miner',
        E: '#gtceu:circuits/luv',
        F: 'gtceu:luv_robot_arm',
        G: 'gtceu:luv_conveyor_module'
    }).id('start:shaped/void_excavator');

    event.recipes.gtceu.void_excavation(id('mining'))
        .inputFluids('gtceu:drilling_fluid 5000')
        .chancedOutput('5x gtceu:raw_coal', 5000, 1000)
        .chancedOutput('2x minecraft:raw_gold', 4000, 750)
        .chancedOutput('3x gtceu:raw_sodalite', 4000, 1000)
        .chancedOutput('3x gtceu:raw_pentlandite', 3000, 500)
        .chancedOutput('4x gtceu:raw_realgar', 4000, 800)
        .chancedOutput('2x gtceu:raw_silver', 3500, 750)
        .outputFluids('gtceu:rare_ore_residue 400', 'gtceu:raw_ore_slurry 600')
        .duration(640)
        .EUt(GTValues.VA[GTValues.LV]);

    });

}