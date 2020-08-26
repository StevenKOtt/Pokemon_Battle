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
            console.log(data) //A LOT OF THE BELOW DATA IS TO SET THE STATS, IMAGE, NAME AND TYPE OF THE POKEMON
            $('#pokemonImage').html(`<img src=${data.sprites.other["official-artwork"].front_default}>`)
            pendingPokemon.sprite = data.sprites.other["official-artwork"].front_default;
            $('#pokeName').html(data.name)
            pendingPokemon.name = data.name;
            $('#pokeType').html(data.types[0].type.name);
            pendingPokemon.type = data.types[0].type.name;
            $('#pokeHealth').html(data.stats[0].base_stat)
            pendingPokemon.health = data.stats[0].base_stat;
            $('#pokeAttack').html(data.stats[1].base_stat)
            pendingPokemon.attack = data.stats[1].base_stat;
            $('#pokeDefense').html(data.stats[2].base_stat)
            pendingPokemon.defense = data.stats[2].base_stat;
            $('#pokeSpecialAtt').html(data.stats[3].base_stat)
            pendingPokemon.specialAtt = data.stats[3].base_stat;
            $('#pokeSpecialDef').html(data.stats[4].base_stat)
            pendingPokemon.specialDef = data.stats[4].base_stat;
            $('#pokeSpeed').html(data.stats[5].base_stat)
            pendingPokemon.speed = data.stats[5].base_stat;
            $('dl').css('display','block')
            $('#confirm').css('display','block')
            pendingPokemon.attackMove =[];
            for(let i = 1; i <= 4; i++) {
                let attack = {};
                attack = data.moves[Math.floor(Math.random() * data.moves.length)]
                $(`#att${i}`).html(attack.move.name)
                pendingPokemon.attackMove.push(attack);
                console.log(pendingPokemon)
                pokeMoveInfo(pendingPokemon.attackMove[i-1].move.url, i)
            }
        },
        ()=>{
            console.log('bad');
        }
    )
})
const pokeMoveInfo = (apiURL,index) => {
 $.ajax({
     url:apiURL
 }).then(
     (attackData)=>{
        pendingPokemon.attackMove[index-1].move.power = attackData.power
        pendingPokemon.attackMove[index-1].move.priority = attackData.priority
        pendingPokemon.attackMove[index-1].move.accuracy = attackData.accuracy
        pendingPokemon.attackMove[index-1].move.type = attackData.type.name
     },
     ()=> {
         console.log("Did not pull attack moves")
     }
 )
}




//THIS ASSIGNNMENTS THE POKEMON TO EACH CORRESPONDING PLAYER. IT WILL RUN THE PUT POKEMON ON THE BATTLE FIELD FUNCTION TO PLACE.
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

//THIS PUTS THE POKEMON, NAME, And ATTACK MOVES ON THE FIELD.
const putPokemonOnBattlefield = (player) => {

    if(player == 1) {
        $("#pokemonImage img").toggle({ effect: "scale", direction: "horizontal" })
        $("dl").toggle({ effect: "scale", direction: "horizontal" })
        $("#confirm").toggle({ effect: "scale", direction: "horizontal" })
        $(`#player1 > info > h2`).text(player1Pokemon.name)
        $("#player1 #pokeImage").html(`<img src=${player1Pokemon.sprite}>`)
        $("#player1").fadeIn("slow")
        $("#player1 #pokeImage").effect("shake")
        for(let i = 1; i<=4; i++) {
            $(`#player1Attacks li:nth-child(${i})`).attr("id",`${player1Pokemon.attackMove[i-1].move.name}`).html(`${player1Pokemon.attackMove[i-1].move.name}`)
        }
        const pokeballPop = new Audio("./sounds/pokeballpop.mp3")
        pokeballPop.play();
    }
    else {
        $("#pokemonImage img").toggle({ effect: "scale", direction: "horizontal" })
        $("dl").toggle({ effect: "scale", direction: "horizontal" })
        $("#confirm").toggle({ effect: "scale", direction: "horizontal" })
        $(`#player2 > info > h2`).text(player2Pokemon.name)
        $("#player2 #pokeImage").html(`<img src=${player2Pokemon.sprite}>`)
        $("#player2").fadeIn("slow")
        $("#player2 #pokeImage").effect("shake")
        for(let i = 1; i<=4; i++) {
            $(`#player2Attacks li:nth-child(${i})`).attr("id",`${player2Pokemon.attackMove[i-1].move.name}`).html(`${player2Pokemon.attackMove[i-1].move.name}`)
        }
        const pokeballPop = new Audio("./sounds/pokeballpop.mp3")
        pokeballPop.play();

    }
}





$('#confirm').on('click', assignPokemon)