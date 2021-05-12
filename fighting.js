function pirateSetup()
{
    generateEnemyShip();
}

function getCrew()
{
    return JSON.parse(localStorage.getItem("crew"));
}

function setCrew(crew)
{
    localStorage.setItem("crew", JSON.stringify(crew));
}

function getPlayerFightingStat() // adds the fighting stats of all of the player's crewmates
{
    var crew = getCrew();
    var total = 0;
    for (var i = 0; i < crew.length; i++)
    {
        var crewmate = crew[i];
        var fightingStat = crewmate["fighting"];
        total += fightingStat;
    }
    return total;
}

function getPlayerPilotingStat() // adds the fighting stats of all of the player's crewmates
{
    var crew = getCrew();
    var total = 0;
    for (var i = 0; i < crew.length; i++)
    {
        var crewmate = crew[i];
        var pilotingStat = crewmate["piloting"];
        total += pilotingStat;
    }
    return total;
}

/*
* Initiates a battle between the player and an enemy ship
* Chance of winning is based on the fighting stat of the player and the enemy
* Returns true if player wins the battle, false otherwise
*/

function getChance(playerStat, enemyStat)
{
    return playerStat/(playerStat+enemyStat);
}

function battle(enemyFightingStat)
{
    var playerFightingStat = getPlayerFightingStat();
    var sumStat = playerFightingStat + enemyFightingStat;
    
    var playerChance = playerFightingStat*1.0 / sumStat;
    var rand = Math.random();

    if (rand < playerChance) // player wins
    {
        return true;
    }
    return false;
}

// same as battle but for piloting
function escape(enemyPilotingStat)
{
    var playerPilotingStat = getPlayerPilotingStat();
    var sumStat = playerPilotingStat + enemyPilotingStat;
    
    var playerChance = playerPilotingStat*1.0 / sumStat;
    var rand = Math.random();

    if (rand < playerChance) // either player escapes or enemy does not escape (enemy has to fight) depending on the situation
    {
        return true;
    }
    return false; // either player does not escape (player has to fight) or enemy escapes depending on the situation
}

function generateEnemyShip()
{
    var playerFighting = getPlayerFightingStat();

    var strength = Math.random() * (0.2 - (-0.2)) + (-0.2);
    var enemyFightingStat = playerFighting + (playerFighting * strength);
    localStorage.setItem("enemyShip", JSON.stringify(enemyFightingStat));
}

function getEnemyFightingStat()
{
    return JSON.parse(localStorage.getItem("enemyship"));
}