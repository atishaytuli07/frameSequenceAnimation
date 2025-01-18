const canvas = document.getElementById('framee');
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 1,
    lastIndex: 2421
};

let imagesLoaded = 0;
const images = [];

function preloadImg() {
    for (let i = 1; i <= frames.lastIndex; i++) {
        const imgUrl = `./ds/frame_${i.toString().padStart(4, "0")}.jpeg`;
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === frames.lastIndex) {
                loadImg(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img)
    }
}

function loadImg(index) {
    if (index >= 0 && index <= frames.lastIndex) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offSetX = (canvas.width - newWidth) / 2;
        const offSetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offSetX, offSetY, newWidth, newHeight);
        frames.currentIndex = index;
    }
}

function startAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            scrub: 2,
        },
    });

    function updateFrames(index) {
        return {
            currentIndex: index,
            ease: "Linear",
            onUpdate: function () {
                frames.currentIndex = this.targets()[0].currentIndex; // Update frames.currentIndex
                loadImg(Math.floor(frames.currentIndex));
            },
        };
    }


    tl.to(frames, updateFrames(100), "a")
        .to(".animate1", {
            opacity: 0,
            ease: "Linear"
        }, "a")

        .to(frames, updateFrames(160), "b")
        .to(".animate2", {
            opacity: 1,
            ease: "Linear"
        }, "b")

        .to(frames, updateFrames(220), "c")
        .to(".animate3", {
            opacity: 1,
            ease: "Linear"
        }, "c")

        .to(frames, updateFrames(280), "d")
        .to(".animate3", {
            opacity: 0,
            ease: "Linear"
        }, "d")

        .to(frames, updateFrames(340), "e")
        .to(".animate3", {
            opacity: 1,
            ease: "Linear"
        }, "e")

        .to(frames, updateFrames(400), "f")
        .to(".animate3", {
            opacity: 1,
            ease: "Linear"
        }, "f")

        .to(frames, updateFrames(460), "g")
        .to(".animate3", {
            opacity: 0,
            ease: "Linear"
        }, "g")

        .to(frames, updateFrames(520), "h")
        .to(".panel", {
            x: "0%",
            ease: "expo"
        }, "h")

        .to(frames, updateFrames(580), "i")
        .to(".animate8", {
            x: "0%",
            ease: "expo"
        }, "i")

        .to(frames, updateFrames(580), "j")
        .to(".animate8", {
            opacity: 0,
            ease: "Linear"
        }, "j")

        .to(frames, updateFrames(580), "k")
        .to("canvas", {
            scale: .7,
            ease: "Linear"
        }, "k")

        .to(frames, updateFrames(640), "l")
        .to(".panelism", {
            opacity: 1,
            ease: "expo"
        }, "l")

        .to(frames, updateFrames(700), "m")
        .to(".panelism span", {
            width: 200,
            ease: "expo"
        }, "m")

        .to(frames, updateFrames(760), "n")
        .to("canvas", {
            scale: 1,
            ease: "Linear"
        }, "n")

        .to(frames, updateFrames(820), "o")
        .to(".panelism", {
            scale: 2,
            ease: "Linear"
        }, "o")

        .to(frames, updateFrames(580), "p")
        .to(".panelism", {
            scale: 2,
            ease: "Linear"
        }, "p")

    window.addEventListener("resize", function () {
        loadImg(Math.floor(frames.currentIndex));
    });


}

preloadImg();
