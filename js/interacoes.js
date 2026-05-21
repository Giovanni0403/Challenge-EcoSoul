// Animacoes de entrada dos blocos principais.
const elementosAnimados = document.querySelectorAll(
  '.card, .card-app, .p_geral, .h2_geral, .h3_geral, .h4_geral, table, .lista_pagina, fieldset, .metrica-card, .destaque-card, .passo-card, .impacto-section, .impacto-dado, .solucao-card'
);

if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('aparecer');
        observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.15
  });

  elementosAnimados.forEach((elemento) => observador.observe(elemento));
} else {
  elementosAnimados.forEach((elemento) => elemento.classList.add('aparecer'));
}

// Botao fixo para voltar ao topo da pagina.
const botaoTopo = document.createElement('button');
botaoTopo.type = 'button';
botaoTopo.className = 'botao-topo';
botaoTopo.setAttribute('aria-label', 'Voltar ao topo');
botaoTopo.textContent = '\u2191';
document.body.appendChild(botaoTopo);

window.addEventListener('scroll', () => {
  botaoTopo.classList.toggle('visivel', window.scrollY > 300);
});

botaoTopo.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Feedback visual dos campos do formulario.
const camposFormulario = document.querySelectorAll('form input, form textarea, form select');

camposFormulario.forEach((campo) => {
  if (campo.type === 'submit' || campo.type === 'reset' || campo.type === 'range') {
    return;
  }

  campo.addEventListener('input', () => {
    if (campo.value.trim() === '') {
      campo.classList.remove('campo-valido', 'campo-invalido');
      return;
    }

    campo.classList.toggle('campo-valido', campo.checkValidity());
    campo.classList.toggle('campo-invalido', !campo.checkValidity());
  });
});

// Animacao numerica para metricas, quando existirem na pagina.
const numerosMetricas = document.querySelectorAll('[data-count]');

function animarContador(elemento) {
  const valorFinal = Number(elemento.dataset.count);
  const duracao = 1300;
  const inicio = performance.now();

  function atualizar(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const valorAtual = Math.floor(valorFinal * progresso);

    elemento.textContent = valorAtual.toLocaleString('pt-BR');

    if (progresso < 1) {
      requestAnimationFrame(atualizar);
    }
  }

  requestAnimationFrame(atualizar);
}

if ('IntersectionObserver' in window) {
  const observadorMetricas = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        animarContador(entrada.target);
        observadorMetricas.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.6
  });

  numerosMetricas.forEach((numero) => observadorMetricas.observe(numero));
} else {
  numerosMetricas.forEach((numero) => {
    numero.textContent = Number(numero.dataset.count).toLocaleString('pt-BR');
  });
}

// Mascara simples para telefone brasileiro.
const campoTelefone = document.querySelector('input[type="tel"]');

if (campoTelefone) {
  campoTelefone.addEventListener('input', () => {
    const numeros = campoTelefone.value.replace(/\D/g, '').slice(0, 11);
    const ddd = numeros.slice(0, 2);
    const primeiraParte = numeros.length > 10 ? numeros.slice(2, 7) : numeros.slice(2, 6);
    const segundaParte = numeros.length > 10 ? numeros.slice(7, 11) : numeros.slice(6, 10);

    if (numeros.length > 6) {
      campoTelefone.value = `(${ddd}) ${primeiraParte}-${segundaParte}`;
    } else if (numeros.length > 2) {
      campoTelefone.value = `(${ddd}) ${primeiraParte}`;
    } else if (numeros.length > 0) {
      campoTelefone.value = `(${ddd}`;
    } else {
      campoTelefone.value = '';
    }
  });
}
