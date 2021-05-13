function execute()
{
    localStorage.setItem("event", "passed");
    activeEvent = false;
    var crew = JSON.parse(localStorage.getItem("crew"));
    var html = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Pirate was executed.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
    html = html.replace('Pirate', crew[localStorage.getItem("position")]["name"]);
    document.getElementById('alert').innerHTML += html;
    crew.splice(localStorage.getItem("position"), 1);
    localStorage.setItem("crew", JSON.stringify(crew));
}
function newCrew(action)
{
    if(action == "welcome")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        var crew = JSON.parse(localStorage.getItem("crew"));
        for (var i = 0; i < Math.ceil(Math.random()*3); i++)
            {
                var names = ['Bill', 'Samuel', 'Pete', 'Louie', 'Sparrow', 'Jack', 'Vince', 'Gordon', 'Oscar', 'Wyatt', 'Edwin', 'Edward', 'Naoto', 'Goro', 'Jonas', 'Jacob', 'Wade', 'Randell'];
                var name = names[Math.floor(Math.random()*names.length)] + " " + names[Math.floor(Math.random()*names.length)];
                var fighting = Math.floor(Math.random()*101);
                var piloting = Math.floor(Math.random()*101);
                
                var crewmate = {
                    "name": name,
                    "fighting": fighting,
                    "piloting": piloting,
                }
                crew.push(crewmate);
            }
        localStorage.setItem("crew", JSON.stringify(crew));
        document.getElementById('newCrew').innerHTML = "The shipwreck survivors prove to be handy crewmates.";
    }
    if(action == "abandon")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        document.getElementById('newCrew').innerHTML = "You sail away from the wretched sailors. Perhaps the next ship that comes across them will be kinder, if there even is one.";
    }
}
function disease(action)
{
    if(action == "quarantine")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        var crew = JSON.parse(localStorage.getItem("crew"));
        for(i  = 0; i < Math.ceil(Math.random()*2); i++) 
        {
            var pos = Math.floor(Math.random()*crew.length);
            var html = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Pirate died of disease.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            html = html.replace('Pirate', crew[pos]["name"]);
            document.getElementById('alert').innerHTML += html;
            html = html.replace(crew[pos]["name"], 'Pirate');
            crew.splice(pos,1);
        }
        localStorage.setItem("crew", JSON.stringify(crew));
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))-5);
        document.getElementById('disease').innerHTML = "Your actions get the outbreak mostly under control, but some still perish of the disease.";
    }
    if(action == "denial")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        var crew = JSON.parse(localStorage.getItem("crew"));
        for(i  = 0; i < Math.ceil(Math.random()*4); i++) 
        {
            var pos = Math.floor(Math.random()*crew.length);
            var html = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Pirate died of disease.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            html = html.replace('Pirate', crew[pos]["name"]);
            document.getElementById('alert').innerHTML += html;
            crew.splice(pos,1);
        }
        localStorage.setItem("crew", JSON.stringify(crew));
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))-10);
        document.getElementById('disease').innerHTML = "The disease ravages the ship and leaves much of your crew dead. The survivors' faith in your leadership is greatly shaken.";
    }
    if(action == "plank")
    {
        execute();
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))-10);
        document.getElementById('disease').innerHTML = "No man dares cough in your presence again.";
    }
}
function opium(action)
{
    if(action == "overboard")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))-1);
        document.getElementById('opium').innerHTML = "Some of your men grumble. They ought to be grateful they aren't walking the plank.";
    }
    if(action == "libertarian")
    {
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))+10);
        localStorage.setItem("event", "passed");
        activeEvent = false;
        var crew = JSON.parse(localStorage.getItem("crew"));
        for(i = 0; i < Math.ceil(Math.random()*5); i++)
        {
            var position = Math.floor(Math.random()*crew.length);
            crew[position]["fighting"] = Math.floor(parseInt(crew[position]["fighting"])*.5);
            crew[position]["piloting"] = Math.floor(parseInt(crew[position]["piloting"])*.5);
        } 
        localStorage.setItem("crew", JSON.stringify(crew));
        document.getElementById('opium').innerHTML = "A good deal of your men wind up getting hooked on opium. While the addicts are substantially worse at being pirates, they are at least easier to order around";
    }
    if(action == "confiscate")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))-3);
        var inventory = JSON.parse(localStorage.getItem("inventory"));
        inventory["Opium"] = inventory["Opium"] + 1;
        localStorage.setItem("inventory", JSON.stringify(inventory));
        document.getElementById('opium').innerHTML = "Much to your mens' dismay, you confiscate the opium. It ought to fetch a good profit at the next port.";
    }
    if(action == "plank")
    {
        execute();
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))-8);
        document.getElementById('opium').innerHTML = "You enforce a strict no drug policy on the ship.";
    }
}
function treasureHunt(action)
{
    var doubloons = parseInt(localStorage.getItem("doubloons"));
    var inventory = JSON.parse(localStorage.getItem("inventory"));
    var morale = parseInt(localStorage.getItem("morale"));
    if(action == "treasureHunt")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        var hunt = Math.random();
        if(hunt > .75)
        {
            document.getElementById('treasureHunt').innerHTML = "Arrrgh! The detour is well worth it. You find a chest full of gold.";
            inventory["Gold"] += Math.ceil(Math.random()*4)
            localStorage.setItem("daysLeft", parseInt(localStorage.getItem("daysLeft"))+2);
            localStorage.setItem("inventory", JSON.stringify(inventory));
        }
        else if(hunt > .5)
        {
            document.getElementById('treasureHunt').innerHTML = "Arrrgh! You find a chest full of doubloons. A good reward for the extra few days of journey!";
            var num = Math.ceil((.75 + Math.random() * .75) * 500);
            doubloons += num;
            morale +=  Math.floor(num*(3/17)/2);
            localStorage.setItem("daysLeft", parseInt(localStorage.getItem("daysLeft"))+2);
            localStorage.setItem("doubloons", doubloons);
            localStorage.setItem("morale", morale);
        }
        else
        {
            document.getElementById('treasureHunt').innerHTML = "Avast! Ye find nothing save for a mound of sand.";
            localStorage.setItem("daysLeft", parseInt(localStorage.getItem("daysLeft"))+2);
        }
    }
    if(action == "lame")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        document.getElementById('treasureHunt').innerHTML = "What sort of pirate doesn't want to go on a treasure hunt?";
    }
}



//fighting functions
function pirates(action, enemyFighting, enemySailing)
{
    if(action == "fight")
    {
        if(battle(parseInt(enemyFighting)))
        {
            localStorage.setItem("event", "passed");
            activeEvent = false;
            pirateSpoils(enemyFighting);
        }
        else
        {
            localStorage.setItem("event", "passed");
            activeEvent = false;
            pirateLosses(enemyFighting);
        }
    }
    if(action == "flee")
    {
        if(escape(parseInt(enemySailing)))
        {
            localStorage.setItem("event", "passed");
            activeEvent = false;
            document.getElementById('pirates').innerHTML = "Arrrgh! The scalawags' ship disappears into the horizon.";
        }
        else
        {
            //document.getElementById('alert').innerHTML += '<div class="alert alert-danger alert-dismissible fade show" role="alert">Pirate died in combat.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            localStorage.setItem("event", "passed");
            activeEvent = false;
            if(battle(parseInt(enemyFighting)))
            {
                localStorage.setItem("event", "passed");
                activeEvent = false;
                pirateSpoils(enemyFighting);
            }
            else
            {
                localStorage.setItem("event", "passed");
                activeEvent = false;
                pirateLosses(enemyFighting);
            }
            document.getElementById('pirates').innerHTML = "Avast, they caught up with us! " + document.getElementById('pirates').innerHTML;
        }
    }
}
function merchant(action, enemySailing)
{
    if(action == "chase")
    {
        if(escape(parseInt(enemySailing)))
        {
            localStorage.setItem("event", "passed");
            activeEvent = false;
            merchantSpoils();
        }
        else
        {
            localStorage.setItem("event", "passed");
            activeEvent = false;
            localStorage.setItem("daysLeft", parseInt(parseInt(localStorage.getItem("daysLeft"))+Math.ceil(Math.random()*2)));
            document.getElementById('merchant').innerHTML = "Drat! We lost them. We veered a little off course in the process.";
        }
    }
    if(action == "mercy")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        document.getElementById('pirates').innerHTML = "We'll let em go.";
    }
}
function pirateLosses(enemyFighting)
{
    var ratio = parseInt(enemyFighting)/getPlayerFightingStat();
    var inventory = JSON.parse(localStorage.getItem("inventory"));
    var num;
    var crew = JSON.parse(localStorage.getItem("crew"));
    var losses = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Pirate died in combat.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
    var spoils = '<div class="alert alert-danger alert-dismissible fade show" role="alert">The enemies plundered goods.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
    var doubloons = parseInt(localStorage.getItem("doubloons"));
    var morale = parseInt(localStorage.getItem("morale"));
    if(Math.random() < .05*ratio)
    {
        killed();
        return false;
    }
    else
    {
        document.getElementById('pirates').innerHTML = "Though ye escaped with yer life, ye were decisively vanquished. Many of yer men were slain and the enemy pirates helped themselves to much of your loot.";
        
        if(inventory["Spices"] > 0)
        {
        num = Math.ceil(Math.random()*inventory["Spices"]);
        inventory["Spices"] -= num;
        spoils = spoils.replace("goods", num + " kilos of spices");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of spices", "goods");
        }
        
        if(inventory["Gold"] > 0)
        {
        num = Math.ceil(Math.random()*inventory["Gold"]);
        inventory["Gold"] -= num;
        spoils = spoils.replace("goods", num + " kilos of gold");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of gold", "goods");
        }

        if(inventory["Rum"] > 0)
        {
        num = Math.ceil(Math.random()*inventory["Rum"]);
        inventory["Rum"] -= num;
        spoils = spoils.replace("goods", num + " kilos of rum");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of rum", "goods");
        }
        
        if(inventory["Opium"] > 0)
        {
        num = Math.ceil(Math.random()*inventory["Opium"]);
        inventory["Opium"] -= num;
        spoils = spoils.replace("goods", num + " kilos of opium");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of gold", "goods");
        }

        if(inventory["Tobacco"] > 0)
        {
        num = Math.ceil(Math.random()*inventory["Tobacco"]);
        inventory["Tobacco"] -= num;
        spoils = spoils.replace("goods", num + " kilos of tobacco");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of tobacco", "goods");
        }

        if(inventory["Sugar"] > 0)
        {
        num = Math.ceil(Math.random()*inventory["Sugar"]);
        inventory["Sugar"] -= num;
        spoils = spoils.replace("goods", num + " kilos of sugar");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of sugar", "goods");
        }

        for(i = 0; i < Math.ceil(Math.random()*4); i++)
        {
            if(crew.length > 0)
            {
            var pos = Math.floor(Math.random()*crew.length);
            losses = losses.replace('Pirate', crew[pos]["name"]);
            document.getElementById('alert').innerHTML += losses;
            losses = losses.replace(crew[pos]["name"], 'Pirate');
            crew.splice(pos,1);
            morale -= 10;
            }
        }
        num = Math.ceil(Math.random()*doubloons);
        doubloons -= num;
        spoils = spoils.replace("goods", num + " doubloons");
        document.getElementById('alert').innerHTML += spoils;
        spoils = spoils.replace(num + " doubloons", "goods");
        localStorage.setItem("inventory", JSON.stringify(inventory));
        localStorage.setItem("doubloons", doubloons);
        localStorage.setItem("morale", morale);
        localStorage.setItem("crew", JSON.stringify(crew));
    }
}

function killed()
{
    window.location.href = "kia.html";
    return false;
}
function merchantSpoils()
{
    var inventory = JSON.parse(localStorage.getItem("inventory"));
    var num;
    var spoils = '<div class="alert alert-success alert-dismissible fade show" role="alert">You plundered goods.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
    var doubloons = parseInt(localStorage.getItem("doubloons"));
    var morale = parseInt(localStorage.getItem("morale"));
    document.getElementById('merchant').innerHTML = "Yo-ho-ho! No one outruns you, Captain. We have ransacked the cargo from their ship.";
    if(Math.random() > .5)
    {
        num = Math.ceil(Math.random()*3);
        inventory["Spices"] += num;
        spoils = spoils.replace("goods", num + " kilos of spices");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of spices", "goods");
    }
    if(Math.random() > .7)
    {
        num = Math.ceil(Math.random()*3);
        inventory["Gold"] += num;
        spoils = spoils.replace("goods", num + " kilos of gold");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of gold", "goods");
    }
    if(Math.random() > .4)
    {
        num = Math.ceil(Math.random()*3);
        inventory["Rum"] += num;
        spoils = spoils.replace("goods", num + " kilos of rum");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of rum", "goods");
    }
    if(Math.random() > .6)
    {
        num = Math.ceil(Math.random()*3);
        inventory["Opium"] += num;
        spoils = spoils.replace("goods", num + " kilos of opium");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of opium", "goods");
    }
    if(Math.random() > .5)
    {
        num = Math.ceil(Math.random()*3);
        inventory["Tobacco"] += num;
        spoils = spoils.replace("goods", num + " kilos of tobacco");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of tobacco", "goods");
    }
    if(Math.random() > .5)
    {
        num = Math.ceil(Math.random()*3);
        inventory["Sugar"] += num;
        spoils = spoils.replace("goods", num + " kilos of sugar");
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " kilos of sugar", "goods");
    }
    num = Math.ceil((.75 + Math.random() * .75) * 500);
    doubloons += num;
    spoils = spoils.replace("goods", num + " doubloons");
    morale +=  Math.floor(num*(3/17)/2);
    document.getElementById('alert').innerHTML += spoils;
    spoils = spoils.replace(num + " doubloons", "goods");
    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.setItem("doubloons", doubloons);
    localStorage.setItem("morale", morale);
}
function pirateSpoils(enemyFighting)
{
    var ratio = getPlayerFightingStat()/parseInt(enemyFighting);
    var inventory = JSON.parse(localStorage.getItem("inventory"));
    var num;
    var crew = JSON.parse(localStorage.getItem("crew"));
    var losses = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Pirate died in combat.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
    var spoils = '<div class="alert alert-success alert-dismissible fade show" role="alert">You plundered goods.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
    var doubloons = parseInt(localStorage.getItem("doubloons"));
    var morale = parseInt(localStorage.getItem("morale"));
    if(Math.random() < .5*ratio)
    {
        document.getElementById('pirates').innerHTML = "Total triumph, captain! You ransack the enemy ship for a heap of doubloons and resources.";
        if(Math.random() > .5)
        {
            num = Math.ceil(Math.random()*5);
            inventory["Spices"] += num;
            spoils = spoils.replace("goods", num + " kilos of spices");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of spices", "goods");
        }
        if(Math.random() > .7)
        {
            num = Math.ceil(Math.random()*5);
            inventory["Gold"] += num;
            spoils = spoils.replace("goods", num + " kilos of gold");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of gold", "goods");
        }
        if(Math.random() > .4)
        {
            num = Math.ceil(Math.random()*5);
            inventory["Rum"] += num;
            spoils = spoils.replace("goods", num + " kilos of rum");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of rum", "goods");
        }
        if(Math.random() > .6)
        {
            num = Math.ceil(Math.random()*5);
            inventory["Opium"] += num;
            spoils = spoils.replace("goods", num + " kilos of opium");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of opium", "goods");
        }
        if(Math.random() > .5)
        {
            num = Math.ceil(Math.random()*5);
            inventory["Tobacco"] += num;
            spoils = spoils.replace("goods", num + " kilos of tobacco");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of tobacco", "goods");
        }
        if(Math.random() > .5)
        {
            num = Math.ceil(Math.random()*5);
            inventory["Sugar"] += num;
            spoils = spoils.replace("goods", num + " kilos of sugar");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of sugar", "goods");
        }
        num = Math.ceil(.75 + Math.random() * .75 * 500);
        doubloons += num;
        spoils = spoils.replace("goods", num + " doubloons");
        morale +=  Math.floor(num*(3/17)/2);
        document.getElementById("alert").innerHTML += spoils;
        spoils = spoils.replace(num + " doubloons.", "goods");
        localStorage.setItem("inventory", JSON.stringify(inventory));
        localStorage.setItem("doubloons", doubloons);
        localStorage.setItem("morale", morale);
    }
    else if(Math.random() < .4*ratio)
    {
        document.getElementById('pirates').innerHTML = "We lost a few men, but we decisively vanquished those scalawags.";
        if(Math.random() > .5)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Spices"] += num;
            spoils = spoils.replace("goods", num + " kilos of spices");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of spices", "goods");
        }
        if(Math.random() > .7)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Gold"] += num;
            spoils = spoils.replace("goods", num + " kilos of gold");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of gold", "goods");
        }
        if(Math.random() > .4)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Rum"] += num;
            spoils = spoils.replace("goods", num + " kilos of rum");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of rum", "goods");
        }
        if(Math.random() > .6)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Opium"] += num;
            spoils = spoils.replace("goods", num + " kilos of opium");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of opium", "goods");
        }
        if(Math.random() > .5)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Tobacco"] += num;
            spoils = spoils.replace("goods", num + " kilos of tobacco");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of tobacco", "goods");
        }
        if(Math.random() > .5)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Sugar"] += num;
            spoils = spoils.replace("goods", num + " kilos of sugar");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of sugar", "goods");
        }
        for(i = 0; i < Math.ceil(Math.random()*2); i++)
        {
            var pos = Math.floor(Math.random()*crew.length);
            losses = losses.replace('Pirate', crew[pos]["name"]);
            document.getElementById('alert').innerHTML += losses;
            losses = losses.replace(crew[pos]["name"], 'Pirate');
            crew.splice(pos,1);
            morale -= 10;
        }
        num = Math.ceil((.75 + Math.random() * .75) * 500);
        doubloons += num;
        spoils = spoils.replace("goods", num + " doubloons");
        morale +=  Math.floor(num*(3/17)/2);
        document.getElementById('alert').innerHTML += spoils;
        spoils = spoils.replace(num + " doubloons", "goods");
        localStorage.setItem("inventory", JSON.stringify(inventory));
        localStorage.setItem("doubloons", doubloons);
        localStorage.setItem("morale", morale);
        localStorage.setItem("crew", JSON.stringify(crew));
    }
    else
    {
        document.getElementById('pirates').innerHTML = "Cap'n, we were victorious, but at what cost?";
        if(Math.random() > .4)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Spices"] += num;
            spoils = spoils.replace("goods", num + " kilos of spices");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of spices", "goods");
        }
        if(Math.random() > .6)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Gold"] += num;
            spoils = spoils.replace("goods", num + " kilos of gold");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of gold", "goods");
        }
        if(Math.random() > .3)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Rum"] += num;
            spoils = spoils.replace("goods", num + " kilos of rum");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of rum", "goods");
        }
        if(Math.random() > .5)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Opium"] += num;
            spoils = spoils.replace("goods", num + " kilos of opium");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of opium", "goods");
        }
        if(Math.random() > .4)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Tobacco"] += num;
            spoils = spoils.replace("goods", num + " kilos of tobacco");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of tobacco", "goods");
        }
        if(Math.random() > .4)
        {
            num = Math.ceil(Math.random()*3);
            inventory["Sugar"] += num;
            spoils = spoils.replace("goods", num + " kilos of sugar");
            document.getElementById("alert").innerHTML += spoils;
            spoils = spoils.replace(num + " kilos of sugar", "goods");
        }
        for(i = 0; i < Math.ceil(Math.random()*4); i++)
        {
            var pos = Math.floor(Math.random()*crew.length);
            losses = losses.replace('Pirate', crew[pos]["name"]);
            document.getElementById('alert').innerHTML += losses;
            losses = losses.replace(crew[pos]["name"], 'Pirate');
            crew.splice(pos,1);
            morale -= 10;
        }
        num = Math.ceil((.75 + Math.random() * .75) * 500);
        doubloons += num;
        spoils = spoils.replace("goods", num + " doubloons");
        document.getElementById('alert').innerHTML += spoils;
        spoils = spoils.replace(num + " doubloons", "goods");
        morale +=  Math.floor(num*(3/17)/2);
        localStorage.setItem("inventory", JSON.stringify(inventory));
        localStorage.setItem("doubloons", doubloons);
        localStorage.setItem("morale", morale);
        localStorage.setItem("crew", JSON.stringify(crew));
    }

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

function enemyShip(action)
{
    if (action == "fight")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        // document.getElementById('pirates').innerHTML = "Are you sure you want to fight? Your fighting stat"
    }
    if (action == "flee")
    {
        return;
    }
}