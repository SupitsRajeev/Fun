// Mobile menu toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Enhanced parallax effect for glass sphere with mouse interaction
let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = (e.clientY / window.innerHeight) * 2 - 1
})

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const sphere = document.querySelector(".glass-sphere")
  const prism = document.querySelector(".glass-sphere-prism")
  const distortion = document.querySelector(".text-distortion")
  const rate = scrolled * -0.3

  if (sphere) {
    sphere.style.transform = `translate(-50%, -50%) translateY(${rate}px) translateX(${mouseX * 10}px) translateZ(0)`
  }

  if (prism) {
    prism.style.transform = `translate(-50%, -50%) translateY(${rate * 0.8}px) translateX(${mouseX * 8}px) rotate(${scrolled * 0.1}deg)`
  }

  if (distortion) {
    distortion.style.transform = `translate(-50%, -50%) translateY(${rate}px) translateX(${mouseX * 5}px)`
  }
})

// Add mouse interaction to hero title
const heroTitle = document.querySelector(".hero-title")
if (heroTitle) {
  heroTitle.addEventListener("mouseenter", () => {
    const sphere = document.querySelector(".glass-sphere")
    const prism = document.querySelector(".glass-sphere-prism")

    if (sphere) {
      sphere.style.transform += " scale(1.05)"
      sphere.style.filter = "brightness(1.1)"
    }

    if (prism) {
      prism.style.opacity = "0.8"
    }
  })

  heroTitle.addEventListener("mouseleave", () => {
    const sphere = document.querySelector(".glass-sphere")
    const prism = document.querySelector(".glass-sphere-prism")

    if (sphere) {
      sphere.style.filter = "brightness(1)"
    }

    if (prism) {
      prism.style.opacity = "0.6"
    }
  })
}

// Add bubble click interaction
document.querySelectorAll(".bubble-small").forEach((bubble) => {
  bubble.addEventListener("click", () => {
    bubble.style.animation = "none"
    bubble.style.transform = "scale(1.5)"
    bubble.style.opacity = "0"

    setTimeout(() => {
      bubble.style.animation = "floatSmall 8s ease-in-out infinite"
      bubble.style.transform = "scale(1)"
      bubble.style.opacity = "0.7"
    }, 500)
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"
  }
})

// Work filter functionality
const filterBtns = document.querySelectorAll(".filter-btn")
const workItems = document.querySelectorAll(".work-item")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))
    // Add active class to clicked button
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")

    workItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block"
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "translateY(0)"
        }, 100)
      } else {
        item.style.opacity = "0"
        item.style.transform = "translateY(20px)"
        setTimeout(() => {
          item.style.display = "none"
        }, 300)
      }
    })
  })
})

// Contact form handling
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Here you would typically send the data to your server
  // For now, we'll just show an alert
  alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`)

  // Reset form
  contactForm.reset()
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".work-item, .skill-category, .about-text")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Add scroll progress indicator
const scrollProgress = document.createElement("div")
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #ff6b35, #ff8c42);
    z-index: 9999;
    transition: width 0.1s ease;
`
document.body.appendChild(scrollProgress)

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.offsetHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.style.width = scrollPercent + "%"
})
