<template>
    <!--  -->
    <div class="preloader-progress">
      <div class="preloader-progress-bar"></div>
      <div class="preloader-logo"><h1>inDrive</h1></div>
    </div>

    <div class="preloader-mask"></div>

    <div class="!p-4 w-screen h-screen">
        <video 
            src="/assets/hero.mp4"
            loop
            autoplay
            muted
            playsinline
            preload="auto"
            class="w-full h-full object-cover rounded-2xl"
        ></video>
    </div>
    
</template>
<script setup>
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
  // Only create split text for preloader logo
  const logoSplit = SplitText.create(".preloader-logo h1", {
    type: "chars",
    mask: "chars",
    charsClass: "char"
  });

  // Set initial states for preloader elements
  gsap.set(logoSplit.chars, { x: "100%" });

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

  // Preloader animation timeline
  const tl = gsap.timeline({ delay: 0.5 });

  tl.to(logoSplit.chars, {
    x: "0%",
    stagger: 0.05,
    duration: 1,
    ease: "power4.inOut",
  })
    .add(animateProgress(), "0.25")
    .set(".preloader-progress", { backgroundColor: "#fff" })
    .to(
      logoSplit.chars,
      {
        x: "-100%",
        stagger: 0.05,
        duration: 1,
        ease: "power4.inOut",
      },
      "-=0.5"
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
    );
});
</script>
