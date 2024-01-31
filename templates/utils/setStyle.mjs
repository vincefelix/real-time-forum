export const setFormStyle = (formType) => {
  // sets style according to player's choice
  const header = document.head;
  let link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", `/static/./stylesheets/formStyles/${formType}.css`);
  header.removeChild(header.children[header.children.length - 3]);
  header.insertBefore(link, header.children[header.children.length - 2]);
};
