function execute()
{
    localStorage.setItem("event", "passed");
    activeEvent = false;
    var crew = JSON.parse(localStorage.getItem("crew"));
    crew.splice(localStorage.getItem("position"), 1);
    localStorage.setItem("crew", JSON.stringify(crew));
    localStorage.setItem("morale", localStorage.getItem("morale")-10);
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
        localStorage.setItem("morale", localStorage.getItem("morale")-5);
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
        localStorage.setItem("morale", localStorage.getItem("morale")-10);
        document.getElementById('disease').innerHTML = "The disease ravages the ship and leaves much of your crew dead. The survivors' faith in your leadership is greatly shaken.";
    }
    if(action == "plank")
    {
        execute();
        document.getElementById('disease').innerHTML = "No man dares cough in your presence again.";
    }
}
function opium(action)
{
    if(action == "overboard")
    {
        localStorage.setItem("event", "passed");
        localStorage.setItem("morale", localStorage.getItem("morale")-1);
        document.getElementById('opium').innerHTML = "Some of your men grumble. They ought to be grateful they aren't walking the plank.";
    }
    if(action == "libertarian")
    {
        localStorage.setItem("morale", localStorage.getItem("morale")+10);
        for(i = 1; i < Math.ceil(Math.random()*3); i++)
        {
            localStorage.setItem("event", "passed");
            var crew = JSON.parse(localStorage.getItem("crew"));
            crew[Math.floor(Math.random()*crew.length)]["fighting"] = crew[Math.floor(Math.random()*crew.length)]["fighting"]*.5;
            crew[Math.floor(Math.random()*crew.length)]["piloting"] = crew[Math.floor(Math.random()*crew.length)]["piloting"]*.5;
        } 
        document.getElementById('opium').innerHTML = "A good deal of your men wind up getting hooked on opium. While the addicts are substantially worse at being pirates, they are at least easier to order around";
    }
}