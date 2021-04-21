const SPICES = 0, GOLD = 1, RUM = 2;

// dictionary of cities and their prices for goods
var prices = {
    "New York": [15, 100, 50],
    "Charleston": [15, 100, 50],
    "Havana": [15, 100, 50],
}

// adds a port city
function addCity(name)
{
    prices[name] = [15, 100, 50];
}

// daily event that fluctuates the prices of goods within each city
function updatePrices()
{
    var keys = Object.keys(prices);
    for (var c = 0; c < keys.length; c++)
    {
        for (var g = 0; g < prices[keys[c]].length; g++)
        {
            /* price goes up or down? */
            var multiplier, min, max;
            if (Math.random() >= 0.5) // down
            {
                /* special event? */
                if (Math.random() >= 0.2) // no
                {
                    min = 0.9; max = 1;
                    multiplier = Math.random() * (max - min) + min;
                }
                else // yes
                {
                    min = 0.5; max = 0.75;
                    multiplier = Math.random() * (max - min) + min;
                }
            }
            else // up
            {
                /* special event? */
                if (Math.random() >= 0.2) // no 
                {
                    min = 1; max = 1/.9;
                    multiplier = Math.random() * (max - min) + min;
                }
                else // yes
                {
                    min = 1.5; max = 2;
                    multiplier = Math.random() * (max - min) + min;
                }
            }

            prices[keys[c]][g] = Math.ceil(prices[keys[c]][g] * multiplier);
        }
    }
}

function getPrices()
{
    var returnString = "";
    var city = Object.keys(prices);
    for (var c = 0; c < city.length; c++)
    {
        returnString += city[c] + ": " + prices[city[c]] + "\n";
    }
    //return returnString;
    print(returnString);        
}