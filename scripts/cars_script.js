/**
 * script for index.html
 */


class Manufacturer{
	
	constructor(manufacturer_name){
		
		this.manufacturer_name = manufacturer_name;
		this.models = [];
	}

	
	addModel(model){
		
		if(!this.models.includes(model)){ // if the car isn't already in models[] pushes that model in models[].
			this.models.push(model);
			console.log("car added.");
		}else{
			console.log(model + "is already in.");
		}
	}
	
	
	removeModel(model){
		
		const index_model = this.models.indexOf(model);
		if(index_model != -1){
			this.models.splice([index_model],1);
			console.log(model + " has been removed.");
		}else{
			console.log( model + " isn't in the array models.");
		}
	}
	getModels(){
		
		return this.models; 
	}
}

class ManufacturerPool{
	
	constructor(){
		
		this.manufacturers_array = [];
	}
	
	
	checkManufacturers(manufacturer_name){
		
		let state = false;
		let ret_index = 0;
		this.manufacturers_array.forEach(function(element,index){
			const properties = Object.values(element);
			if(properties[0] == manufacturer_name){
				state = true;
				ret_index = index;
				
			}
		});
		return [state,ret_index];
	}
	
	
	createNewManufacturer(manufacturer_name){
		
		if(this.checkManufacturers(manufacturer_name)[0]){
				console.log("Error: " + manufacturer_name + " is already in.");
		}else{
				const manu = new Manufacturer(manufacturer_name);
				this.manufacturers_array.push(manu);
				console.log(manufacturer_name + " added");
		}
	}
	
	
	deleteManufacturer(manufacturer_name){
		
		const check = this.checkManufacturers(manufacturer_name);
		if(check[0]){
			this.manufacturers_array.splice(check[1],1)
			console.log("success " + manufacturer_name + " deleted.");
		}else{
			console.log("Error: " + manufacturer_name + " isn't in the array.");
		}
	}
	
	get listManufacturers(){
		return this.manufacturers_array;
	}
	
	getManufacturer(manufacturer_name){
		
		const manufacturer_index = this.checkManufacturers(manufacturer_name)[1];
		return this.manufacturers_array[manufacturer_index];
	}
	
}


window.onload = function(){
	
	/*const audi = new manufacturer("audi");
	audi.addModel("a4");
	const show = audi.getModels();
	console.log(show);
	audi.addModel("a4");
	audi.addModel("a5");
	console.log(show);
	audi.removeModel("a4");
	console.log(show);*/
	/*createNewManufacturer("audi");
	createNewManufacturer("mercedes");
	createNewManufacturer("mercedes");
	console.log(manufacturers_array);
	manufacturers_array.forEach(function(element){
		list = Object.values(element)
		console.log(list[0]);
	});*/
	const pool = new ManufacturerPool();
	pool.createNewManufacturer("audi");
	pool.createNewManufacturer("mercedes");
	pool.createNewManufacturer("audi");
	list = pool.listManufacturers;
	console.log(list);
	pool.deleteManufacturer("mercedes");
	console.log(list);
	pool.createNewManufacturer("Porsche");
	console.log(list);
	pool.deleteManufacturer("audi");
	pool.deleteManufacturer("opel");
	console.log(list);
	const manufacturer = pool.getManufacturer("Porsche");
	manufacturer.addModel("911");
	manufacturer.addModel("GT2");
	const listMod = manufacturer.getModels();
	console.log(listMod);
	manufacturer.removeModel("911");
	manufacturer.removeModel("cayman");
	console.log(listMod);
	manufacturer.addModel("GT2");
	console.log(listMod);
	console.log(list);




}