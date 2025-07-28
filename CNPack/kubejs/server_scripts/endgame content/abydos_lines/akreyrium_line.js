ServerEvents.recipes(event => {
    const id = global.id;

    // Line Specific Controller Recipe
    event.recipes.gtceu.assembly_line(id('folding_akreyrium_stabiliser'))
        .itemInputs('gtceu:uhv_machine_hull', '12x #gtceu:circuits/uhv','48x kubejs:uepic_chip','16x gtceu:small_pure_netherite_gear','32x gtceu:neutronium_normal_fluid_pipe',
            '16x gtceu:light_blue_glass_lens','16x gtceu:lime_glass_lens','16x gtceu:magenta_glass_lens','8x gtceu:uhv_field_generator',
            '8x gtceu:uhv_fluid_regulator','4x gtceu:uhv_sensor','8x gtceu:pure_netherite_rotor')
        .inputFluids('gtceu:hsse 9216','gtceu:borosilicate_glass 147456')
        .itemOutputs('gtceu:folding_akreyrium_stabiliser')
        .duration(32000)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('gtceu:large_engraving_laser'))
                .EUt(GTValues.VHA[GTValues.UV])
                .CWUt(144)
        )
        .EUt(GTValues.VA[GTValues.UV]); 

    // Akreyrium Processing
    event.recipes.gtceu.cyclonic_sifter(id('akreyrium_sieving'))
        .chancedInput('1x kubejs:netherite_reinforced_mesh', 500, -50)
        .inputFluids('gtceu:gritty_akreyrium 100000')
        .outputFluids('gtceu:lepton_sparse_akreyrium 1000')
        .itemOutputs('1x kubejs:crystalline_akreyrium', '1x kubejs:amorphous_akreyrium')
        .duration(1200)
        .EUt(GTValues.VA[GTValues.UHV]*.8);

    // Coalescing Superalloy mixing
    event.recipes.gtceu.mixer(id('lepton_coalescing_superalloy_dust'))
        .itemInputs(
            '4x gtceu:thallium_tungstate_dust', '2x gtceu:nickel_dust', '4x gtceu:graphene_dust', '3x gtceu:niobium_dust', "4x gtceu:bismuth_dust"
        ).itemOutputs('17x gtceu:lepton_coalescing_superalloy_dust')
        .duration(600)
        .EUt(GTValues.VA[GTValues.LuV]);
    
    // Leptonic Flux Recipe
    event.recipes.gtceu.mixer(id('leptonic_flux_akreyrium'))
        .itemInputs('1x kubejs:amorphous_akreyrium')
        .inputFluids('gtceu:lepton_coalescing_superalloy 864', 'gtceu:lepton_sparse_akreyrium 1000')
        .outputFluids('gtceu:lepton_flux_akreyrium 1000')
        .duration(600)
        .EUt(GTValues.VA[GTValues.UV]);

    // Empty injection catalyst recipe
    event.recipes.gtceu.assembler(id('blank_injection_catalyst'))
        .itemInputs(
            '1x gtceu:petri_dish', '2x kubejs:uhv_microfluidic_flow_valve', '32x gtceu:neutronium_foil',
            '12x kubejs:uhv_high_strength_panel', '8x gtceu:neutronium_screw'
        ).inputFluids('gtceu:polyether_ether_ketone 512')
        .itemOutputs('1x kubejs:blank_injection_catalyst')
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(800)
        .EUt(GTValues.VA[GTValues.UHV]);
    
    event.recipes.gtceu.injection_mixer(id('lepton_flavour_foundational_flux'))
        .itemInputs('1x kubejs:amorphous_akreyrium')
        .inputFluids('gtceu:lepton_coalescing_superalloy 864')
        .outputFluids('gtceu:lepton_flavour_foundational_flux 1000')
        .duration(160)
        .EUt(GTValues.VA[GTValues.UV]);

    // Note: Lepton-Sparse => Sparse Variants is in Core mod because of the XOR function

    //-----------------------------------------------------------------------------
    // TAU BRANCH
    //-----------------------------------------------------------------------------

    // Intermediate to catalyst
    event.recipes.gtceu.mixer(id('light_tau_infusion_flux'))
        .inputFluids('gtceu:mercury 3850', 'gtceu:lepton_flavour_foundational_flux 1000')
        .outputFluids('gtceu:light_tau_infusion_flux 1000')
        .duration(360)
        .EUt(GTValues.VA[GTValues.ZPM]);

    event.recipes.gtceu.distillation_tower(id('light_tau_infusion_flux_decomp'))
        .inputFluids('gtceu:light_tau_infusion_flux 1000')
        .outputFluids('gtceu:superlight_tau_infusion_flux 800', 'gtceu:heavy_tau_infusion_flux 200')
        .itemOutputs('1x kubejs:aspect_of_weight')
        .duration(320)
        .EUt(GTValues.VA[GTValues.UV]);

    event.recipes.gtceu.brewery(id('heavy_tau_conversion'))
        .inputFluids('gtceu:superlight_tau_infusion_flux 1000')
        .itemInputs('1x kubejs:aspect_of_weight')
        .outputFluids('gtceu:heavy_tau_infusion_flux 500')
        .duration(400)
        .EUt(GTValues.VA[GTValues.UV]);

    event.recipes.gtceu.injection_mixer(id('heavy_tau_densification'))
        // TODO: Better idea for "densifying/heavying" items which can be freely
        // consumed.
        .itemInputs('1x kubejs:aspect_of_weight', '1x gtceu:osmiridium_dust')
        .inputFluids('gtceu:heavy_tau_infusion_flux 1000')
        .outputFluids('gtceu:superheavy_tau_infusion_flux 1000')
        .duration(120)
        .EUt(GTValues.VA[GTValues.UV]);

    event.recipes.gtceu.mixer(id('tau_infusion_flux_unification'))
        .itemInputs('1x kubejs:aspect_of_weight')
        .inputFluids('gtceu:superheavy_tau_infusion_flux 2000', 'gtceu:superlight_tau_infusion_flux 2000')
        .outputFluids('gtceu:ethereal_tau_infusion_flux 5000')
        .duration(420)
        .EUt(GTValues.VA[GTValues.UV]);

    // Tau canning
    event.recipes.gtceu.canner(id('tau_canner'))
        .itemInputs('1x kubejs:blank_injection_catalyst')
        .inputFluids('gtceu:ethereal_tau_infusion_flux 125')
        .itemOutputs('1x kubejs:tau_injection_catalyst')
        .duration(200)
        .EUt(GTValues.VA[GTValues.LuV]);
    
    //-----------------------------------------------------------------------------
    // MUON BRANCH
    //-----------------------------------------------------------------------------
    
    // Intermediate to catalyst
    event.recipes.gtceu.mixer(id('twinkling_muon_infusion_flux'))
        .inputFluids('gtceu:glowstone 512', 'gtceu:lepton_flavour_foundational_flux 1000')
        .outputFluids('gtceu:twinkling_muon_infusion_flux 1000')
        .duration(360)
        .EUt(GTValues.VA[GTValues.ZPM]);
    

    // Normal chemical reactor
    event.recipes.gtceu.chemical_reactor(id('twink_muon_lighting'))
        .inputFluids('gtceu:twinkling_muon_infusion_flux 1000', 'minecraft:lava 1000')
        .outputFluids('gtceu:glowing_muon_infusion_flux 1000')
        .duration(360)
        .EUt(GTValues.VA[GTValues.LuV]);
        
    event.recipes.gtceu.chemical_reactor(id('glowing_muon_lighting'))
        .inputFluids('gtceu:glowing_muon_infusion_flux 1000', 'gtceu:blaze 288')
        .outputFluids('gtceu:shining_muon_infusion_flux 1000')
        .duration(460)
        .EUt(GTValues.VA[GTValues.ZPM]);

    event.recipes.gtceu.chemical_reactor(id('shining_muon_lighting'))
        .inputFluids('gtceu:shining_muon_infusion_flux 1000', 'gtceu:lumium 288')
        .outputFluids('gtceu:radiant_muon_infusion_flux 1000')
        .duration(160)
        .EUt(GTValues.VA[GTValues.UV]);
        
    // Large chemical reactor
    event.recipes.gtceu.large_chemical_reactor(id('twinkling_muon_lighting'))
        .inputFluids('gtceu:twinkling_muon_infusion_flux 1000', 'minecraft:lava 1000')
        .outputFluids('gtceu:glowing_muon_infusion_flux 1000')
        .duration(360)
        .EUt(GTValues.VA[GTValues.LuV]);
        
    event.recipes.gtceu.large_chemical_reactor(id('glowing_muon_lighting'))
        .inputFluids('gtceu:glowing_muon_infusion_flux 1000', 'gtceu:blaze 288')
        .outputFluids('gtceu:shining_muon_infusion_flux 1000')
        .duration(460)
        .EUt(GTValues.VA[GTValues.ZPM]);

    event.recipes.gtceu.large_chemical_reactor(id('shining_muon_lighting'))
        .inputFluids('gtceu:shining_muon_infusion_flux 1000', 'gtceu:lumium 288')
        .outputFluids('gtceu:radiant_muon_infusion_flux 1000')
        .duration(160)
        .EUt(GTValues.VA[GTValues.UV]);

    event.recipes.gtceu.injection_mixer(id('muon_unification'))
        .inputFluids('gtceu:twinkling_muon_infusion_flux 1000', 'gtceu:glowing_muon_infusion_flux 1000', 'gtceu:shining_muon_infusion_flux 1000', 'gtceu:radiant_muon_infusion_flux 1000')
        .outputFluids('gtceu:brilliant_muon_infusion_flux 4000')
        .duration(360)
        .EUt(GTValues.VA[GTValues.UV]);

    // Muon canning
    event.recipes.gtceu.canner(id('muon_canner'))
        .itemInputs('1x kubejs:blank_injection_catalyst')
        .inputFluids('gtceu:brilliant_muon_infusion_flux 125')
        .itemOutputs('1x kubejs:muon_injection_catalyst')
        .duration(200)
        .EUt(GTValues.VA[GTValues.LuV]);

    //-----------------------------------------------------------------------------
    // ELECTRON BRANCH
    //-----------------------------------------------------------------------------
    
    // Intermediate to catalyst
    event.recipes.gtceu.mixer(id('mono_phase_electron_infusion_flux'))
        .inputFluids('gtceu:electrum 512', 'gtceu:lepton_flavour_foundational_flux 1000')
        .outputFluids('gtceu:mono_phase_electron_infusion_flux 1000')
        .duration(360)
        .EUt(GTValues.VA[GTValues.ZPM]);
    
    // Agent
    event.recipes.gtceu.distillation_tower(id('di_phase_electron_infusion_agent'))
        .inputFluids('gtceu:mono_phase_electron_infusion_flux 1000')
        .itemOutputs('1x gtceu:di_phase_electron_infusion_agent_dust')
        .outputFluids('gtceu:lepton_coalescing_superalloy 864')
        .duration(140)
        .EUt(GTValues.VA[GTValues.UV]);

    event.recipes.gtceu.polarizer(id('tri_phase_electron_infusion_agent'))
        .itemInputs('1x gtceu:di_phase_electron_infusion_agent_dust')
        .itemOutputs('1x gtceu:tri_phase_electron_infusion_agent_dust')
        .duration(160)
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.electromagnetic_separator(id('tri_phase_separation'))
        .itemInputs('1x gtceu:tri_phase_electron_infusion_agent_dust')
        .itemOutputs('10x gtceu:weak_gamma_phase_electron_infusion_agent_dust', '5x gtceu:weak_beta_phase_electron_infusion_agent_dust', '1x gtceu:alpha_phase_electron_infusion_agent_dust')
        .duration(360)
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.mixer(id('weak_gamma_phase'))
        .itemInputs('1x gtceu:weak_gamma_phase_electron_infusion_agent_dust', '1x gtceu:annealed_copper_dust')
        .itemOutputs('1x gtceu:gamma_phase_electron_infusion_agent_dust')
        .duration(80)
        .EUt(GTValues.VA[GTValues.UV]);

    event.recipes.gtceu.mixer(id('weak_beta_phase'))
        .itemInputs('1x gtceu:weak_beta_phase_electron_infusion_agent_dust', '1x gtceu:sterling_silver_dust')
        .itemOutputs('1x gtceu:beta_phase_electron_infusion_agent_dust')
        .duration(160)
        .EUt(GTValues.VA[GTValues.UV]);

    event.recipes.gtceu.polarizer(id('gamma_phase_electron_infusion_agent'))
        .itemInputs('1x gtceu:gamma_phase_electron_infusion_agent_dust')
        .itemOutputs('1x gtceu:beta_phase_electron_infusion_agent_dust')
        .duration(75)
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.polarizer(id('beta_phase_electron_infusion_agent_dust'))
        .itemInputs('1x gtceu:beta_phase_electron_infusion_agent_dust')
        .itemOutputs('1x gtceu:alpha_phase_electron_infusion_agent_dust')
        .duration(100)
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.injection_mixer(id('electron_unification'))
        .inputFluids('gtceu:lepton_coalescing_superalloy 864')
        .itemInputs('16x gtceu:alpha_phase_electron_infusion_agent_dust')
        .outputFluids('gtceu:alternating_phase_electron_infusion_flux 1000')
        .duration(360)
        .EUt(GTValues.VA[GTValues.UV]);

    // Electron canning
    event.recipes.gtceu.canner(id('electron_canner'))
        .itemInputs('1x kubejs:blank_injection_catalyst')
        .inputFluids('gtceu:alternating_phase_electron_infusion_flux 125')
        .itemOutputs('1x kubejs:electron_injection_catalyst')
        .duration(200)
        .EUt(GTValues.VA[GTValues.LuV]);
    
    // Injection
    const add_injection_recipe = (akreyType, amount, catalyst) => {
        event.recipes.gtceu.injection_mixer(id(`${akreyType}_${amount}_${catalyst}`))
            .itemInputs(`1x kubejs:${catalyst}_injection_catalyst`)
            .itemOutputs('1x kubejs:damaged_injection_catalyst')
            .inputFluids(`gtceu:sparse_${akreyType}_akreyrium 1000`)
            .outputFluids(`gtceu:dense_${akreyType}_akreyrium ${amount}`)
            .duration(200)
            .EUt(GTValues.VHA[GTValues.UHV]);
    }

    add_injection_recipe('tau', 1000, 'tau');
    add_injection_recipe('muon', 200, 'tau');
    add_injection_recipe('electron', 200, 'tau');

    add_injection_recipe('tau', 200, 'muon');
    add_injection_recipe('muon', 1000, 'muon');
    add_injection_recipe('electron', 200, 'muon');

    add_injection_recipe('tau', 200, 'electron');
    add_injection_recipe('muon', 200, 'electron');
    add_injection_recipe('electron', 1000, 'electron');

    // Damaged fixing
    event.recipes.gtceu.assembler(id('damaged_injection_catalyst_washing'))
        .itemInputs('1x kubejs:damaged_injection_catalyst')
        .inputFluids('gtceu:neutronium 80')
        .itemOutputs('1x kubejs:blank_injection_catalyst')
        .duration(360)
        .cleanroom(CleanroomType.CLEANROOM)
        .EUt(GTValues.VA[GTValues.UV]);

    // Stabilisation recipes
    event.recipes.gtceu.folding_akreyrium_stabiliser(id('lepton_flux_stabilisation'))
        .inputFluids('gtceu:lepton_flux_akreyrium 1000')
        .itemInputs('1x kubejs:crystalline_akreyrium', '1x gtceu:gray_glass_lens')
        .itemOutputs('1x gtceu:gray_glass_lens')
        .outputFluids('gtceu:utopian_akreyrium 10', 'gtceu:lepton_coalescing_superalloy 720')
        .duration(1200)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.folding_akreyrium_stabiliser(id('electron_stabilisation'))
        .inputFluids('gtceu:dense_electron_akreyrium 1000')
        .itemInputs('1x kubejs:crystalline_akreyrium', '1x gtceu:magenta_glass_lens')
        .itemOutputs('1x gtceu:magenta_glass_lens')
        .outputFluids('gtceu:utopian_akreyrium 500', 'gtceu:lepton_coalescing_superalloy 90')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.folding_akreyrium_stabiliser(id('muon_stabilisation'))
        .inputFluids('gtceu:dense_muon_akreyrium 1000')
        .itemInputs('1x kubejs:crystalline_akreyrium', '1x gtceu:lime_glass_lens')
        .itemOutputs('1x gtceu:lime_glass_lens')
        .outputFluids('gtceu:utopian_akreyrium 500', 'gtceu:lepton_coalescing_superalloy 90')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.folding_akreyrium_stabiliser(id('tau_stabilisation'))
        .inputFluids('gtceu:dense_tau_akreyrium 1000')
        .itemInputs('1x kubejs:crystalline_akreyrium', '1x gtceu:light_blue_glass_lens')
        .itemOutputs('1x gtceu:light_blue_glass_lens')
        .outputFluids('gtceu:utopian_akreyrium 500', 'gtceu:lepton_coalescing_superalloy 90')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.UHV]);
});