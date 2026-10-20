document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    if (!main) return;

    const targets = 'main > section:not(.detail-body), main .detail-section, main .work-item, main .contact-card, main .info-card';
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        main.querySelectorAll(targets).forEach(element => element.classList.add('show'));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('show');
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    const observeTargets = root => {
        if (root.matches?.(targets)) {
            root.classList.add('fade-up');
            observer.observe(root);
        }

        root.querySelectorAll?.(targets).forEach(element => {
            element.classList.add('fade-up');
            observer.observe(element);
        });
    };

    observeTargets(main);

    const mutations = new MutationObserver(records => {
        records.forEach(record => {
            record.addedNodes.forEach(node => {
                if (node instanceof Element) observeTargets(node);
            });
        });
    });

    mutations.observe(main, { childList: true, subtree: true });
});
