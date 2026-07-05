// スクロールアニメーション
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    elements.forEach(el => observer.observe(el));
});
// CV Password Request (about.html)
const cvSendBtn = document.getElementById('cv-send-btn');
if (cvSendBtn) {
    cvSendBtn.addEventListener('click', function() {
        const nameInput = document.getElementById('cv-requester-name');
        const errorEl = document.getElementById('cv-name-error');
        const name = nameInput.value.trim();
        if (!name) { errorEl.hidden = false; nameInput.focus(); return; }
        errorEl.hidden = true;
        const subject = encodeURIComponent('CV Password Request');
        const body = encodeURIComponent(
            'Hi Vicky,\n\nMy name is ' + name + '.\n' +
            'I would like to request the password for your English CV PDF.\n\nThank you!'
        );
        window.location.href = 'mailto:t.miaka1023@gmail.com?subject=' + subject + '&body=' + body;
    });

    document.getElementById('cv-requester-name').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') cvSendBtn.click();
    });
}