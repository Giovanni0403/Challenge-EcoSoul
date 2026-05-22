// Atualiza o numero exibido ao lado do controle de satisfacao.
const satisfacao = document.getElementById('satisfacao');
const valorSatisfacao = document.getElementById('valorSatisfacao');
const formularioContato = document.forms.contato;
const feedbackContato = document.getElementById('feedbackContato');

if (satisfacao && valorSatisfacao) {
  valorSatisfacao.textContent = satisfacao.value;

  satisfacao.addEventListener('input', function() {
    valorSatisfacao.textContent = this.value;
  });
}

// Exibe uma mensagem clara de sucesso ou erro ao tentar enviar o formulario.
if (formularioContato && feedbackContato) {
  formularioContato.addEventListener('submit', function(evento) {
    evento.preventDefault();

    if (!formularioContato.checkValidity()) {
      feedbackContato.textContent = 'Preencha corretamente os campos obrigatorios antes de enviar.';
      feedbackContato.className = 'feedback-contato feedback-contato--erro';
      formularioContato.reportValidity();
      return;
    }

    feedbackContato.textContent = 'Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato.';
    feedbackContato.className = 'feedback-contato feedback-contato--sucesso';
    formularioContato.reset();

    if (valorSatisfacao && satisfacao) {
      valorSatisfacao.textContent = satisfacao.value;
    }
  });
}
