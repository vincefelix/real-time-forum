export const setFormStyle = (formType) => {
  // sets style according to player's choice
  const header = document.head;
  let link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", `/static/./stylesheets/formStyles/${formType}.css`);
  header.removeChild(header.children[header.children.length - 3]);
  header.insertBefore(link, header.children[header.children.length - 2]);
};

export const setHomeStyle = () => {
  // sets style according to player's choice
  const header = document.head;
  let link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", `/static/stylesheets/homeStyles/home.css`);
  header.insertAdjacentElement("afterbegin", link);
};

export const removeHomeStyle = () => {
  const header = document.head;
  let link = "";
  for (const i of header.children) {
    //console.log("link", i.href);
    if (typeof i.href == "string")
      link = i.href.split("/stylesheets/")[1] == "homeStyles/home.css" ? i : "";
  }
  if (link != "") header.removeChild(link);
};
