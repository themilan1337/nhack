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
        Our 
        <span class="relative inline-block">
          Services
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
        Comprehensive transportation solutions designed for the modern world
      </p>
    </div>
  </section>

  <!-- Main Services Section -->
  <section class="bg-white py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Transportation Solutions</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">From daily commutes to special occasions, we've got you covered</p>
      </div>
      
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Ride Service -->
        <div class="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 bg-[#C0F11C] rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">inDrive Rides</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Our flagship service connecting passengers with drivers. Set your own price, 
                choose your driver, and enjoy transparent, fair transportation.
              </p>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Price negotiation
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Driver selection
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Real-time tracking
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Delivery Service -->
        <div class="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 bg-[#C0F11C] rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">inDrive Delivery</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Fast and reliable delivery service for packages, documents, and goods. 
                Same-day delivery with transparent pricing.
              </p>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Same-day delivery
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Package tracking
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Secure handling
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Freight Service -->
        <div class="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 bg-[#C0F11C] rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">inDrive Freight</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Heavy-duty transportation for businesses. Move large items, furniture, 
                and commercial goods with our network of truck drivers.
              </p>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Commercial transport
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Large item moving
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Business solutions
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Intercity Service -->
        <div class="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 bg-[#C0F11C] rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">inDrive Intercity</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Long-distance travel made easy. Connect with drivers for intercity trips 
                with comfortable vehicles and competitive pricing.
              </p>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Long-distance travel
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Comfortable vehicles
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-[#C0F11C] rounded-full"></div>
                  Flexible scheduling
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="bg-gray-50 py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Our Services</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Advanced features that make transportation simple and reliable</p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
          <p class="text-gray-600">Multiple payment options with bank-level security</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
          <p class="text-gray-600">Round-the-clock customer service and assistance</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Quality Assurance</h3>
          <p class="text-gray-600">Verified drivers and vehicles for your safety</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Real-time Tracking</h3>
          <p class="text-gray-600">Live GPS tracking for all your trips and deliveries</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Smart Analytics</h3>
          <p class="text-gray-600">Data-driven insights for optimal route planning</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Verified Network</h3>
          <p class="text-gray-600">Thoroughly vetted drivers and service providers</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="bg-black text-white py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Our Services?</h2>
      <p class="text-xl text-gray-300 mb-8">Join millions of satisfied customers worldwide</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="bg-[#C0F11C] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#a8d919] transition-colors duration-300">
          Get Started
        </button>
        <button class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-colors duration-300">
          View Pricing
        </button>
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