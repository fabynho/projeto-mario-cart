const characters = [
    {
        NOME: "Mario",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 3,
        PODER: 3,
        PONTOS: 0,
    },
    {
        NOME: "Luigi",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS: 0,
    },
    {
        NOME: "Peach",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 2,
        PONTOS: 0,
    },
    {
        NOME: "Yoshi",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 4,
        PODER: 3,
        PONTOS: 0,
    },
    {
        NOME: "Bowser",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
    },
    {
        NOME: "Donkey Kong",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
    }

];

//selecionar 2 personagens aleatorios
async function selectRandomCharacters() {

    const shufffled = [...characters].sort(() => 0.5 - Math.random());
    const selected = shufffled.slice(0, 2);

    

    return selected;

}

// Função para sortear o tipo de ataque no confronto
async function getRandomAttack() {

    const random = Math.random();

    if(random < 0.5){
        return {
            tipo: "CASCO",
            pontos: 1,
            emoji: "🐢"
        };
    }else{
        return {
            tipo: "BOMBA",
            pontos: 2,
            emoji: "💣"
        };
    }
}


async function rollDice() {

   return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {

    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"    
            break;
        case random < 0.66:
            result = "CURVA"
            break
        default:
            result = "CONFRONTO"
    }

    return result;

}

async function logRollResult(characterNOME, block, diceResult, attribute) {

    console.log(`${characterNOME} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {

    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);
        
        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //Teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE

            await logRollResult(character1.NOME, "VELOCIDADE", diceResult1, character1.VELOCIDADE)
            await logRollResult(character2.NOME, "VELOCIDADE", diceResult2, character2.VELOCIDADE)
        }
        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE

            await logRollResult(character1.NOME, "MANOBRABILIDADE", diceResult1, character1.MANOBRABILIDADE)
            await logRollResult(character2.NOME, "MANOBRABILIDADE", diceResult2, character2.MANOBRABILIDADE)
        }
        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER
            let powerResult2 = diceResult2 + character2.PODER

            console.log(`${character1.NOME} confrontou ${character2.NOME}! 🥊`);

            await logRollResult(character1.NOME, "PODER", diceResult1, character1.PODER)
            await logRollResult(character2.NOME, "PODER", diceResult2, character2.PODER)

            const attack = await getRandomAttack();

            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                let pointsToLose = Math.min(attack.pontos, character2.PONTOS)
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} foi atingido por um ${attack.tipo} ${attack.emoji} e perdeu ${pointsToLose} ponto(s)!`);
                character2.PONTOS -= pointsToLose;
            }

            if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                let pointsToLose = Math.min(attack.pontos, character1.PONTOS)
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} foi atingido por um ${attack.tipo} ${attack.emoji} e perdeu ${pointsToLose} ponto(s)!`);
                character1.PONTOS -= pointsToLose;
            }

                
            console.log(powerResult1 === powerResult2 ? "Confronto empatado nenhum ponto foi perdido" : "");    
        }

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`)
            character1.PONTOS++;
        }else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`)
            character2.PONTOS++;
        }else if(block =! "CONFRONTO" && totalTestSkill1 === totalTestSkill2){
            console.log("Empate! Ninguem pontuou!");

        }


        console.log("_____________________");
    }


}

async function declareWinner(character1, character2) {

    console.log("Resultado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} Venceu a corrida! Parabéns! 🏆`)
    } else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} Venceu a corrida! Parabéns! 🏆`)
    }else{
        console.log("A corrida termnou em empate");
    }
}

(async function Main() {
    console.log("🏁 MARIO KART - SELEÇÃO ALEATÓRIA DE PERSONAGENS!\n");

    // Selecionar 2 personagens aleatórios
    const [player1, player2] = await selectRandomCharacters();

    console.log(
        `🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando ...\n`
    )

    await playRaceEngine(player1, player2); 
    await declareWinner(player1, player2); 

})();

