
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const images = document.querySelectorAll('.carousel img');
  
  let currentIndex = 0;
  let autoScrollInterval;
  const scrollDelay = 3000; // 3 секунды
  
  // Функция для прокрутки к определенному изображению
  function scrollToImage(index) {
    if (index < 0) index = images.length - 1;
    else if (index >= images.length) index = 0;
    
    currentIndex = index;
    const imageWidth = images[0].clientWidth + 15; // Учитываем gap
    carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  }
  
  // Автопрокрутка
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      scrollToImage(currentIndex + 1);
    }, scrollDelay);
  }
  
  // Остановка автопрокрутки при наведении
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
  });
  
  // Возобновление автопрокрутки
  carousel.addEventListener('mouseleave', startAutoScroll);
  
  // Кнопки управления
  prevBtn.addEventListener('click', () => {
    scrollToImage(currentIndex - 1);
    resetAutoScroll();
  });
  
  nextBtn.addEventListener('click', () => {
    scrollToImage(currentIndex + 1);
    resetAutoScroll();
  });
  
  // Сброс таймера автопрокрутки при ручном управлении
  function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setTimeout(startAutoScroll, scrollDelay * 2);
  }
  
  // Запуск при загрузке
  startAutoScroll();
  
  // Адаптация при изменении размера окна
  window.addEventListener('resize', () => {
    scrollToImage(currentIndex);
  });
});


     const emailIcon = document.getElementById('emailIcon');
        const emailPopup = document.getElementById('emailPopup');
        const copyBtn = document.getElementById('copyBtn');
        const emailContainer = document.querySelector('.email-container'); // Добавьте этот элемент в HT
        
        emailIcon.addEventListener('click', function() {
            emailPopup.classList.toggle('show');
        });
        
     
        
        // Закрывать попап при клике вне его
        document.addEventListener('click', function(e) {
            if (!emailContainer.contains(e.target)) {
                emailPopup.classList.remove('show');
            }
        });







let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/*==================== scroll sections active link ====================*/

window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

/*==================== scroll reveal ====================*/

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
})

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*==================== typed js ====================

const typed = new Typed('.multiple-text', {
    strings: ['Backend Developer', 'Frontend Developer', 'IT Marketing Specialist'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

*/


/*==================== bot tg ====================*/
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById('contact-button');
    const messageDiv = document.getElementById('form-message'); // <--- добавь элемент <div id="form-message"></div> под кнопкой
    const originalBtnText = submitBtn.value;

    submitBtn.value = 'Отправка...';
    submitBtn.disabled = true;
    messageDiv.textContent = '';
    messageDiv.style.color = '';

    const formData = {
        name: form.fullname.value,
        email: form.email.value,
        phone: form.phone.value,
        subject: form.subject.value,
        message: form.message.value
    };

    try {
       const response = await fetch('https://resume-1-0yem.onrender.com/send-message', {
  method: 'POST',
  
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});

const result = await response.json();

        if (result.success) {
            messageDiv.textContent = 'Сообщение успешно отправлено!';
            messageDiv.style.color = 'green';
            form.reset();
        } else {
            messageDiv.textContent = 'Ошибка при отправке.';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Ошибка при отправке:', error);
        messageDiv.textContent = 'Ошибка соединения.';
        messageDiv.style.color = 'red';
    } finally {
        submitBtn.value = originalBtnText;
        submitBtn.disabled = false;
    }
});


/*==================== email validation ====================*/

const EMAIL_REGEXP = /^[a-zA-Z0–9+_.-]+@[a-zA-Z0–9.-]+$/;

let emailInput = document.getElementById('email');

emailInput.addEventListener('input', validateEmail);

function validateEmail() {
    if (!EMAIL_REGEXP.test(this.value)) {
        this.setCustomValidity('Проверьте правильность введённого email');
    } else {
        this.setCustomValidity('');
    }
    this.reportValidity();
}

/*==================== phone number validation ====================*/

const PHONE_REGEXP = /^[\d\+][\d\(\)\ -]{10,14}\d$/;

let phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', validatePhone);

function validatePhone() {
    if (!PHONE_REGEXP.test(this.value)) {
        this.setCustomValidity('Проверьте правильность введённого номера телефона');
    } else {
        this.setCustomValidity('');
    }
    this.reportValidity();
}
