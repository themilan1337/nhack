<template>
    <div class="preloader-progress">
      <div class="preloader-progress-bar"></div>
      <div class="preloader-logo"><h1 class="epilogue">inDrive</h1></div>
    </div>

    <div class="preloader-mask"></div>

    <!-- Hero Video Section -->
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
        
        <!-- Dark Overlay -->
        <div class="absolute inset-4 bg-black/40 rounded-2xl pointer-events-none"></div>
        
        <!-- Logo at Top -->
        <div class="absolute top-8 left-8 md:top-12 md:left-12 z-10 pointer-events-none">
            <img src="/image.svg" alt="inDrive Logo" class="h-10 md:h-14 w-auto" />
        </div>
        
        <!-- Text Overlay -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="text-center px-4 md:px-8 lg:px-16 mt-16 md:mt-20 lg:mt-24">
                <h1 class="hero-text epilogue text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white drop-shadow-2xl leading-tight">
                    Revolutionizing<br>Transportation
                </h1>
            </div>
        </div>
    </div>
    
    
    <!-- Storytelling Map Section -->
    <div class="storytelling-section">
        <StorytellingMap />
    </div>
</template>
<script setup>
import gsap from "gsap";
import { onMounted } from "vue";
import StorytellingMap from "~/components/StorytellingMap.vue";

let SplitText;

// Dynamically import and register SplitText plugin only on client-side
if (process.client) {
  import('gsap/SplitText').then((module) => {
    SplitText = module.SplitText;
    gsap.registerPlugin(SplitText);
  });
}

onMounted(async () => {
  // Wait for SplitText to be loaded
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
  min-height: 100vh;
  z-index: 10;
}

/* Ensure video section has proper z-index */
.preloader-progress,
.preloader-mask {
  z-index: 1000;
}
</style>