class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.playButton = document.getElementById("play-button");
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteButton = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        activeBars.forEach(bar => {
            bar.style.animation = "playTrack 0.2s ease-in-out alternate 2"  // style.animationDirection is alternate
            // play sounds if active
            if (bar.classList.contains("active")) {
                if (bar.classList.contains("kick-pad")) {
                    // set audio currentTime to 0 every time a pad is active 
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                } else if (bar.classList.contains("snare-pad")) {
                    // set audio currentTime to 0 every time a pad is active 
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                } else if (bar.classList.contains("hihat-pad")) {
                    // set audio currentTime to 0 every time a pad is active 
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
        // console.log(step);
    };
    start() {

        // prevent starting if it's already playing
        let buttonText = this.playButton.children[0].innerText;

        // tempo
        let interval;
        if (buttonText === "Stop") {
            // stop
            clearInterval(this.isPlaying);
            this.playButton.children[0].innerText = "Play";
        } else {
            // play
            interval = (60 / this.bpm) * 1000;
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval)  // invokes repeat() every 1 sec; goes on forever
            this.playButton.children[0].innerText = "Stop";
        }
    };
    activePad() {
        this.classList.toggle("active");
    };
    changeSound(e) {
        const optionName = e.target.name;
        const optionValue = e.target.value;  // "./sounds/bluhbluh.wav"
        switch (optionName) {
            case "kick-select":
                this.kickAudio.src = optionValue;
                break;
            case "snare-select":
                this.snareAudio.src = optionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = optionValue;
                break;
        }
    };
    mute(e) {
        // data-track attribute is 0, 1, or 2; we pre-defined this attribute in html 
        const muteIndex = e.target.getAttribute("data-track");
        const iconClassList = e.target.children[0].classList
        if (iconClassList.contains("fa-volume-up")) {
            // if icon is fa-volume-up
            // change icon
            iconClassList.remove("fa-volume-up");
            iconClassList.add("fa-volume-mute");
            // mute 
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            // if icon is fa-volume-mute
            // change icon
            iconClassList.remove("fa-volume-mute");
            iconClassList.add("fa-volume-up");
            // mute 
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    };
    changeTempo(e) {
        // changing text to reflect the slider value 
        const tempoText = document.querySelector(".tempo-number");
        this.bpm = e.target.value;
        tempoText.innerText = this.bpm;
    };
    updateTempo() {
        // pause
        clearInterval(this.isPlaying);
        // if the track is playing, restart
        if (this.playButton.children[0].innerText = "Play") {
            this.start()
        }
    }
}

const drumKit = new DrumKit();


// EVENT LISTENERS

// click to start track
document.querySelector("#play-button button").addEventListener("click", () => {
    drumKit.start();
})

// click pads to activate
drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
        // reset html style tag after animation is done
        // so that when style tag is updated again, keyframes animation starts
    });
})

// listen to the select menu
drumKit.selects.forEach(option => {
    option.addEventListener("change", (e) => {
        drumKit.changeSound(e)
    })
})

// mute buttons
drumKit.muteButton.forEach(btn => {
    btn.addEventListener("click", (e) => {
        drumKit.mute(e)
    })
})

// update tempo slider text
drumKit.tempoSlider.addEventListener("input", (e) => {
    // "input" - event invoked while the slider value changes when the user holds down
    // "change" - event invoked while the user let go of the slider
    drumKit.changeTempo(e)
})

// update tempo
drumKit.tempoSlider.addEventListener("change", () => {
    drumKit.updateTempo()
})