if (global.packmode !== 'hard'){
    (() => {   

ServerEvents.recipes(event => {
    const id = global.id;
    
    const CRtype = [event.recipes.gtceu.large_chemical_reactor, event.recipes.gtceu.chemical_reactor]
    CRtype.forEach(CR=>{

    //plastic boards
    [
        {plastic: 'polyether_ether_ketone', abreviation: 'peek', quantity: 16},
        {plastic: 'poly_34_ethylenedioxythiophene_polystyrene_sulfate', abreviation: 'pedot_pss', quantity: 16},
    ].forEach(type=>{
    CR(id(`plastic_boards_${type.abreviation}`))
        .itemInputs(`gtceu:${type.plastic}_plate`, '4x gtceu:copper_foil')
        .inputFluids('gtceu:sulfuric_acid 250')
        .itemOutputs(`${type.quantity}x gtceu:plastic_circuit_board`)
        .duration(500)
        .EUt(10);
    });   

    // non-cleanroom etching with CuCl
    [
        {board: 'phenolic', foil: 'silver', foil_count: 4, amount: 50, duration: 300, energy: 30},
        {board: 'plastic', foil: 'copper', foil_count: 6, amount: 125, duration: 600, energy: 30},
        {board: 'epoxy', foil: 'electrum', foil_count: 8, amount: 250, duration: 900, energy: 30}
    ].forEach(type=>{
        CR(id(`${type.board}_circuit_board_copper`))
            .itemInputs(`gtceu:${type.board}_circuit_board`, `${type.foil_count}x gtceu:${type.foil}_foil`)
            .inputFluids(`gtceu:cupric_chloride_solution ${type.amount}`)
            .itemOutputs(`gtceu:${type.board}_printed_circuit_board`)
            .duration(type.duration)
            .EUt(type.energy);
        });
 
 
    // cleanroom etching with CuCl
    [
        {board: 'fiber_reinforced', foil: 'annealed_copper', foil_count: 12, amount: 500, duration: 1200, energy: 30},
        {board: 'multilayer_fiber_reinforced', foil: 'platinum', foil_count: 8, amount: 1000, duration: 1500, energy: 120},
        {board: 'wetware', foil: 'niobium_titanium', foil_count: 32, amount: 2500, duration: 1800, energy: 480}
    ].forEach(type=>{
        CR(id(`${type.board}_circuit_board_copper`))
            .itemInputs(`gtceu:${type.board}_circuit_board`, `${type.foil_count}x gtceu:${type.foil}_foil`)
            .inputFluids(`gtceu:cupric_chloride_solution ${type.amount}`)
            .itemOutputs(`gtceu:${type.board}_printed_circuit_board`)
            .cleanroom(CleanroomType.CLEANROOM)
            .duration(type.duration)
            .EUt(type.energy);
        });
 
 
    // cleanroom etching with new boards
    [
        {board: 'draconic_wetware', foil: 'trinium', foil_count: 48, amount: 5000, duration: 2100, energy: GTValues.VA[GTValues.EV]}
    ].forEach(type=> {
        [
          {id: 'copper', name: 'cupric_chloride_solution', multiplier: 1},
          {id: 'iron', name: 'iron_iii_chloride', multiplier: 2},
          {id: 'sodium', name: 'sodium_persulfate', multiplier: 4}
        ].forEach(fluid => {
            CR(id(`${type.board}_circuit_board_${fluid.id}`))
                .itemInputs(`kubejs:${type.board}_circuit_board`, `${type.foil_count}x gtceu:${type.foil}_foil`)
                .inputFluids(`gtceu:${fluid.name} ${type.amount*fluid.multiplier}`)
                .itemOutputs(`kubejs:${type.board}_printed_circuit_board`)
                .cleanroom(CleanroomType.CLEANROOM)
                .duration(type.duration)
                .EUt(type.energy); 
        });
    });

    // etching fluid
    CR(id('copper_chloride'))
        .itemInputs('1x gtceu:copper_dust')
        .inputFluids('gtceu:chlorine 1000')
        .itemOutputs('2x gtceu:copper_chloride_dust')
        .duration(600)
        .EUt(GTValues.VHA[GTValues.HV]);
    });
    event.recipes.gtceu.mixer(id('cupric_chloride_solution'))
        .itemInputs('1x gtceu:copper_chloride_dust')
        .inputFluids('gtceu:hydrochloric_acid 1000')
        .outputFluids('gtceu:cupric_chloride_solution 1000')
        .duration(400)
        .EUt(GTValues.VHA[GTValues.EV]);
 
});
})()
}