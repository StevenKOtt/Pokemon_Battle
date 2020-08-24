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
            $('#pokeName').html(data.name);
            $('#pokeType').html(data.types[0].type.name);
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
      console.log("This is " + player1Pokemon.name)
      console.log("this is " + player2Pokemon.name)
      putPokemonOnBattlefield();
    }
    else if (assignment == 2) {
        player2Pokemon = pendingPokemon
      console.log("This is " + player2Pokemon.name) 
      console.log("This is " + player1Pokemon.name)
    }
    else {
        console.log("BAD CHOICE MR.")
    }    
}

const putPokemonOnBattlefield = (player) => {
    
}


$('#confirm').on('click', assignPokemon)