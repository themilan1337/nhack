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
        Get in 
        <span class="relative inline-block">
          Touch
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
        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
    </div>
  </section>

  <!-- Contact Form Section -->
  <section class="bg-white py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Contact Form -->
        <div>
          <h2 class="text-4xl font-bold text-gray-900 mb-8">Send us a Message</h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="form.firstName"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0F11C] focus:border-transparent transition-colors duration-200"
                  placeholder="John"
                >
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="form.lastName"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0F11C] focus:border-transparent transition-colors duration-200"
                  placeholder="Doe"
                >
              </div>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0F11C] focus:border-transparent transition-colors duration-200"
                placeholder="john.doe@example.com"
              >
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="form.phone"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0F11C] focus:border-transparent transition-colors duration-200"
                placeholder="+7 777 123 4567"
              >
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select 
                id="subject" 
                v-model="form.subject"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0F11C] focus:border-transparent transition-colors duration-200"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Customer Support</option>
                <option value="partnership">Partnership</option>
                <option value="press">Press & Media</option>
                <option value="careers">Careers</option>
              </select>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                id="message" 
                v-model="form.message"
                required
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0F11C] focus:border-transparent transition-colors duration-200 resize-none"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full bg-[#C0F11C] text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a8d919] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>
          </form>
        </div>
        
        <!-- Contact Information -->
        <div class="lg:pl-8">
          <h2 class="text-4xl font-bold text-gray-900 mb-8">Contact Information</h2>
          
          <div class="space-y-8">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-[#C0F11C] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Office Address</h3>
                <p class="text-gray-600">Astana Hub International IT Park<br>55/15 Mangilik El Avenue<br>Astana, Kazakhstan 010000</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-[#C0F11C] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Phone Numbers</h3>
                <p class="text-gray-600">Customer Support: +7 777 123 4567<br>Business Inquiries: +7 777 123 4568<br>Press & Media: +7 777 123 4569</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-[#C0F11C] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Email Addresses</h3>
                <p class="text-gray-600">General: hello@indrive.com<br>Support: support@indrive.com<br>Press: press@indrive.com</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-[#C0F11C] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Business Hours</h3>
                <p class="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br>Saturday: 10:00 AM - 4:00 PM<br>Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <!-- Social Media Links -->
          <div class="mt-12">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">Follow Us</h3>
            <div class="flex gap-4">
              <a href="#" class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#C0F11C] transition-colors duration-300">
                <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#C0F11C] transition-colors duration-300">
                <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#C0F11C] transition-colors duration-300">
                <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#C0F11C] transition-colors duration-300">
                <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Map Section -->
  <section class="bg-gray-100 py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
        <p class="text-xl text-gray-600">Visit our headquarters in Astana</p>
      </div>
      
      <!-- Placeholder for map - you can integrate with actual map service -->
      <div class="bg-gray-300 rounded-2xl h-96 flex items-center justify-center">
        <div class="text-center">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Interactive Map</h3>
          <p class="text-gray-600">Astana Hub International IT Park</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from "gsap";
import { ref, reactive, onMounted } from "vue";
import Menu from "~/components/Menu.vue";

let SplitText;

// Form data
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);

// Form submission
const submitForm = async () => {
  isSubmitting.value = true;
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Reset form
  Object.keys(form).forEach(key => {
    form[key] = '';
  });
  
  isSubmitting.value = false;
  
  // You can add actual form submission logic here
  alert('Thank you for your message! We\'ll get back to you soon.');
};

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