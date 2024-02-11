(async () => {
    if (!blacket.packs) return alert('You must be logged in (and on the Market) to run this script.');

    let getPack = {};
    Object.keys(blacket.packs).forEach(a => blacket.packs[a].blooks.forEach(b => getPack[b] = a));
    let target = prompt('Enter a Blook to target:');
    if (!blacket.blooks[target]) return alert('I can\'t find that Blook.');

    let pack = getPack[target];
    let limit = prompt('Enter a limit (how many packs to try for before you fully stop, no matter if you get).\nEnter * for no limit.');
    if (limit.toString() === '*') limit = Math.floor(blacket.user.tokens / blacket.packs[pack].price);
    if (isNaN(limit) || limit < 0) return alert('Invalid limit.');
    if (limit < 1 || limit * blacket.packs[pack].price > blacket.user.tokens) return alert('You do not have enough tokens.');
    
    let speed = Number.parseInt(prompt('What speed (in ms) would you like this to open at?\nOur current recommendation is around 200.'));
    if (isNaN(speed)) return alert('Invalid speed.');
    if (speed < 125) return alert('The script speed should be above 125 to avoid a large ratelimit.');

    window.blooks = [];
    let i = 0;
    let unlocked = false;

    function buy() {
        blacket.requests.post('/worker3/open', {
            pack
        }, (data) => {
            if (data.error) return console.log(`Error opening`, data);
            i++;
            if (data.blook === target) return unlocked = true;
            blooks.push(data.blook);
        });
    };

    let buyInt = setInterval(() => {
        if (!unlocked && i <= limit) buy();
        else {
            clearInterval(buyInt);
            let count = {};
            blooks.forEach(blook => count[blook] = (count[blook] || 0) + 1);
            if (unlocked) alert(`Unlocked ${target} in ${i} boxes...\n\nOther Unlocks:\n` + Object.entries(count).map((x) => `    ${x[1]} ${x[0]}`).join(`\n`));
            else alert(`Failed to unlock ${target} in ${i} boxes...\n\Unlocks:\n` + Object.entries(count).map((x) => `    ${x[1]} ${x[0]}`).join(`\n`));
        };
    }, speed);
})();
