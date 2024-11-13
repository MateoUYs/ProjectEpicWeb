import sessionDAO from '../../../dao/sessionDAO.js';

window.onload = async () => {
    let query = await new sessionDAO().getSession();
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let userBtn = document.querySelector("#userBtn");
    let logOutBtn = document.querySelector("#logOutBtn");

    addEvents();
};

function addEvents() {
    let userModal = document.querySelector("#userModal");
}

userBtn.onclick = () => {
    if (userModal.classList.contains("modalDisable")) {
        userModal.classList.add("modalEnable");
        userModal.classList.remove("modalDisable");
    } else {
        userModal.classList.remove("modalEnable");
        userModal.classList.add("modalDisable");
    }
}