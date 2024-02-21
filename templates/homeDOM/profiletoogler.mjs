import { socket } from "../socket/initForum.mjs";

export class ProfileToggleSection {
  constructor() {}

  init() {
    this.createProfileToggle();
    setTimeout(() => {
      // this.hamToggle();
      this.profilHover();
    }, 1000);
  }
  createProfileToggle() {
    const profileToggleSection = document.createElement("div");
    profileToggleSection.className = "profile-toogle";

    const toggleAllElement = document.createElement("div");
    toggleAllElement.className = "toogle-allelement";

    // Create Disconnection Button
    const disconnectionButton = this.createButton(
      "Logout",
      "/static/./assets/logout.png"
    );


    // Append buttons to toggleAllElement
    toggleAllElement.appendChild(disconnectionButton);
  
    // Append toggleAllElement to profileToggleSection
    profileToggleSection.appendChild(toggleAllElement);

    // Append profileToggleSection to body
    document.body.appendChild(profileToggleSection);
  }

  createButton(text, imagePath) {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "disconnection-button";

    const button = document.createElement("button");
    button.className = "logout-button";

    button.addEventListener("click", function () {
        socket.mysocket.send(
          JSON.stringify({
            type: "disconnect",
            payload: { data: document.cookie.split("=")[1] },
          })
        );
      console.log("delogué");
    });

    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = "";

    const span = document.createElement("span");
    span.textContent = text;

    button.appendChild(image);
    button.appendChild(span);
    buttonContainer.appendChild(button);

    return buttonContainer;
  }

  // hamToggle() {
  //   var userNavImg = document.querySelector(".tooglerleftimg");
  //   var leftSidebar = document.querySelector(".leftside");
  //   var mainspace = document.querySelector(".main-content");
  //   var sidebarVisible = true;

  //   userNavImg.addEventListener("click", function () {
  //     if (sidebarVisible) {
  //       leftSidebar.style.display = "block";
  //       mainspace.style.cssText = "width: 52%; left: 21%";
  //     } else {
  //       leftSidebar.style.display = "none";
  //       mainspace.style.cssText = "width: 75%; left: 0";
  //     }
  //     sidebarVisible = !sidebarVisible;
  //   });
  // }
  profilHover() {
    var profilemenutoogler = document.querySelector(".options-menu-img");
    var menutotoogle = document.querySelector(".profile-toogle");

    profilemenutoogler.addEventListener("mouseenter", function () {
      menutotoogle.style.display = "block";
    });

    profilemenutoogler.addEventListener("mouseleave", function () {
      setTimeout(function () {
        if (!menutotoogle.matches(":hover")) {
          menutotoogle.style.display = "none";
        }
      }, 100);
    });

    menutotoogle.addEventListener("mouseleave", function () {
      menutotoogle.style.display = "none";
    });
  }
}
