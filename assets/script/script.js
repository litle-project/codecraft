(function() {
    const urls = window.location.pathname;
    const path = urls.split('/').pop();
    let pathname = path.split('.').shift();
    if (pathname === 'index' || !pathname) pathname = 'home';

    const elements = document.getElementById(pathname);
    elements.classList.add('active');
 })();