const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
        console.log('login success');
        document.location.replace('/');
    } else {
        console.log(response);
    }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);