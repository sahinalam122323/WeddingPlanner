import './style.css'

function setupMobileMenu(){
	const toggle = document.querySelector('.menu-toggle') as HTMLButtonElement | null
	const nav = document.getElementById('primary-navigation')
	if(!toggle || !nav) return
	toggle.addEventListener('click', ()=>{
		const expanded = toggle.getAttribute('aria-expanded') === 'true'
		toggle.setAttribute('aria-expanded', String(!expanded))
		nav.classList.toggle('open')
	})
}

function animateCounters(){
	const counters = document.querySelectorAll<HTMLElement>('[data-count-target]')
	const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

	counters.forEach((counter, index) => {
		const target = Number(counter.dataset.countTarget) || 0
		const suffix = counter.dataset.suffix || ''
		const duration = 1400
		const delay = index * 200
		const startValue = 0

		const step = (timestamp: number, startTime: number) => {
			const progress = Math.min(Math.max((timestamp - startTime) / duration, 0), 1)
			const eased = easeOutCubic(progress)
			const currentValue = Math.floor(startValue + (target - startValue) * eased)
			counter.textContent = `${currentValue}${suffix}`
			if(progress < 1) requestAnimationFrame((ts) => step(ts, startTime))
		}

		const observer = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if(entry.isIntersecting){
					requestAnimationFrame((ts) => step(ts, performance.now() + delay))
					obs.unobserve(entry.target)
				}
			})
		}, { threshold: 0.4 })

		counter.textContent = '0'
		observer.observe(counter)
	})
}

if (document.readyState === 'loading'){
	document.addEventListener('DOMContentLoaded', () => {
		setupMobileMenu()
		animateCounters()
	})
} else {
	setupMobileMenu()
	animateCounters()
}
