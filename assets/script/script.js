(function() {
    const urls = window.location.pathname;
    const path = urls.split('/').pop();
    let pathname = path.split('.').shift();
    if (pathname === 'index' || !pathname) pathname = 'home';

    const elements = document.getElementById(pathname);
    elements.classList.add('active');

    if (pathname === 'service') {
        const query = new URL(document.location.toString()).searchParams;
        const category = query.get("category") || 'rnd';

        [...document.querySelectorAll('.service-content')].map((element) => {
            element.classList.add('hidden')
        })
    
        const serviceContent = document.getElementById(`service-${category}`)
        serviceContent.classList.remove('hidden')

        const serviceHeader = document.getElementById(category)
        serviceHeader.classList.remove('bg-white/20', 'text-white')
        serviceHeader.classList.add('bg-white', 'text-indigo-400')
    }
 })();

 const toggleService = (selector) => {
    [...document.querySelectorAll('.service-filter')].map((element) => {
        element.classList.remove('bg-white', 'text-indigo-400');
        element.classList.add('bg-white/20', 'text-white');
    });

    [...document.querySelectorAll('.service-content')].map((element) => {
        element.classList.add('hidden')
    })

    const serviceContent = document.getElementById(`service-${selector}`)
    serviceContent.classList.remove('hidden')

    const serviceHeader = document.getElementById(selector)
    serviceHeader.classList.remove('bg-white/20', 'text-white')
    serviceHeader.classList.add('bg-white', 'text-indigo-400')
 }