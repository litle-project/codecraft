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

 const toggleMember = (selector) => {
    [...document.querySelectorAll('.member-filter')].map((element) => {
        element.classList.remove('bg-white', 'text-indigo-400');
        element.classList.add('bg-white/20', 'text-white');
    });

    const memberHeader = document.getElementById(selector);
    memberHeader.classList.remove('bg-white/20', 'text-white');
    memberHeader.classList.add('bg-white', 'text-indigo-400');

    [...document.querySelectorAll('.member')].map((element) => {
        element.classList.add('hidden')
    });

    [...document.querySelectorAll(`[title="${selector}"]`)].map((element) => {
        element.classList.remove('hidden')
    });

    if (selector === 'all') {
        [...document.querySelectorAll('.member')].map((element) => {
            element.classList.remove('hidden')
        });
    }
 }

 const toggleMenu = (selector) => {
    const element = document.getElementById(selector);
    const isHide = element.classList.contains('hidden');

    if (isHide) {
        element.classList.remove('hidden')
        element.classList.add('flex')
    } else {
        element.classList.remove('flex')
        element.classList.add('hidden')
    }
 };

 const captureVistor = () => {
    fetch('https://checkip.amazonaws.com/')
        .then((response) => response.text())
        .then((ip) => logVistor(ip));
 }

 const logVistor = (ip) => {
    const currentdate = new Date(); 
    const datetime = currentdate.toISOString().replace("T"," ").substring(0, 19);

    fetch('https://api.sheety.co/13e7e8c5ab29785dd8caf76587acdae5/codecraft/visitor', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        visitor: { datetime, ipAddress: ip.replace(/\n/g, '') }
      })
    })
 }

 const sendMessage = () => {
    const currentdate = new Date();
    const notif = document.getElementById('notification')
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const datetime = currentdate.toISOString().replace("T"," ").substring(0, 19);

    const validatorName = document.getElementById('validator-name')
    const validatorEmail = document.getElementById('validator-email')
    const validatorMessage = document.getElementById('validator-message')

    validatorName.innerHTML = ''
    validatorEmail.innerHTML = ''
    validatorMessage.innerHTML = ''

    if (name.value === '') {
        validatorName.classList.remove('hidden')
        validatorName.innerHTML = 'We need your name to know you better!'
    }

    if (email.value === '') {
        validatorEmail.classList.remove('hidden')
        validatorEmail.innerHTML = 'We need your email to reply your message!'
    }

    if (message.value === '') {
        validatorMessage.classList.remove('hidden')
        validatorMessage.innerHTML = 'We need your message to give you a solution to your business!'
    }

    if (message.value !== '' && message.value.length < 10) {
        validatorMessage.classList.remove('hidden')
        validatorMessage.innerHTML = "We don't know what's your problem with this message, your message too short!"
    }

    if (name.value === '' || email.value === '' || message.value === '') return void(0);

    fetch('https://api.sheety.co/13e7e8c5ab29785dd8caf76587acdae5/codecraft/message', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          message: {
            name: name.value,
            email: email.value,
            message: message.value,
            datetime,
        }
        })
    }).then(() => {
        name.value = ''
        email.value = ''
        message.value = ''
        validatorName.innerHTML = ''
        validatorEmail.innerHTML = ''
        validatorMessage.innerHTML = ''
        notif.classList.remove('hidden')

        setTimeout(() => {
            notif.classList.add('hidden')
        }, 5000)
    })
 };

 (function() {
    const urls = window.location.pathname;
    const path = urls.split('/').pop();
    let pathname = path.split('.').shift();
    if (pathname === 'index' || !pathname) pathname = 'home';

    const elements = document.getElementById(pathname);
    elements.classList.add('active');
    
    const query = new URL(document.location.toString()).searchParams;

    if (pathname === 'service') {
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

    if (pathname === 'member') {
        const type = query.get("type") || 'all';
        
        const memberHeader = document.getElementById(type)
        memberHeader.classList.remove('bg-white/20', 'text-white')
        memberHeader.classList.add('bg-white', 'text-indigo-400')
    }

    captureVistor()
 })();