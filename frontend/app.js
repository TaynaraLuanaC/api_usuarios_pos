// Importando a biblioteca SweetAlert2
import Swal from 'sweetalert2';

document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Fazendo uma requisição POST para cadastrar o usuário
  fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
      // Exibir um alerta de sucesso usando SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Usuário cadastrado com sucesso!'
      });

      // Limpar os campos do formulário após o cadastro bem-sucedido
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    } else {
      throw new Error('Erro ao cadastrar usuário.');
    }
  })
  .catch(error => {
    // Exibir uma mensagem de erro
    document.getElementById('message').innerHTML = error.message;
    document.getElementById('message').style.color = 'red';
  });
});
