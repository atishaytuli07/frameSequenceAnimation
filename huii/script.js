const canvas = document.getElementById('framee');
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 1,
    lastIndex: 382
};

let imagesLoaded = 0;
const images = [];

function preloadImg() {
    for (let i = 1; i <= frames.lastIndex; i++) {
        const imgUrl = `./hui/frame_${i.toString().padStart(4, "0")}.jpeg`;
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
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            scrub: 2
        }
    })

    tl.to(frames, {
        currentIndex: frames.lastIndex,
        onUpdate: function () {
            loadImg(Math.floor(frames.currentIndex))
        }
    })
}

preloadImg();
