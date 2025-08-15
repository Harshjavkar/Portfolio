const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

// --- Animation on Scroll for Section Titles, Hero, and Main Sections ---
function animateOnScroll() {
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.section-title, #hero .hero > div, .skills.container, .projects.container, .about.container, .contact.container').forEach(el => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', animateOnScroll);

// Contact Form Submission Handler
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Optionally, add validation here
    formSuccess.style.display = 'block';
    contactForm.reset();
    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 4000);
  });
}

// --- Recent Projects: data-driven render ---
const projectsData = [
	{
		title: 'College Management System',
		subtitle: 'Java',
		description: 'Created an application using Java which helped in performing college daily operations. The workload of the worker is decreased also having a Chat module in it.',
		image: './img/img-1.png'
	},
	{
		title: 'College Management System',
		subtitle: 'Python',
		description: 'Created an application using Python/Django which helped in performing college daily operations. The workload of the worker is decreased, also having a Chat module in it as well it will showcase the result of the student and can contact with the faculties.',
		image: './img/img-1.png'
	},
	{
		title: 'Self Employment For Women',
		subtitle: "JavaScript, HTML & CSS, APIs, TypeScript",
		description: 'With the help of this web application we deliver home food made by women to maintain the home food authenticity and also generate employment for women.',
		image: './img/img-1.png'
	},
	{
		title: 'Plant Watering System',
		subtitle: 'IoT',
		description: 'The Plant Watering System is an automated solution that uses soil moisture sensors to monitor plant hydration levels. It activates a water pump to irrigate plants only when needed, ensuring efficient water usage.',
		image: './img/img-1.png'
	},
	{
		title: 'BlockCert',
		subtitle: 'Blockchain',
		description: 'BlockCert is a blockchain-based certification system that ensures secure, tamper-proof issuance and verification of academic credentials. It empowers institutions to issue verifiable certificates and individuals to share them globally with trust.',
		image: './img/img-1.png'
	}
];

function renderProjects() {
	const container = document.querySelector('#projects .all-projects');
	if (!container) return;
	container.innerHTML = projectsData.map(p => `
		<div class="project-item">
			<div class="toy-3d" aria-hidden="true">
				<div class="ring ring1"></div>
				<div class="ring ring2"></div>
				<div class="ring ring3"></div>
			</div>
			<div class="project-info">
				<h1>${p.title}</h1>
				<h2>${p.subtitle}</h2>
				<p>${p.description}</p>
			</div>
		</div>
	`).join('');
	initProjectInteractivity();
}

document.addEventListener('DOMContentLoaded', renderProjects);

function initProjectInteractivity() {
	const cards = document.querySelectorAll('#projects .project-item');
	cards.forEach((card) => {
		let rafId = null;
		const toy = card.querySelector('.toy-3d');

		function onMove(e) {
			const rect = card.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			const rotateX = (0.5 - y) * 10; // tilt range
			const rotateY = (x - 0.5) * 14;
			const translateZ = 14;
			if (rafId) cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
				if (toy) toy.style.transform = `translateZ(${translateZ}px) rotateX(${rotateX * 1.2}deg) rotateY(${rotateY * 1.2}deg)`;
			});
		}

		function onLeave() {
			if (rafId) cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				card.style.transform = '';
				if (toy) toy.style.transform = '';
			});
		}

		card.addEventListener('mousemove', onMove);
		card.addEventListener('mouseleave', onLeave);

		// Click ripple
		card.addEventListener('click', (e) => {
			const ripple = document.createElement('span');
			ripple.className = 'ripple';
			const rect = card.getBoundingClientRect();
			ripple.style.left = `${e.clientX - rect.left}px`;
			ripple.style.top = `${e.clientY - rect.top}px`;
			card.appendChild(ripple);
			setTimeout(() => ripple.remove(), 650);
		});
	});
}
