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
	
	listManufacturers(){
		return this.manufacturers_array;
	}
	
	getManufacturer(manufacturer_name){
		
		const manufacturer_index = this.checkManufacturers(manufacturer_name)[1];
		return this.manufacturers_array[manufacturer_index];
	}
	
}


window.onload = function(){
	
	var focused_man = undefined;
	var focused_model = undefined;	

	const text_manufacturer = document.getElementById("text_manufacturer");
	
	const man_section = document.getElementById("manufacturers_section");
	const man_list = document.getElementById("manufacturers_list");
	const add_man_button = document.getElementById("add_manufacturer_button");
	const del_man_button = document.getElementById("remove_manufacturer_button");
	
	const text_model = document.getElementById("text_model");
	const models_section = document.getElementById("models_section");
	const models_list = document.getElementById("models_list");
	const add_model_button = document.getElementById("add_model_button");
	const del_model_button = document.getElementById("remove_model_button");
	
	const newPool = new ManufacturerPool();
	
	function updateModels(){
		
		models_section.innerHTML = ""; //resets the list
		const man_selected = newPool.getManufacturer(focused_man.innerHTML);
		const models_list = man_selected.getModels();
		models_list.forEach(function(element){
			const new_li = document.createElement("li");
			new_li.setAttribute("class","li_model");
			new_li.innerHTML = element;
			new_li.addEventListener("click",focusModel);
			models_section.appendChild(new_li);
		});
	}
	
	
	function delModel(){
	
		const manufacturer = newPool.getManufacturer(focused_man.innerHTML);
		manufacturer.removeModel(text_model.value);
		updateModels();
	}
	
	
	function addModel(){
		
		if(focused_man == undefined){
			console.log("You have to select a manufacturer first.")
		}
		const manufacturer = newPool.getManufacturer(focused_man.innerHTML);
		manufacturer.addModel(text_model.value);
		updateModels();
	}
	
	
	function focusMan(){
		
		if(focused_man != undefined){
			focused_man.style.backgroundColor = "";
		}
		focused_man = this;
		focused_man.style.backgroundColor = "grey";
		updateModels(this.innerHTML);
	}
	
	function focusModel(){
		
		if(focused_model != undefined){
			focused_model.style.backgroundColor = "";
		}
		focused_model = this;
		focused_model.style.backgroundColor = "grey";
	}
	
	
	function updateMan(man_li){
		man_section.innerHTML = "";
		const list = newPool.listManufacturers();
		list.forEach(function(element){
			const new_li = document.createElement("li");
			new_li.setAttribute("class","li_man");
			new_li.addEventListener("click",focusMan);
			man_section.appendChild(new_li);
			const attr = Object.values(element);
			new_li.innerHTML = attr[0];
		});
	}
	
	
	add_man_button.addEventListener("click",function(){newPool.createNewManufacturer(text_manufacturer.value);updateMan()});
	del_man_button.addEventListener("click",function(){newPool.deleteManufacturer(text_manufacturer.value);updateMan()});
	
	add_model_button.addEventListener("click",addModel);
	del_model_button.addEventListener("click",delModel);
}