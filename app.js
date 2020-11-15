class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`b${step}`)
        this.index++;
        console.log(step);
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        setInterval(() => {
            this.repeat();
        }, interval)  // invokes repeat() every 1 sec; goes on forever
    }
    activePad() {
        this.classList.toggle("active");
    }
}

const drumKit = new DrumKit();

// click to start
document.querySelector("#play-button button").addEventListener("click", () => {
    drumKit.start();
})

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad)
})
