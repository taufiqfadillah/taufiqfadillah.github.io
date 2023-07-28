const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await axios.post('/signin', {
      email: email,
      password: password,
    });

    Swal.fire('Berhasil', response.data.message, 'success');
    loginForm.reset();
  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.error ? error.response.data.error : 'Terjadi kesalahan saat melakukan Sign In.';
    Swal.fire('Error', errorMessage, 'error');
  }
});
