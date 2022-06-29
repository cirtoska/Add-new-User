// var users = [
//   {
//     avatar: "./images/avatar-01.png",
//     firstName: "Jane",
//     lastName: "Doe",
//     eMail: "JaneDoe@yahoo.com",
//   },
//   {
//     avatar: "./images/avatar-02.png",
//     firstName: "Marge",
//     lastName: "Simpson",
//     eMail: "m_simpson@yahoo.com",
//   },
//   {
//     avatar: "./images/avatar-03.png",
//     firstName: "George",
//     lastName: "Smith",
//     eMail: "smithG@yahoo.com",
//   },
//   {
//     avatar: "./images/avatar-04.png",
//     firstName: "Mario",
//     lastName: "Larson",
//     eMail: "ml89@gmail.com",
//   },
//   {
//     avatar: "./images/avatar-05.png",
//     firstName: "Samatha",
//     lastName: "Fox",
//     eMail: "samanthaF@yahoo.com",
//   },
//   {
//     avatar: "./images/avatar-06.png",
//     firstName: "John",
//     lastName: "Doe",
//     eMail: "JohnDoe@gmail.com",
//   },
// ];

// User Class
class User {
  constructor(avatar, firstName, lastName, eMail) {
    this.avatar = avatar;
    this.firstName = firstName;
    this.lastName = lastName;
    this.eMail = eMail;
  }
}

// UI class
class UI {
  static displayUsers() {
    const users = BrowserStorage.getUser();

    users.forEach((user) => UI.addUserToList(user));
  }
  static addUserToList(user) {
    const list = document.querySelector("#user-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.avatar}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.eMail}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
      `;

    list.appendChild(row);
  }

  static deleteUser(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }

    // Deleting a user
    UI.showNotification("User deleted!", "success");
  }

  static showNotification(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#user-form");
    container.insertBefore(div, form);

    // remove notification afer few seconds
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearFields() {
    document.querySelector("#avatar").value = "";
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#eMail").value = "";
  }
}

// Store class
class BrowserStorage {
  static getUser() {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
  }

  static addUser(user) {
    const users = BrowserStorage.getUser();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  static removeUser(id) {
    const users = BrowserStorage.getUser();

    users.forEach((user, index) => {
      if (user.id === id) {
        users.splice(index, 1);
      }
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
}

// Event to display user
document.addEventListener("DOMContentLoaded", UI.displayUsers);

// Event to add a user
document.querySelector("#user-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const avatar = document.querySelector("#avatar").value;
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const eMail = document.querySelector("#eMail").value;

  // Validation
  if (avatar === "" || firstName === "" || lastName === "" || eMail === "") {
    UI.showNotification("All the fields are required!", "danger");
    // alert("All the fields are required!");
  } else {
    // Instantiate user
    const user = new User(avatar, firstName, lastName, eMail);

    // Add user to table
    UI.addUserToList(user);

    // Add user to the browser storage
    BrowserStorage.addUser(user);

    //Confirmation
    UI.showNotification("User added!", "success");

    // Clear Fields
    UI.clearFields();
  }
});

// Event to remove user
document.querySelector("#user-list").addEventListener("click", (e) => {
  UI.deleteUser(e.target);
  // console.log(e.target);

  //
  BrowserStorage.removeUser(e.target.parentElement.any);
});
