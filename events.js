function execute()
{
    localStorage.setItem("event", "passed");
    activeEvent = false;
    var crew = JSON.parse(localStorage.getItem("crew"));
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
        crew.splice(Math.floor(Math.random()*crew.length),1);
        crew.splice(Math.floor(Math.random()*crew.length),1);
        localStorage.setItem("crew", JSON.stringify(crew));
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))-5);
        document.getElementById('disease').innerHTML = "Your actions get the outbreak mostly under control, but some still perish of the disease.";
    }
    if(action == "denial")
    {
        localStorage.setItem("event", "passed");
        activeEvent = false;
        var crew = JSON.parse(localStorage.getItem("crew"));
        crew.splice(Math.floor(Math.random()*crew.length),1);
        crew.splice(Math.floor(Math.random()*crew.length),1);
        crew.splice(Math.floor(Math.random()*crew.length),1);
        crew.splice(Math.floor(Math.random()*crew.length),1);
        crew.splice(Math.floor(Math.random()*crew.length),1);
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
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))-1);
        document.getElementById('opium').innerHTML = "Some of your men grumble. They ought to be grateful they aren't walking the plank.";
    }
    if(action == "libertarian")
    {
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))+10);
        var crew = JSON.parse(localStorage.getItem("crew"));
        for(i = 0; i < Math.ceil(Math.random()*5); i++)
        {
            localStorage.setItem("event", "passed");
            var position = Math.floor(Math.random()*crew.length);
            crew[position]["fighting"] = Math.floor(parseInt(crew[position]["fighting"])*.5);
            crew[position]["piloting"] = Math.floor(parseInt(crew[position]["piloting"])*.5);
        } 
        localStorage.setItem("crew", JSON.stringify(crew));
        document.getElementById('opium').innerHTML = "A good deal of your men wind up getting hooked on opium. While the addicts are substantially worse at being pirates, they are at least easier to order around";
    }
    if(action == "confiscate")
    {
        localStorage.setItem("morale", parseInt(localStorage.getItem("morale"))-3);
        var inventory = JSON.parse(localStorage.getItem("inventory"));
        inventory["opium"] = inventory["opium"] + Math.floor(Math.random()*10);
        localStorage.setItem("inventory", JSON.stringify(inventory));
        document.getElementById('opium').innerHTML = "Much to your mens' dismay, you confiscate the opium. It ought to fetch a good profit at the next port.";
    }
}