"use strict";
{
    const SHADE = document.getElementById('shade');
    const X = document.getElementById('close');
    const BACK_MUSIC = document.getElementById('BackgroundMusic');
    const BACK_MUSIC_RESTING_VOLUME = 30;
    var openLeaderCard = '';
    var isMuted = true;
     

    //This will build the interface of the Olympian Logos
    var zodiacSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    var zodiacSignsLength = zodiacSigns.length;
    var leaderNames = ['Athena', 'Aphrodite', 'Apollo', 'Hermes', 'Zeus', 'Demeter', 'Hephaestus', 'Ares', 'Hades', 'Dionysius', 'Hera', 'Poseidon'];

    (function buildBlocks() {
        var leadersContainer = document.createElement('section');
        document.querySelector('body').appendChild(leadersContainer);
        leadersContainer.id = "leadersContainer";

        for (let i = 0; i < zodiacSignsLength; i++) {
            var newLeader = document.createElement('div');
            leadersContainer.appendChild(newLeader);
            newLeader.classList.add('leader');
            newLeader.id = zodiacSigns[i];

            var leaderPic = document.createElement('img');
            newLeader.appendChild(leaderPic);
            leaderPic.classList.add('leaderPic');
            leaderPic.src = `Images/Logos/${leaderNames[i]}.png`;
            leaderPic.alt = `Picture of ${leaderNames[i]}`;
        }
        return;
    })();

    //Attaching a click event to each leader so you can view each leader's card
    var leader = document.getElementsByClassName('leader');
    for (let i = 0; i < leader.length; i++) {
        leader[i].addEventListener("click", function () { showLeaderCard(this.id) }, false);
    }

    //This will display the leaders card
    function showLeaderCard(zodiacId) {
        var leaderCard = zodiacId + "Card";
        openLeaderCard = leaderCard;

        if (isMuted == false) {
            fadeOutMusic(BACK_MUSIC);
            document.getElementById(zodiacId + 'Sound').play();
        }

        document.getElementById(leaderCard).style.display = "block";
        SHADE.style.display = "block";
        X.style.display = "block";

        return;
    }

    //This will hide the card, make the shade go away and stop/reload the audio
    SHADE.addEventListener("click", function () { hideLeaderCard() });
    function hideLeaderCard() {
        document.getElementById(openLeaderCard).style.display = "none";
        SHADE.style.display = "none";
        X.style.display = "none";

        if (isMuted == false) {
            document.getElementById(openLeaderCard.slice(0, -4) + 'Sound').pause();
            document.getElementById(openLeaderCard.slice(0, -4) + 'Sound').load();
            fadeInMusic(BACK_MUSIC);
        }
        return;
    }

    //Fades the background music in again after a card is closed
    function fadeInMusic(musicVar) {
        var i = 0;
        setInterval(function () {
            if (i < BACK_MUSIC_RESTING_VOLUME) {
                i++;
                musicVar.volume = i / 100;
            }
        }, 10);
        return musicVar.volume;
    }

    //Fades background music out when a card is opened, so the card's audio doesn't overlap with the background sound
    function fadeOutMusic(musicVar) {
        var i = BACK_MUSIC_RESTING_VOLUME;
        setInterval(function () {
            if (i > 0) {
                i--;
                musicVar.volume = i / 100;
            }
        }, 10);
        return musicVar.volume;
    }

    //The Works
    document.getElementById('submitButton').addEventListener("click", function () { inputFactory() });
    var zodiacSign = '';
    function inputFactory() {
        var month = parseInt(document.getElementById('month').value);
        var day = parseInt(document.getElementById('day').value);

        if (month > 0 && month < 13 && day > 0) {
            switch (month) {
                default:
                    zodiacSign = 'noMatch';
                case 1:
                    zodiacSign = (day < 18) ? 'capricorn' : (day > 31) ? 'noMatch' : 'aquarius';
                    break;
                case 2:
                    zodiacSign = (day < 21) ? 'aquarius' : (day > 29) ? 'noMatch' : 'pisces';
                    break;
                case 3:
                    zodiacSign = (day < 21) ? 'pisces' : (day > 31) ? 'noMatch' : 'aries';
                    break;
                case 4:
                    zodiacSign = (day < 20) ? 'aries' : (day > 30) ? 'noMatch' : 'taurus';
                    break;
                case 5:
                    zodiacSign = (day < 21) ? 'taurus' : (day > 31) ? 'noMatch' : 'gemini';
                    break;
                case 6:
                    zodiacSign = (day < 22) ? 'gemini' : (day > 30) ? 'noMatch' : 'cancer';
                    break;
                case 7:
                    zodiacSign = (day < 24) ? 'cancer' : (day > 31) ? 'noMatch' : 'leo';
                    break;
                case 8:
                    zodiacSign = (day < 24) ? 'leo' : (day > 31) ? 'noMatch' : 'virgo';
                    break;
                case 9:
                    zodiacSign = (day < 24) ? 'virgo' : (day > 30) ? 'noMatch' : 'libra';
                    break;
                case 10:
                    zodiacSign = (day < 24) ? 'libra' : (day > 31) ? 'noMatch' : 'scorpio';
                    break;
                case 11:
                    zodiacSign = (day < 21) ? 'scorpio' : (day > 30) ? 'noMatch' : 'sagittarius';
                    break;
                case 12:
                    zodiacSign = (day < 22) ? 'sagittarius' : (day > 31) ? 'noMatch' : 'capricorn';
                    break;
            }
        }
        else {
            zodiacSign = 'noMatch';
        }
        showLeaderCard(zodiacSign);
        month = '';
        day = '';

        return zodiacSign;
    }

    //If the user hits enter on the keyboard instead of clicking submit, this will trigger the submit button
    document.addEventListener("keypress", function (event) {
        if (event.keyCode == 13) {
            inputFactory();
        }
    });

    //Adding the controls to the sound icons. This allows the user to mute/unmute all audio on the page if they want
    var volUp = document.getElementById('volUp');
    var volDown = document.getElementById('volDown');

    volUp.addEventListener("click", function () { volumeButtonControls(BACK_MUSIC) }, false);
    volDown.addEventListener("click", function () { volumeButtonControls(BACK_MUSIC) }, false);

    function volumeButtonControls(sound) {
        if (sound.paused) {
            sound.play();
            volUp.style.display = 'block';
            volDown.style.display = 'none';
            isMuted = false;
        }
        else {
            sound.pause();
            volUp.style.display = 'none';
            volDown.style.display = 'block';
            isMuted = true;
        }
        return isMuted;
    }
}
