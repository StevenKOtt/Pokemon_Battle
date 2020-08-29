let player1Pokemon = {};
let player2Pokemon = {};
let pendingPokemon = {};
let currentIndex = 0;
let playerready = 0;


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
            $('#pokeHealth').html(data.stats[0].base_stat * 2 + 110)
            pendingPokemon.health = data.stats[0].base_stat * 2 +110;
            $('#pokeAttack').html(data.stats[1].base_stat * 2 + 5)
            pendingPokemon.attack = data.stats[1].base_stat  * 2 + 5;
            $('#pokeDefense').html(data.stats[2].base_stat  * 2 + 5)
            pendingPokemon.defense = data.stats[2].base_stat  * 2 + 5;
            $('#pokeSpecialAtt').html(data.stats[3].base_stat  * 2 + 5)
            pendingPokemon.specialAtt = data.stats[3].base_stat  * 2 + 5;
            $('#pokeSpecialDef').html(data.stats[4].base_stat  * 2 + 5)
            pendingPokemon.specialDef = data.stats[4].base_stat  * 2 + 5;
            $('#pokeSpeed').html(data.stats[5].base_stat  * 2 + 5)
            pendingPokemon.speed = data.stats[5].base_stat  * 2 + 5;
            $('dl').css('display','block')
            $('#confirm').css('display','block')
            $('#playerchoices').css('display','block')
            pendingPokemon.attackMove =[];
            for(let i = 1; i <= 4; i++) {
                let attack = {};
                attack = data.moves[Math.floor(Math.random() * data.moves.length)]
                $(`#att${i}`).html(attack.move.name)
                pendingPokemon.attackMove.push(attack);
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
        if(pendingPokemon.attackMove[index-1].move.power == 0 || pendingPokemon.attackMove[index-1].move.power == null) {
            pendingPokemon.attackMove[index-1].move.power = Math.floor(Math.random() * 101)
        }
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
    // let assignment = prompt("Is this for player: 1 or 2?");
    // console.log($('input[name="player1"]:checked').val() == "player1")
    if($('input[name="choice"]:checked').val() == "player1") {
        player1Pokemon = pendingPokemon
        pendingPokemon = {};
        playerready ++;
      putPokemonOnBattlefield(1);
       
    }
    else if ($('input[name="choice"]:checked').val() == "player2") {
        player2Pokemon = pendingPokemon
        playerready++
      putPokemonOnBattlefield(2);

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
        $('#playerchoices').toggle({ effect: "scale", direction: "horizontal" })
        $(`#player1 > info > h2`).text(player1Pokemon.name)
        $("#player1 #pokeImage").html(`<img src=${player1Pokemon.sprite}>`)
        $(`#player1 > info > progress`).attr({"value":player1Pokemon.health, "max":player1Pokemon.health, "id":"player1health"})
        $("#player1").fadeIn("slow")
        $("#player1 #pokeImage").effect("shake")
        for(let i = 1; i<=4; i++) {
            $(`#player1Attacks li:nth-child(${i})`).attr("id",`${player1Pokemon.attackMove[i-1].move.name}`).html(`${player1Pokemon.attackMove[i-1].move.name}`)
        }
        const pokeballPop = new Audio("./sounds/pokeballpop.mp3")
        pokeballPop.play();1
        $("#informationBar").text("Player 1 has chose " + player1Pokemon.name)
    }
    else {
        $("#pokemonImage img").toggle({ effect: "scale", direction: "horizontal" })
        $("dl").toggle({ effect: "scale", direction: "horizontal" })
        $("#confirm").toggle({ effect: "scale", direction: "horizontal" })
        $('#playerchoices').toggle({ effect: "scale", direction: "horizontal" })
        $(`#player2 > info > h2`).text(player2Pokemon.name)
        $("#player2 #pokeImage").html(`<img src=${player2Pokemon.sprite}>`)
        $(`#player2 > info > progress`).attr({"value":player2Pokemon.health, "max":player2Pokemon.health, "id":"player2health"})
        $("#player2").fadeIn("slow")
        $("#player2 #pokeImage").effect("shake")
        for(let i = 1; i<=4; i++) {
            $(`#player2Attacks li:nth-child(${i})`).attr("id",`${player2Pokemon.attackMove[i-1].move.name}`).html(`${player2Pokemon.attackMove[i-1].move.name}`)
        }
        const pokeballPop = new Audio("./sounds/pokeballpop.mp3")
        pokeballPop.play();
        $("#informationBar").text("Player 2 has chose " + player2Pokemon.name)

    }
    if (playerready == 2) {
        $("#informationBar").text("Player 1 it is your turn!")
        $("#player1Attacks").fadeIn();
        $("#info").fadeOut();
    }
}

const damageChecker = (attackmove, player) => {
    if( player == 1) {
        console.log(((((((2*100/5+2)*player1Pokemon.attack*attackmove.power)/player2Pokemon.defense)/50)+2)*Math.floor(Math.random()+(255 - 217) + 217))/255)
        return ((((((2*100/5+2)*player1Pokemon.attack*attackmove.power)/player2Pokemon.defense)/50)+2)*Math.floor(Math.random()+(255 - 217) + 217))/255
    }
    else {
        console.log(((((((2*100/5+2)*player2Pokemon.attack*attackmove.power)/player1Pokemon.defense)/50)+2)*Math.floor(Math.random()+(255 - 217) + 217))/255)
        return ((((((2*100/5+2)*player2Pokemon.attack*attackmove.power)/player1Pokemon.defense)/50)+2)*Math.floor(Math.random()+(255 - 217) + 217))/255
    }

}
const pokemonAttacks = (event) => {
    console.log($(event.currentTarget))
    console.log(($(event.currentTarget).parent())[0].id);
    if(($(event.currentTarget).parent())[0].id == "player1Attacks") {
        let attacknum = $(event.currentTarget)[0].className
        attacknum = parseInt(attacknum.slice((-1)))
        console.log(player1Pokemon)
        console.log(player1Pokemon.attackMove[attacknum -1].move)
        player2Pokemon.health-= damageChecker(player1Pokemon.attackMove[attacknum - 1].move, 1)
        $("#player2health").attr("value", player2Pokemon.health)
        console.log($("#player2health"))

        $("#player2Attacks").css("display","block")
        $("#player1Attacks").css("display","none")
        $("#informationBar").text("Player 1 has attacked! Player 2 it is your turn!")
        pokemonDown(1);
    }
    else {
        let attacknum = $(event.currentTarget)[0].className
        attacknum = parseInt(attacknum.slice((-1)))
        console.log(player2Pokemon)
        console.log(player2Pokemon.attackMove[attacknum -1].move)
        player1Pokemon.health-= damageChecker(player2Pokemon.attackMove[attacknum - 1].move, 1)
        $("#player1health").attr("value", player1Pokemon.health);
        $("#player1Attacks").css("display","block")
        $("#player2Attacks").css("display","none")
        $("#informationBar").text("Player 2 has attacked! Player 1 it is your turn!")
        pokemonDown(2);
    }
}

const pokemonDown = (player) => {
    if (player == 1) {
        if(player2Pokemon.health <= 0) {
            pokemonDead(2);

        }
    }
    else {
            if(player1Pokemon.health <= 0) {
                pokemonDead(1);
            }
        }
    }

const pokemonDead = (player) => {
    if(player == 2) {
        $("#player2").fadeOut("slow")
        $("#informationBar").text("PLAYER 1 HAS BEAT PLAYER 2").effect("shake")
        $("#player2Attacks").css("display","none");
        resetGame();
    }
    else {
        $("#player1").fadeOut("slow")
        $("#informationBar").text("PLAYER 2 HAS BEAT PLAYER 1").effect("shake")
        $("#player1Attacks").css("display","none")
        // $("#player2").html("<info><h2><c/h2></info><div id='pokeImage'></div>")
        resetGame();
    }
}

const resetGame = () => {
    playerready = 0
    setTimeout ( function(){ 
        $("#informationBar").text("Keep going! Choose two new pokemon!")
        $("#player2").fadeOut("slow")
        $("#player1").fadeOut("slow")
        $("#info").fadeIn()}
        
        , 4000);
    
}

$("li").on('click', pokemonAttacks)

$('#confirm').on('click', assignPokemon)