<template>
    <Menu />
    
    <div class="preloader-progress">
      <div class="preloader-progress-bar"></div>
      <div class="preloader-logo"><h1 class="epilogue">inDrive</h1></div>
    </div>

    <div class="preloader-mask"></div>

    <div class="relative w-full h-screen max-h-screen !p-4 bg-white z-[100]">
        <video 
            src="/assets/hero.mp4"
            loop
            autoplay
            muted
            playsinline
            preload="auto"
            class="w-full h-full object-cover rounded-2xl"
        ></video>
        
    
        <div class="absolute inset-4 bg-black/70 rounded-2xl pointer-events-none"></div>
        
        <div class="absolute top-8 left-8 md:top-12 md:left-12 z-10 pointer-events-none">
            <img src="/image.svg" alt="inDrive Logo" class="h-10 md:h-14 w-auto" />
        </div>
        
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="text-center px-4 md:px-8 lg:px-16 mt-16 md:mt-20 lg:mt-24">
                <h1 class="hero-text text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl leading-tight">
                    Revolutionizing<br>traffic analysis 
                    <span class="relative inline-block">
                        system
                        <svg 
                            class="hero-line absolute top-0 left-0 w-full h-full pointer-events-none" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 608 100" 
                            fill="none"
                            preserveAspectRatio="none"
                        >
                            <path 
                                d="M322.902 98.9997C232.515 99.0422 140.637 94.7899 58.0275 80.853C31.532 76.3775 2.92086 69.1167 1.08733 58.1139C-0.222339 50.1514 13.3981 42.965 28.5701 37.4583C61.2714 25.5944 103.362 18.1423 146.239 12.7206C228.606 2.3131 316.878 -1.23755 403.155 2.36627C456.307 4.58809 509.519 9.62707 555.338 20.109C581.41 26.0728 606.777 35.279 606.999 46.8453C607.12 53.7659 597.831 60.3569 584.835 65.1939C571.839 70.0309 555.398 73.3158 538.675 76.0266C463.097 88.252 379.057 89.8891 297.011 91.3668" 
                                stroke="#C0F11C" 
                                stroke-width="5" 
                                stroke-linecap="round" 
                                stroke-linejoin="round"
                                class="hero-line-path"
                            />
                        </svg>
                    </span>
                    in Astana
                </h1>
            </div>
        </div>
    </div>
    
    <div class="traffic-map-section">
        <TrafficMap />
    </div>
    
    <StatsSection />
    
    <div class="storytelling-section">
        <div class="storytelling-wrapper">
            <StorytellingMap />
        </div>
    </div>

</template>
<script setup>
import gsap from "gsap";
import { onMounted } from "vue";
import StorytellingMap from "~/components/StorytellingMap.vue";
import TrafficMap from "~/components/TrafficMap.vue";
import StatsSection from "~/components/StatsSection.vue";
import Menu from "~/components/Menu.vue";

let SplitText;

if (process.client) {
  import('gsap/SplitText').then((module) => {
    SplitText = module.SplitText;
    gsap.registerPlugin(SplitText);
  });
}

onMounted(async () => {
  if (process.client && !SplitText) {
    const module = await import('gsap/SplitText');
    SplitText = module.SplitText;
    gsap.registerPlugin(SplitText);
  }

  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => {
  function createSplitTexts(elements) {
    const splits = {};

    elements.forEach(({ key, selector, type }) => {
      const config = { type, mask: type };

      if (type === "chars") config.charsClass = "char";
      if (type === "lines") config.linesClass = "line";
      splits[key] = SplitText.create(selector, config);
    });

    return splits;
  }

  const splitElements = [
    { key: "logoChars", selector: ".preloader-logo h1", type: "chars" },
    { key: "footerLines", selector: ".preloader-footer p", type: "lines" },
    { key: "headerChars", selector: ".header h1", type: "chars" },
    { key: "heroFooterH3", selector: ".hero-footer h3", type: "lines" },
    { key: "heroFooterP", selector: ".hero-footer p", type: "lines" },
    { key: "btnLabels", selector: ".btn-label span", type: "lines" },
    { key: "heroTextChars", selector: ".hero-text", type: "chars" },
  ];

  const splits = createSplitTexts(splitElements);

  gsap.set([splits.logoChars.chars], { x: "100%" });
  gsap.set(
    [
      splits.footerLines.lines,
      splits.headerChars.chars,
      splits.heroFooterH3.lines,
      splits.heroFooterP.lines,
      splits.btnLabels.lines,
    ],
    { y: "100%" }
  );
  gsap.set([splits.heroTextChars.chars], { opacity: 0, y: 50 });
  gsap.set(".btn-icon", { clipPath: "circle(0% at 50% 50%)" });
  gsap.set(".btn", { scale: 0 });
  
  const heroLinePath = document.querySelector('.hero-line-path');
  if (heroLinePath) {
    const pathLength = heroLinePath.getTotalLength();
    gsap.set(heroLinePath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });
  }

  function animateProgress(duration = 4) {
    const tl = gsap.timeline();
    const counterSteps = 5;
    let currentProgress = 0;

    for (let i = 0; i < counterSteps; i++) {
      const finalStep = i === counterSteps - 1;
      const targetProgress = finalStep
        ? 1
        : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);
      currentProgress = targetProgress;

      tl.to(".preloader-progress-bar", {
        scaleX: targetProgress,
        duration: duration / counterSteps,
        ease: "power2.out",
      });
    }

    return tl;
  }

  const tl = gsap.timeline({ delay: 0.5 });

  tl.to(splits.logoChars.chars, {
    x: "0%",
    stagger: 0.05,
    duration: 1,
    ease: "power4.inOut",
  })
    .to(
      splits.footerLines.lines,
      {
        y: "0%",
        stagger: 0.1,
        duration: 1,
        ease: "power4.inOut",
      },
      "0.25"
    )
    .add(animateProgress(), "<")
    .set(".preloader-progress", { backgroundColor: "#fff" })
    .to(
      splits.logoChars.chars,
      {
        x: "-100%",
        stagger: 0.05,
        duration: 1,
        ease: "power4.inOut",
      },
      "-=0.5"
    )
    .to(
      splits.footerLines.lines,
      {
        y: "-100%",
        stagger: 0.1,
        duration: 1,
        ease: "power4.inOut",
      },
      "<"
    )
    .to(
      ".preloader-progress",
      {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.25"
    )
    .to(
      ".preloader-mask",
      {
        scale: 6,
        duration: 2.5,
        ease: "power3.out",
      },
      "<"
    )
    .to(
      ".hero-img",
      {
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      "<"
    )
    .to(splits.heroTextChars.chars, {
      opacity: 1,
      y: 0,
      stagger: {
        amount: 1.2,
        from: "random"
      },
      duration: 0.6,
      ease: "power2.out",
    }, "-=2.2")
    .to('.hero-line-path', {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.out",
    }, "-=0.8")
    .to(splits.headerChars.chars, {
      y: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
      delay: -2,
    })
    .to(
      [splits.heroFooterH3.lines, splits.heroFooterP.lines],
      {
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      },
      "-=1.5"
    )
    .to(
      ".btn",
      {
        scale: 1,
        duration: 1,
        ease: "power4.out",
        onStart: () => {
          tl.to(".btn-icon", {
            clipPath: "circle(100% at 50% 50%)",
            duration: 1,
            ease: "power2.out",
            delay: -1.25,
          }).to(splits.btnLabels.lines, {
            y: 0,
            duration: 1,
            ease: "power4.out",
            delay: -1.25,
          });
        },
      },
      "<"
    );
    });
  }
});
</script>

<style scoped>
.storytelling-section {
  position: relative;
  width: 100%;
  height: 100vh;
  margin-top: 0;
  z-index: 10;
}

.storytelling-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.traffic-map-section {
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 5;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

html, body {
  overflow-x: hidden;
}

.preloader-progress,
.preloader-mask {
  z-index: 1000;
}

@media (max-width: 768px) {
  .storytelling-section {
    height: 100vh;
    margin-top: 0;
  }
  
  .storytelling-wrapper {
    border-radius: 0;
  }
}
</style>