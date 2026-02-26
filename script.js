const form = document.querySelector('#fuel-form');
const resultado = document.querySelector('#resultado');

const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valor);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const gasolina = Number.parseFloat(form.gasolina.value.replace(',', '.'));
  const etanol = Number.parseFloat(form.etanol.value.replace(',', '.'));

  if (!Number.isFinite(gasolina) || !Number.isFinite(etanol) || gasolina <= 0 || etanol <= 0) {
    resultado.classList.remove('hidden');
    resultado.innerHTML = '<strong>Digite valores válidos maiores que zero.</strong>';
    return;
  }

  const proporcao = etanol / gasolina;
  const limite = 0.7;
  const melhorOpcao = proporcao <= limite ? 'Etanol' : 'Gasolina';

  resultado.classList.remove('hidden');
  resultado.innerHTML = `
    <strong>Melhor opção: ${melhorOpcao}</strong>
    <p>Etanol / Gasolina = ${(proporcao * 100).toFixed(1)}%</p>
    <p>Com gasolina em ${formatarMoeda(gasolina)} e etanol em ${formatarMoeda(etanol)},
    a recomendação é abastecer com <strong>${melhorOpcao}</strong>.</p>
  `;
});
