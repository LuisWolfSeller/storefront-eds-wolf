export default function decorate(block) {
  const paragraphs = block.querySelectorAll('p');

  const texto = paragraphs[0]?.textContent.trim() || 'texto prueba';

  const separator = document.createElement('p');

  separator.innerText = texto;

  block.innerHTML = '';
  block.appendChild(separator);
}
