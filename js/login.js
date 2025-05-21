const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');

btnLogin.addEventListener('click', () => {
  btnLogin.classList.add('active');
  btnRegister.classList.remove('active');
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
});

btnRegister.addEventListener('click', () => {
  btnRegister.classList.add('active');
  btnLogin.classList.remove('active');
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});

// LOGIN
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Sesión iniciada correctamente');
      localStorage.setItem('userId', data._id);
      window.location.href = 'index.html';
    } else {
      alert(data.message || 'Error al iniciar sesión');
    }
  } catch (error) {
    alert('Error de conexión con el servidor');
    console.error(error);
  }
});

// REGISTRO
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const canTeach = document.getElementById('reg-canTeach').value.split(',').map(s => s.trim());
  const wantToLearn = document.getElementById('reg-wantToLearn').value.split(',').map(s => s.trim());

  try {
    const res = await fetch('http://localhost:8000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, canTeach, wantToLearn })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registro exitoso. Ahora inicia sesión.');
      btnLogin.click();
    } else {
      alert(data.message || 'Error al registrarse');
    }
  } catch (error) {
    alert('Error de conexión con el servidor');
    console.error(error);
  }
});
