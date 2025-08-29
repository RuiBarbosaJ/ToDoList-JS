/* 
    # Requisitos
    
    - Estilizar melhor a página X
    - Icons nos elementos 
    - Opção de marcar tarefa como concluida X
    - Poder selecionar todas as tarefas e marcar como concluidas -
    - Ordenar a lista, deixando as já marcadas como concluidas no final X
    - Colocar outros campos, ex data final da tarefa, descrição...
    */

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const tasksList = document.getElementById("tasks");
const limparTaskBtn = document.getElementById("limparTask");

addTaskBtn.addEventListener("click", addTask);
limparTaskBtn.addEventListener("click", limparTasks);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  const taskLi = criarTaskElement(taskText);
  tasksList.appendChild(taskLi);
  taskInput.value = "";
  taskInput.focus();
}

function limparTasks() {
  const itensList = document.querySelectorAll(".itens");
  itensList.forEach(function (itens) {
    itens.remove();
  });
}

function criarTaskElement(taskText) {
  const li = document.createElement("li");
  li.classList.add("itens");
  const ul = document.querySelector("#tasks");
  // Adicionar a data no atributo title do html quando a task for criada!
  const agora = new Date();
  li.title = "Criada em: " + agora.toLocaleDateString();

  // Criar checkbox do input/li
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";

  // Verificar se checkbox foi marcado, se sim, ordenar ele para ser o ultimo da fila
  // e remover ele do local que se encontra
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      tasksList.appendChild(li);
    }
  }); //

  // Input de texto e lebel que o acompanha para ser citado no checkbox e podermos fazer a verificação!
  const labelInput = document.createElement("label");
  labelInput.form = "checkbox"; //
  const input = document.createElement("input");
  input.id = "inputLi";
  input.type = "text";
  input.value = taskText;
  input.disabled = true;

  // Botão remover
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("removeBtn");
  removeBtn.textContent = "Remover";
  removeBtn.onclick = () => tasksList.removeChild(li);

  // Botão editar
  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.textContent = "Editar";

  editBtn.onclick = () => {
    editBtn.classList.toggle("ocultarBtn");
    salvarBtn.classList.toggle("ocultarBtn");
    input.disabled = false;
    input.focus();
  };

  // Botão de salvar
  const salvarBtn = document.createElement("button");
  salvarBtn.classList.add("ocultarBtn", "salvarBtn");
  salvarBtn.textContent = "Salvar";

  salvarBtn.onclick = () => {
    editBtn.classList.toggle("ocultarBtn");
    salvarBtn.classList.toggle("ocultarBtn");
    input.disabled = true;
  };

  const divInput = document.createElement("div");
  divInput.classList.add("div-input");
  const divButtons = document.createElement("div");
  divButtons.classList.add("div-button");

  divInput.append(checkbox, input);
  divButtons.append(salvarBtn, editBtn, removeBtn);

  li.append(divInput, divButtons);

  // li.append(checkbox, input, salvarBtn, editBtn, removeBtn)
  return ul.appendChild(li);
}
