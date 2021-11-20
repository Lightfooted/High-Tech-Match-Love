export function randomNumber(min, max)
{
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}

export function getRandomNonRepeatingNumbers(min, max, howMany)
{
    var randFound = [];
    while (randFound.length < howMany)
    {
        var value = randomNumber(min, max);
        if (!randFound.includes(value))
        {
            randFound.push(value);
        }
    }

    return randFound;
}
