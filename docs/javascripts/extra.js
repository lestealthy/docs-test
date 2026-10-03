// WattLab Guides - Extra JavaScript

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add copy buttons to code blocks
    document.querySelectorAll('pre code').forEach(block => {
        const pre = block.parentElement;
        if (pre.querySelector('.copy-button')) return;
        
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: var(--md-accent-fg-color);
            color: var(--md-primary-fg-color);
            border: none;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.75rem;
            font-weight: 600;
            opacity: 0.8;
            transition: opacity 0.2s;
        `;
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.textContent = 'Copied!';
                button.style.background = '#4caf50';
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.style.background = 'var(--md-accent-fg-color)';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
        
        pre.style.position = 'relative';
        pre.appendChild(button);
    });

    // Add reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--md-accent-fg-color);
        z-index: 10000;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
});
