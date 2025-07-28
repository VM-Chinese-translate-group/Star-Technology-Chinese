ServerEvents.recipes(event => {
    const id = global.id;

    // Credit for the idea of uncrafting Crafting Storage and Storage Cells in packers goes to AncientSkies

    //housings
    
    event.replaceInput({ id: 'ae2:network/cells/item_cell_housing'}, 'minecraft:iron_ingot', 'gtceu:diamond_skystone_alloy_plate');
    event.replaceInput({ id: 'ae2:network/cells/fluid_cell_housing'}, 'minecraft:copper_ingot', 'gtceu:gold_skystone_alloy_plate');

    event.remove({id: 'megacells:cells/mega_item_cell_housing'});
    event.recipes.gtceu.assembler(id('mega_item_cell_housing'))
            .itemInputs(['6x gtceu:netherite_certus_quartz_skystone_alloy_plate','gtceu:laminated_glass','4x #gtceu:circuits/ev'])
            .inputFluids('gtceu:fluix_steel 576')
            .itemOutputs('megacells:mega_item_cell_housing')
            .duration(400)
            .EUt(2048);

    event.remove({id: 'megacells:cells/mega_fluid_cell_housing'});
    event.recipes.gtceu.assembler(id('mega_fluid_cell_housing'))
            .itemInputs(['6x gtceu:netherite_gold_skystone_alloy_plate','gtceu:laminated_glass','4x #gtceu:circuits/ev'])
            .inputFluids('gtceu:fluix_steel 576')
            .itemOutputs('megacells:mega_fluid_cell_housing')
            .duration(400)
            .EUt(2048);

    //storage cells

    const packaging = (tier, type, mat) => {
        //Base
        event.remove({output: `ae2:${type}_storage_cell_${tier}k`})
        event.recipes.gtceu.assembler(id(`${type}_storage_cell_${tier}k`))
            .itemInputs('gtceu:sky_steel_frame', `ae2:cell_component_${tier}k`, '8x gtceu:ram_chip', `4x gtceu:${mat}_skystone_alloy_plate`)
            .inputFluids('gtceu:soldering_alloy 144')
            .itemOutputs(`ae2:${type}_storage_cell_${tier}k`)
            .duration(400)
            .EUt(128);

        event.recipes.gtceu.canner(id(`${type}_storage_cell_${tier}k`))
            .itemInputs(`ae2:${type}_cell_housing`, `ae2:cell_component_${tier}k`)
            .itemOutputs(`ae2:${type}_storage_cell_${tier}k`)
            .duration(400)
            .EUt(128);
            
        event.recipes.gtceu.packer(id(`${type}_cell_${tier}k_uncrafting`))
            .itemInputs(`ae2:${type}_storage_cell_${tier}k`)
            .itemOutputs(`ae2:${type}_cell_housing`, `ae2:cell_component_${tier}k`)
            .circuit(2)
            .duration(100)
            .EUt(7);

        //MEGA
        event.remove({output: `megacells:${type}_storage_cell_${tier}m`})
        event.recipes.gtceu.assembler(id(`${type}_storage_cell_${tier}m`))
            .itemInputs(`6x gtceu:netherite_${mat}_skystone_alloy_plate`,`megacells:cell_component_${tier}m`,'gtceu:laminated_glass','4x #gtceu:circuits/ev')
            .inputFluids('gtceu:fluix_steel 576')
            .itemOutputs(`megacells:${type}_storage_cell_${tier}m`)
            .duration(400)
            .EUt(8192*tier);

        event.recipes.gtceu.canner(id(`${type}_storage_cell_${tier}m`))
            .itemInputs(`megacells:mega_${type}_cell_housing`, `megacells:cell_component_${tier}m`)
            .itemOutputs(`megacells:${type}_storage_cell_${tier}m`)
            .duration(400)
            .EUt(8192*tier);
            
        event.recipes.gtceu.packer(id(`${type}_cell_${tier}m_uncrafting`))
            .itemInputs(`megacells:${type}_storage_cell_${tier}m`)
            .itemOutputs(`megacells:mega_${type}_cell_housing`, `megacells:cell_component_${tier}m`)
            .circuit(2)
            .duration(100)
            .EUt(7);
    }

    ['1', '4', '16', '64', '256'].forEach(tier => {
        packaging(tier, 'item', 'certus_quartz');
        packaging(tier, 'fluid', 'gold');
    });

    event.remove({id: 'megacells:cells/standard/bulk_item_cell'});
    event.recipes.gtceu.assembler(id('bulk_item_cell'))
            .itemInputs(`6x gtceu:netherite_certus_quartz_skystone_alloy_plate`,'megacells:bulk_cell_component','gtceu:laminated_glass','4x #gtceu:circuits/ev')
            .inputFluids('gtceu:fluix_steel 576')
            .itemOutputs('megacells:bulk_item_cell')
            .duration(400)
            .EUt(8192);

    //crafting storage

    ['1', '4', '16', '64', '256'].forEach(tier => {
        //Base
        event.remove({output: `ae2:${tier}k_crafting_storage`})
        event.recipes.gtceu.canner(id(`${tier}k_crafting_storage`))
            .itemInputs('ae2:crafting_unit', `ae2:cell_component_${tier}k`)
            .itemOutputs(`ae2:${tier}k_crafting_storage`)
            .duration(200)
            .EUt(128);

        event.recipes.gtceu.packer(id(`crafting_storage_${tier}k_uncrafting`))
            .itemInputs(`ae2:${tier}k_crafting_storage`)
            .itemOutputs(`ae2:cell_component_${tier}k`,'ae2:crafting_unit')
            .circuit(2)
            .duration(100)
            .EUt(7);

        //MEGA
        event.remove({output: `megacells:${tier}m_crafting_storage`})
        event.recipes.gtceu.canner(id(`${tier}m_crafting_storage`))
            .itemInputs('megacells:mega_crafting_unit', `megacells:cell_component_${tier}m`)
            .itemOutputs(`megacells:${tier}m_crafting_storage`)
            .duration(200)
            .EUt(128);

        event.recipes.gtceu.packer(id(`crafting_storage_${tier}m_uncrafting`))
            .itemInputs(`megacells:${tier}m_crafting_storage`)
            .itemOutputs('megacells:mega_crafting_unit', `megacells:cell_component_${tier}m`)
            .circuit(2)
            .duration(100)
            .EUt(7);

    });

    const canner = (output, catalyst) => {
        event.remove({output: `ae2:crafting_${output}`})
        event.recipes.gtceu.canner(id(`crafting_${output}`))
            .itemInputs('ae2:crafting_unit', `ae2:${catalyst}`)
            .itemOutputs(`ae2:crafting_${output}`)
            .duration(200)
            .EUt(128);

        event.recipes.gtceu.packer(id(`crafting_${output}_uncrafting`))
            .itemInputs(`ae2:crafting_${output}`)
            .itemOutputs('ae2:crafting_unit', `ae2:${catalyst}`)
            .circuit(2)
            .duration(100)
            .EUt(7);
            
        event.remove({output: `megacells:mega_crafting_${output}`})
        event.recipes.gtceu.canner(id(`mega_crafting_${output}`))
            .itemInputs('megacells:mega_crafting_unit', `ae2:${catalyst}`)
            .itemOutputs(`megacells:mega_crafting_${output}`)
            .duration(200)
            .EUt(128);

        event.recipes.gtceu.packer(id(`mega_crafting_${output}_uncrafting`))
            .itemInputs(`megacells:mega_crafting_${output}`)
            .itemOutputs('megacells:mega_crafting_unit', `ae2:${catalyst}`)
            .circuit(2)
            .duration(100)
            .EUt(7);
    }

    canner('accelerator', 'engineering_processor');
    canner('monitor', 'storage_monitor');

    ['2', '16', '128'].forEach(tier => {
        event.remove({output: `ae2:spatial_storage_cell_${tier}`})
        event.recipes.gtceu.assembler(id(`spatial_storage_cell_${tier}`))
            .itemInputs('gtceu:sky_steel_frame', `ae2:spatial_cell_component_${tier}`, '8x gtceu:ram_chip', `4x gtceu:certus_quartz_skystone_alloy_plate`)
            .inputFluids('gtceu:soldering_alloy 144')
            .itemOutputs(`ae2:spatial_storage_cell_${tier}`)
            .duration(400)
            .EUt(128);

        event.recipes.gtceu.canner(id(`spatial_storage_cell_${tier}`))
            .itemInputs('ae2:item_cell_housing', `ae2:spatial_cell_component_${tier}`)
            .itemOutputs(`ae2:spatial_storage_cell_${tier}`)
            .duration(400)
            .EUt(128);
            
        event.recipes.gtceu.packer(id(`spatial_cell_${tier}_uncrafting`))
            .itemInputs(`ae2:spatial_storage_cell_${tier}`)
            .itemOutputs('ae2:item_cell_housing', `ae2:spatial_cell_component_${tier}`)
            .circuit(2)
            .duration(100)
            .EUt(7);
    })

});