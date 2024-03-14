// Variable para controlar si estamos actualizando una nota existente
let isUpdate = false;

// Selección de elementos del DOM
const addBox = document.querySelector(".add-box");
const popUpBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
const addBtn = popUpBox.querySelector("button");
const popupTitle = document.querySelector("header p");

// Array de nombres de meses
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Obtener notas almacenadas en el localStorage o crear un array vacío
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

// Event listener para mostrar la caja emergente al hacer clic en "Add new note"
addBox.addEventListener("click", function() {
    titleTag.focus();
    popUpBox.classList.add("show");
});

// Event listener para cerrar la caja emergente al hacer clic en el icono de cierre
closeIcon.addEventListener("click", () => {
    titleTag.value = "";
    descTag.value = "";
    popUpBox.classList.remove("show");
});

// Event listener para agregar una nueva nota
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let noteTitle = titleTag.value,
        noteDesc = descTag.value;
    if (noteTitle || noteDesc) {
        let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();
        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day} ${year}`
        };
        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[UpdateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

// Función para mostrar todas las notas almacenadas
function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `  <li class="note">
      <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
      </div>
      <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
                <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
            </ul>
        </div>
      </div>
     </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
};
showNotes();

// Función para mostrar el menú de opciones de una nota
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

// Función para eliminar una nota
function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this item?");
    if (!confirmDel) return;

    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

// Función para actualizar una nota existente
function updateNote(noteId, title, desc) {
    isUpdate = true;
    UpdateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}


document.querySelector('#search-input').addEventListener('input',filterList);

function filterList(){
    const searchInput = document.querySelector('#search-input');
    const filter = searchInput.value.toLowerCase();
    const listItems = document.querySelectorAll('.note');
    listItems.forEach((item)=>{
        let text = item.textContent;
        if(text.toLowerCase().includes(filter.toLowerCase())){
            item.style.display='';
        }
        else{
            item.style.display = 'none';
        }
    });
}


