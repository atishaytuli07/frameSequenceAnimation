window.addEventListener('load', () => {
    const loadScripts = async () => {
        try {
            await new Promise((resolve, reject) => {
                const gsapScript = document.createElement('script');
                gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
                gsapScript.onload = resolve;
                gsapScript.onerror = reject;
                document.body.appendChild(gsapScript);
            });

            await new Promise((resolve, reject) => {
                const scrollTriggerScript = document.createElement('script');
                scrollTriggerScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
                scrollTriggerScript.onload = resolve;
                scrollTriggerScript.onerror = reject;
                document.body.appendChild(scrollTriggerScript);
            });

            initAnimation();
        } catch (error) {
            console.error('Error loading scripts:', error);
        }
    };

    const initAnimation = () => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        const canvas = document.getElementById("framee");
        const context = canvas.getContext("2d");

        const frames = {
            currentIndex: 1,
            lastIndex: 2421,
        };

        let imagesLoaded = 0;
        const images = [];

        function preloadImg() {
            return new Promise((resolve) => {
                for (let i = 1; i <= frames.lastIndex; i++) {
                    const imgUrl = `./ds/frame_${i.toString().padStart(4, "0")}.jpeg`;
                    const img = new Image();
                    img.src = imgUrl;
                    img.onload = () => {
                        imagesLoaded++;
                        if (imagesLoaded === frames.lastIndex) {
                            loadImg(frames.currentIndex);
                            resolve();
                        }
                    }
                    images.push(img);
                }
            });
        }

        function loadImg(index) {
            if (index >= 0 && index <= frames.lastIndex) {
                const img = images[index - 1];
                if (!img) return;
                
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

        async function startAnimation() {
            await preloadImg();

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".parent",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2,
                    onUpdate: (self) => {
                        const frameIndex = Math.floor(gsap.utils.interpolate(1, frames.lastIndex, self.progress));
                        loadImg(frameIndex);
                    }
                }
            });

            function updateFrame(index) {
                return {
                    currentIndex: index,
                    ease: "linear",
                    onUpdate: function () {
                        loadImg(Math.floor(frames.currentIndex));
                    }
                };
            }

            tl
                .to(frames, updateFrame(152), "a")
                .to(".animate1", { opacity: 0, duration: 1, ease: "linear" }, "a")
                .to(frames, updateFrame(304), "b")
                .to(".animate2", { opacity: 1, duration: 1, ease: "linear" }, "b")
                .to(frames, updateFrame(455), "c")
                .to(".animate2", { opacity: 1, duration: 1, ease: "linear" }, "c")
                .to(frames, updateFrame(606), "d")
                .to(".animate2", { opacity: 0, duration: 1, ease: "linear" }, "d")
                .to(frames, updateFrame(757), "e")
                .to(".animate3", { opacity: 1, duration: 1, ease: "linear" }, "e")
                .to(frames, updateFrame(908), "f")
                .to(".animate3", { opacity: 1, duration: 1, ease: "linear" }, "f")
                .to(frames, updateFrame(1059), "g")
                .to(".animate3", { opacity: 0, duration: 1, ease: "linear" }, "g")
                .to(frames, updateFrame(1211), "h")
                .to(".panel", { x: "0%", duration: 1, ease: "linear" }, "h")
                .to(frames, updateFrame(1362), "i")
                .to(".panel", { x: "0%", duration: 1, ease: "linear" }, "i")
                .to(frames, updateFrame(1513), "j")
                .to(".panel", { opacity: 0, duration: 1, ease: "linear" }, "j")
                .to(frames, updateFrame(1664), "k")
                .to("canvas", { scale: 0.5, duration: 1, ease: "linear" }, "k")
                .to(frames, updateFrame(1815), "l")
                .to(".panelism", { opacity: 1, duration: 1, ease: "linear" }, "l")
                .to(frames, updateFrame(1966), "m")
                .to(".panelism span", { width: 200, duration: 1, ease: "linear" }, "l")
                .to(frames, updateFrame(2117), "m")
                .to("canvas", { scale: 1, duration: 1, ease: "linear" }, "m")
                .to(frames, updateFrame(2268), "m")
                .to(".panelism", { scale: 2, duration: 1, ease: "circ" }, "m")
                .to(frames, updateFrame(2421), "o")
                .to(".panelism", { scale: 2, duration: 1, ease: "circ" }, "o");
        }

        startAnimation();

        window.addEventListener("resize", function () {
            loadImg(Math.floor(frames.currentIndex));
        });

        document.querySelectorAll(".headings h3")
        .forEach(elem => {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top 90%",
                    end: "bottom 20%",
                    scrub: 2,
                },
                opacity: .3
            });
        });

        const video = document.querySelector('.loader video');
        video.addEventListener('ended', () => {
            gsap.to('.loader', {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    document.querySelector('.loader').style.display = 'none';
                }
            });
        });
    };

    loadScripts();
});
