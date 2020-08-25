let player1Pokemon = {};
let player2Pokemon = {};
let pendingPokemon = {};


$('form').on('submit', (event)=>{

    event.preventDefault();

    const userInput = $('input[type="text"]').val().toLowerCase();

$.ajax({
    url:'https://pokeapi.co/api/v2/pokemon/' + userInput
    }).then(
        (data)=>{
            console.log(data)
            $('#pokemonImage').html(`<img src=${data.sprites.other["official-artwork"].front_default}>`)
            $('#pokeName').html(data.name)
            $('#pokeType').html(data.types[0].type.name);
            $('#pokeHealth').html(data.stats[0].base_stat)
            $('#pokeAttack').html(data.stats[1].base_stat)
            $('#pokeDefense').html(data.stats[2].base_stat)
            $('#pokeSpecialAtt').html(data.stats[3].base_stat)
            $('#pokeSpecialDef').html(data.stats[4].base_stat)
            $('#pokeSpeed').html(data.stats[5].base_stat)
            pendingPokemon = data;
        },
        ()=>{
            console.log('bad');
        }
    )
})

const assignPokemon = () => {
    let assignment = prompt("Is this for player: 1 or 2?");
    if(assignment == 1) {
        player1Pokemon = pendingPokemon
      putPokemonOnBattlefield(assignment);
    }
    else if (assignment == 2) {
        player2Pokemon = pendingPokemon
      putPokemonOnBattlefield(assignment);
    }
    else {
        console.log("BAD CHOICE MR.")
    }    
}

const putPokemonOnBattlefield = (player) => {

    if(player == 1) {
        $("#pokemonImage img").toggle({ effect: "scale", direction: "horizontal" })
        $(`#player1 > info > h2`).text(player1Pokemon.name)
        $("#player1 #pokeImage").html(`<img src=${player1Pokemon.sprites.other["official-artwork"].front_default}>`)
        $("#player1").fadeIn("slow")
        $("#player1 #pokeImage").effect("shake")
        const pokeballPop = new Audio("./sounds/pokeballpop.mp3")
        pokeballPop.play();
    }
    else {
        $("#pokemonImage img").toggle({ effect: "scale", direction: "horizontal" })
        $(`#player2 > info > h2`).text(player2Pokemon.name)
        $("#player2 #pokeImage").html(`<img src=${player2Pokemon.sprites.other["official-artwork"].front_default}>`)
        $("#player2").fadeIn("slow")
        $("#player2 #pokeImage").effect("shake")
        const pokeballPop = new Audio("./sounds/pokeballpop.mp3")
        pokeballPop.play();
    }
}





$('#confirm').on('click', assignPokemon)