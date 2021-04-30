function getCrew() // returns crew array
{
    return JSON.parse(localStorage.getItem("crew"));
}

function setCrew(crew) // updates crew array
{
    localStorage.setItem("crew", JSON.stringify(crew));
}

function getTotalCrewFightingStat() // adds the fighting stats of all of the player's crewmates
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

/*
* Initiates a battle between the player and an enemy ship
* Chance of winning is based on the fighting stat of the player and the enemy
* Returns true if player wins the battle, false otherwise
*/
function battle(enemyFightingStat)
{
    var playerFightingStat = getTotalCrewFightingStat();
    var totalStat
}