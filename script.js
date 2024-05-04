const addNote = document.querySelector(".add-note");
const closeBtn = document.querySelector(".close");
const popupBox = document.querySelector(".popup-box")
const popupHeader = document.querySelector("header p")
const titleTag = document.querySelector(".title input");
const desTag = document.querySelector(".description textarea");
const add = document.querySelector("form .add-btn");
const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, UpdateId;

addNote.addEventListener("click",() => {
    popupBox.classList.add("show");
    add.innerText = "Add Note"
    popupHeader.innerHTML = "Add a new Notes"
})
closeBtn.addEventListener("click",()=>{
    popupBox.classList.remove("show");
    titleTag.value = "";
    desTag.value = "";

})


function showNotes(){
    document.querySelectorAll(".note").forEach(note=> note.remove())
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `  <div  class="note">
        <div class="details">
            <h3>${note.title}</h3>
            <p>
                ${filterDesc}
            </p>
        </div>
        <div class="bottom-content">
            <h4>${note.date}</h4>
            <div class="setting">
                <i onClick="showMenu(this)" class="ri-tools-line"></i>
                <ul class="menu">
                    <li  onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="ri-quill-pen-fill"></i> Edit</li>
                    <li onClick = "deleteNote(${id})"><i class="ri-delete-bin-line"></i> Delete</li>
                </ul>
            </div>
        </div>
    </div>`
    addNote.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();
function showMenu(element){
    element.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != element) {
            element.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId){
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, filterDesc){
    UpdateId = noteId;
    isUpdate = true;
    let description = filterDesc.replaceAll('</br>', '<\r\n>');
    add.innerText = "Update Note"
    popupHeader.innerHTML = "Update a Note"
    titleTag.value = title;
    desTag.value=description;
    addNote.click();
}

function addNotes() {
    let noteTitle = titleTag.value.trim();
    let noteDescription = desTag.value.trim();

    if(noteTitle || noteDescription){
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let noteObj = {
            title: noteTitle, description: noteDescription,
            date:`${month} ${day} ${year}`
        }
        if(!isUpdate){
            notes.push(noteObj);
        }
        else{
            isUpdate = false;
            notes[UpdateId] = noteObj
        }
    
        localStorage.setItem("notes", JSON.stringify(notes))
        closeBtn.click();
        showNotes();
    }
  
}

add.addEventListener("click", (e) => {
    e.preventDefault()
    addNotes()
})