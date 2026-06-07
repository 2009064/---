document.addEventListener('DOMContentLoaded', () => {
    // ========== قائمة الجوال ==========
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('mobileSidebar');
    const closeBtn = document.getElementById('closeSidebar');

    if (mobileBtn && sidebar && closeBtn) {
        mobileBtn.addEventListener('click', () => sidebar.classList.add('open'));
        closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));
        window.addEventListener('click', (e) => {
            if (e.target === sidebar) sidebar.classList.remove('open');
        });
    }

    // ========== الأرقام المتحركة (Counters) ==========
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const startCounter = (counter) => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = parseInt(counter.innerText.replace(/[^0-9]/g, '') || '0');
            const increment = target / speed;
            
            if (count < target) {
                count = Math.ceil(count + increment);
                if (target === 9999) {
                    counter.innerText = (count / 100).toFixed(2);
                } else {
                    counter.innerText = count;
                }
                setTimeout(updateCount, 20);
            } else {
                if (target === 9999) counter.innerText = '99.99';
                else counter.innerText = target;
            }
        };
        updateCount();
    };

    // تفعيل العداد عند ظهور القسم
    const observerCounter = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observerCounter.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observerCounter.observe(counter));

    // ========== تأثير ظهور العناصر عند التمرير ==========
    const animateElements = document.querySelectorAll('.rank-card, .feature-card, .timeline-item, .comparison-row');
    const appearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = '0.5s';
        appearObserver.observe(el);
    });

    // ========== تأثير نقر على الأزرار ==========
    const allButtons = document.querySelectorAll('.btn-imperial, .btn-outline-gold, .rank-order, .contact-wa, .contact-channel, .btn-gold, .btn-purple');
    allButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.97)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    });

    console.log('👑 VITO EMPIRE | إمبراطورية الخوادم الأسطورية');
});