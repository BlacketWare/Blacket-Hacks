(async () => {
    let res = await fetch('/lib/js/game.js');
    res = await res.text();
    let endpoint = res.match(/requests.get\("(.*?)",/)[1];
    
    $('.toastMessage').remove();

    blacket.requests.get(`${endpoint}/${prompt('Enter a username...')}`, (data) => {
        if (data.error) return alert('That user doesn\'t exist.');

        let id = Math.random().toString(36).substring(2, 15);
        $('#app').append(`<div id='${id}' class='toastMessage' style='animation: flyIn 0.35s ease-in-out forwards; background-color: #1f1f1f;'><text style='color: white; font-size:20px;'>You have received a trade request from ${data.user.username}! Would you like to accept?</text><div id='acceptButton' class='styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase' role='button' tabindex='0' style='margin-top: 10px;'> <div class='styles__shadow___3GMdH-camelCase'></div><div class='styles__edge___3eWfq-camelCase' style='background-color: green;'></div><div class='styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase' style='background-color: green;'>Accept</div></div><div id='declineButton' class='styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase' role='button' tabindex='0' style='margin-top: 10px;'> <div class='styles__shadow___3GMdH-camelCase'></div><div class='styles__edge___3eWfq-camelCase' style='background-color: red;'></div><div class='styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase' style='background-color: red;'>Decline</div></div></div>`);
        new Audio('/content/request.ogg').play();

        $('#acceptButton').click(() => location.href = '/trade');
        $('#declineButton').click(() => {
            $(`#${id}`).attr('style', 'animation: flyOut 0.35s ease-in-out forwards; background-color: #1f1f1f;');
            setTimeout(() => {
                $(`#${id}`).remove();
            }, 3500);
        });
    });
    return;
})();
