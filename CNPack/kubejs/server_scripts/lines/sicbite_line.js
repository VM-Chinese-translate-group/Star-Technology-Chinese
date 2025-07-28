ServerEvents.recipes(event => {
    const id = global.id;    

    event.recipes.gtceu.electric_blast_furnace(id('silicon_carbide'))
        .itemInputs('3x gtceu:silicon_dioxide_dust','2x gtceu:activated_carbon_dust')
        .itemOutputs('gtceu:silicon_carbide_dust')
        .outputFluids('gtceu:carbon_dioxide')
        .blastFurnaceTemp(2000)
        .duration(500)
        .EUt(GTValues.VHA[GTValues.HV]);

    event.recipes.gtceu.large_chemical_reactor(id('sicbite_1'))
        .itemInputs('23x gtceu:borax_dust', '4x gtceu:sodium_dust')
        .inputFluids('gtceu:hydrogen 28000')
        .itemOutputs('24x gtceu:sodium_borohydride_dust', '3x gtceu:sodium_oxide_dust')
        .outputFluids('minecraft:water 16000')
        .duration(1280)
        .EUt(GTValues.VHA[GTValues.IV]);

    event.recipes.gtceu.large_chemical_reactor(id('sicbite_2'))
        .itemInputs('gtceu:bismuth_dust')
        .inputFluids('gtceu:nitric_acid 4000')
        .itemOutputs('13x gtceu:bismuth_3_nitrate_dust')
        .outputFluids('minecraft:water 2000', 'gtceu:nitrogen 1000', 'gtceu:oxygen 1000')
        .duration(400)
        .EUt(GTValues.VHA[GTValues.LuV]);

    event.recipes.gtceu.advanced_chemistry(id('sicbite_3'))
        .itemInputs('1x gtceu:silicon_carbide_dust', '26x gtceu:bismuth_3_nitrate_dust', '3x gtceu:tellurium_dust', '36x gtceu:sodium_borohydride_dust')
        .itemOutputs('7x gtceu:silicon_carbide_over_bismuth_tritelluride_dust', '30x gtceu:sodium_nitrate_dust')
        .outputFluids('gtceu:diborane 3000', 'gtceu:hydrogen 6000')
        .duration(400)
        .EUt(GTValues.VHA[GTValues.ZPM]);

});