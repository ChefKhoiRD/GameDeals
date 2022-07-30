const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
        console.log('signup success');
        document.location.replace('/');
    } else {
        console.log(response);
    }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);