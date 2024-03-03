(async () => {
    let res = await fetch('/lib/js/game.js');
    res = await res.text();
    let endpoint = res.match(/requests.get\("(.*?)",/)[1];
    
    let msg = prompt('Enter a message...');
    let name = prompt('Enter a username...');
    
    blacket.requests.get(`${endpoint}/${name}`, (t) => {
        if (t.error) return alert(`That's not a valid user`);
        blacket.appendChat({
            error: false,
            message: {
                content: msg,
                date: Date.now(),
                edited: false,
                deleted: false
            },
            author: t.user,
            room: {
                id: blacket.chat.room
            }
        }, (msg.toLowerCase().indexOf(blacket.user.username.toLowerCase()) > -1));
    });
})();
