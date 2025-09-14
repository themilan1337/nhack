<template>
  <!-- Menu Component -->
  <Menu />
  
  <div class="preloader-progress">
    <div class="preloader-progress-bar"></div>
    <div class="preloader-logo"><h1 class="epilogue">inDrive</h1></div>
  </div>

  <div class="preloader-mask"></div>

  <!-- Hero Section -->
  <section class="relative min-h-screen bg-black text-white flex items-center justify-center px-4">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    <div class="relative z-10 max-w-6xl mx-auto text-center">
      <h1 class="hero-text text-4xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
        About 
        <span class="relative inline-block">
          inDrive
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
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Pioneering the future of transportation through innovation, technology, and human-centered design
      </p>
    </div>
  </section>

  <!-- Mission Section -->
  <section class="bg-white py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p class="text-xl text-gray-600 mb-6 leading-relaxed">
            We believe transportation should be accessible, affordable, and efficient for everyone. 
            Our mission is to revolutionize urban mobility by connecting people through technology 
            and creating opportunities for drivers and passengers alike.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            Founded with the vision of making transportation fair and transparent, inDrive has grown 
            to become a global platform that empowers communities and transforms cities.
          </p>
        </div>
        <div class="bg-gray-100 rounded-2xl p-8 h-96 flex items-center justify-center">
          <div class="text-center">
            <div class="w-24 h-24 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Global Impact</h3>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Values Section -->
  <section class="bg-gray-50 py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">The principles that guide everything we do</p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
          <p class="text-gray-600">Constantly pushing boundaries to create better solutions</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Community</h3>
          <p class="text-gray-600">Building connections and empowering local communities</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Transparency</h3>
          <p class="text-gray-600">Open and honest in all our interactions and processes</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
          <p class="text-gray-600">Delivering the highest quality in everything we do</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="bg-black text-white py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">Our Impact</h2>
        <p class="text-xl text-gray-300">Numbers that tell our story</p>
      </div>
      
      <div class="grid md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-4xl md:text-5xl font-bold text-[#C0F11C] mb-2">50M+</div>
          <p class="text-lg text-gray-300">Active Users</p>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold text-[#C0F11C] mb-2">600+</div>
          <p class="text-lg text-gray-300">Cities Worldwide</p>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold text-[#C0F11C] mb-2">2M+</div>
          <p class="text-lg text-gray-300">Driver Partners</p>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold text-[#C0F11C] mb-2">1B+</div>
          <p class="text-lg text-gray-300">Trips Completed</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Team Section -->
  <section class="bg-white py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Leadership Team</h2>
        <p class="text-xl text-gray-600">Meet the visionaries driving our mission forward</p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Arsen Tomsky</h3>
          <p class="text-gray-600 mb-2">CEO & Founder</p>
          <p class="text-sm text-gray-500">Visionary leader with 15+ years in tech and transportation</p>
        </div>
        
        <div class="text-center">
          <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Maria Rodriguez</h3>
          <p class="text-gray-600 mb-2">CTO</p>
          <p class="text-sm text-gray-500">Technology expert leading our innovation initiatives</p>
        </div>
        
        <div class="text-center">
          <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">David Chen</h3>
          <p class="text-gray-600 mb-2">Head of Operations</p>
          <p class="text-sm text-gray-500">Operations specialist ensuring seamless global expansion</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from "gsap";
import { onMounted } from "vue";
import Menu from "~/components/Menu.vue";

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
        { key: "heroTextChars", selector: ".hero-text", type: "chars" },
      ];

      const splits = createSplitTexts(splitElements);

      gsap.set([splits.logoChars.chars], { x: "100%" });
      gsap.set([splits.heroTextChars.chars], { opacity: 0, y: 50 });
      
      // Set line animation initial state
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
        
        tl.to(".preloader-progress-bar", {
          width: "100%",
          duration: duration,
          ease: "power2.out",
        })
        .to(splits.logoChars.chars, {
          x: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
        }, "-=3")
        .to(".preloader-progress, .preloader-mask", {
          yPercent: -100,
          duration: 1.5,
          ease: "power4.inOut",
        })
        .to(splits.heroTextChars.chars, {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 1.5,
          ease: "power4.out",
        }, "-=0.5");
        
        // Animate the line
        if (heroLinePath) {
          tl.to(heroLinePath, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.out",
          }, "-=1");
        }
      }

      animateProgress();
    });
  }
});
</script>

<style scoped>
/* Preloader styles */
.preloader-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.preloader-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #C0F11C;
  z-index: 10001;
}

.preloader-logo {
  position: relative;
  z-index: 10002;
}

.preloader-logo h1 {
  font-size: 4rem;
  font-weight: 700;
  color: #000;
  font-family: 'Epilogue', sans-serif;
}

.preloader-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #C0F11C;
  z-index: 9999;
}

.char {
  display: inline-block;
  overflow: hidden;
}

.hero-line-path {
  filter: drop-shadow(0 0 10px rgba(192, 241, 28, 0.5));
}

@media (max-width: 768px) {
  .preloader-logo h1 {
    font-size: 2.5rem;
  }
}
</style>