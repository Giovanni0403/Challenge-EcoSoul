const satisfacao = document.getElementById('satisfacao');
const valorSatisfacao = document.getElementById('valorSatisfacao');

if (satisfacao && valorSatisfacao) {
  valorSatisfacao.textContent = satisfacao.value;

  satisfacao.addEventListener('input', function() {
    valorSatisfacao.textContent = this.value;
  });
}
