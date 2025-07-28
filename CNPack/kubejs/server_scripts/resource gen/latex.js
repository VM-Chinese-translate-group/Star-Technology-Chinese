ServerEvents.recipes(event => {
    const id = global.id;

    if (global.packmode !== 'hard'){
        (() => {   
    
    //Early Rubbers
    event.custom({
        'type': 'farmersdelight:cooking',
        'recipe_book_tab': 'misc',
        'ingredients': [
          {
            'item': 'thermal:rubber'
          },
          {
            'item': 'gtceu:small_sulfur_dust'
          }
        ],
        'result': {
          'item': 'thermal:cured_rubber',
          'count': 1,
        },
        'cookingtime': 200
      });

    event.recipes.create.mixing('3x thermal:cured_rubber', ['3x thermal:rubber', '#forge:dusts/sulfur']).heatRequirement('lowheated').id('start:create_mixing/cured_rubber');

    event.recipes.gtceu.alloy_smelter(id('latex_rubber'))
        .itemInputs('3x thermal:rubber', 'gtceu:sulfur_dust')
        .itemOutputs('3x thermal:cured_rubber')
        .duration(240)
        .EUt(8);

    // Controller Block
    event.shaped('gtceu:latex_plantation', [
		'RSR',
		'PGP',
		'BTB'
	], {
		R: 'gtceu:iron_rod',
		S: 'gtceu:lead_spring',
		P: 'gtceu:iron_plate',
		G: '#forge:glass',
		B: 'minecraft:bricks',
		T: 'thermal:redstone_servo'
	}).id('start:shaped/latex_plantation');
  

    //Usage
  event.recipes.gtceu.latex_plantation(id(`latex`))
		.notConsumable('gtceu:wood_screw')
		.outputFluids(`thermal:latex 100`)
		.duration(400);
    const latexType = [{ fuel: 'minecraft:bone_meal', circ: '1' }, { fuel: 'thermal:compost', circ: '2' }, { fuel: 'gtceu:fertilizer', circ: '3' }]
	latexType.forEach(latex => {
		event.recipes.gtceu.latex_plantation(id(`latex_${latex.circ}`))
			.chancedInput(`${latex.fuel}`, 2500, 0)
			.notConsumable('gtceu:iron_screw')
			.circuit(latex.circ)
			.outputFluids(`thermal:latex ${100 + 50 * latex.circ}`)
			.duration(400);
	});
	  })()
    }

});