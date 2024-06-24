// Índice:
// 1. Constantes
// 2. Eventos
// 3. Funções

// 1. Constantes - Seleção de elementos do DOM
const inputTextArea = document.getElementById('inputText');
const encryptButton = document.getElementById('encryptButton');
const decryptButton = document.getElementById('decryptButton');
const outputPanel = document.getElementById('resultPanel');
const outputText = document.getElementById('outputText');
const copyButton = document.getElementById('copyButton');

// Conteúdo original do painel lateral
const originalOutputContent = outputPanel.innerHTML;

// Regras de conversão para criptografia e descriptografia
const conversionRules = {
  'e': 'enter',
  'i': 'imes',
  'a': 'ai',
  'o': 'ober',
  'u': 'ufat'
};

// 2. Eventos

// Evento de clique no botão de criptografar
encryptButton.addEventListener('click', encryptText);

// Evento de clique no botão de descriptografar
decryptButton.addEventListener('click', decryptText);

// Evento de clique no botão de copiar
copyButton.addEventListener('click', copyClipboard);

// 3. Funções

// Função para criptografar o texto
function encryptText(e) {
  e.preventDefault(); // Previne o comportamento padrão do formulário
  const inputText = inputTextArea.value; // Obtém o texto de entrada do textarea
  let result = '';

  if (inputText.length === 0) return; // Retorna se o campo estiver vazio

  // Aplica as regras de conversão para criptografia
  for (let char of inputText) {
    result += conversionRules[char] || char; // Concatena o resultado conforme a regra ou mantém o caractere original
  }
  outputPanel.innerHTML = ''; // Limpa o conteúdo atual do painel de saída
  updateOutput(result); // Atualiza o painel de saída com o resultado criptografado
  cleanInput(); // Limpa o campo de entrada após a criptografia
}

// Função para descriptografar o texto
function decryptText(e) {
  e.preventDefault(); // Previne o comportamento padrão do formulário
  const inputText = inputTextArea.value; // Obtém o texto de entrada do textarea

  if (inputText.length === 0) return; // Retorna se o campo estiver vazio

  let result = inputText;
  // Reverte a conversão de acordo com as regras
  for (const [key, value] of Object.entries(conversionRules)) {
    result = result.split(value).join(key); // Substitui todas as ocorrências da regra pelo caractere original
  }
  outputPanel.innerHTML = ''; // Limpa o conteúdo atual do painel de saída
  updateOutput(result); // Atualiza o painel de saída com o resultado descriptografado
  cleanInput(); // Limpa o campo de entrada após a descriptografia
}

// Função para limpar o campo de entrada
function cleanInput() {
  inputTextArea.value = ''; // Define o valor do textarea como vazio
}

// Função para copiar o texto de saída para a área de transferência do navegador
function copyClipboard() {
  navigator.clipboard.writeText(outputText.textContent) // Copia o texto de saída para a área de transferência
    .then(() => {
      copyButton.classList.add('hidden'); // Esconde o botão de copiar após a cópia
      outputPanel.innerHTML = originalOutputContent; // Restaura o conteúdo original do painel de saída
    })
    .catch(err => {
      console.error('Erro ao copiar texto: ', err); // Exibe um erro caso a cópia falhe
    });
}

// Função para atualizar o conteúdo do painel de saída
function updateOutput(message) {
  outputText.textContent = message; // Define o texto de saída
  copyButton.classList.remove('hidden'); // Mostra o botão de copiar
  outputPanel.appendChild(outputText); // Adiciona o texto ao painel lateral
  outputPanel.appendChild(copyButton); // Adiciona o botão de copiar ao painel lateral
}
