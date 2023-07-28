const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(signupForm);
  const fullName = formData.get('fullname');
  const email = formData.get('email');
  const password = formData.get('password');
  const passwordRepeat = formData.get('password-repeat');

  if (password !== passwordRepeat) {
    Swal.fire('Error', 'Password tidak sesuai dengan retype password.', 'error');
    return;
  }

  try {
    const response = await axios.post('/signup', {
      fullname: fullName,
      email: email,
      password: password,
    });

    Swal.fire('Berhasil', response.data.message, 'success');
    signupForm.reset();
  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.error ? error.response.data.error : 'Terjadi kesalahan saat melakukan registrasi.';
    Swal.fire('Error', errorMessage, 'error');
  }
});
