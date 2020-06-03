function populateUFs() {
    const ufSelect = document.querySelector("[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json())
        .then( states => {
            for( state of states) {
                ufSelect.innerHTML += '<option value="'+state.id+'">'+state.nome+'</option>';
            }
            
        })
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("[name=state]");
    citySelect.innerHTML="";
    stateInput.value = event.target.options[event.target.selectedIndex].text;
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+event.target.value+"/municipios")
        .then( res => res.json())
        .then( cities => {
            for( city of cities) {
                citySelect.innerHTML += '<option value="'+city.id+'">'+city.nome+'</option>';
            }
            citySelect.disabled = false;
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);



