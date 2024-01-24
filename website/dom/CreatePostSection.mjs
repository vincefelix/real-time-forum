// export class CreatePostSection {
//     createPostSection() {
//         const createPost = document.createElement('div');
//         createPost.className = 'create-post';

//         const addPostContainer = document.createElement('div');
//         addPostContainer.className = 'add-post-container';

//         const postTitle = document.createElement('h2');
//         postTitle.textContent = 'Post';

//         const addPostForm = document.createElement('form');
//         addPostForm.id = 'addPostForm';

//         // Create textarea for post text
//         const postTextArea = document.createElement('textarea');
//         postTextArea.id = 'postText';
//         postTextArea.placeholder = 'Saisissez votre message';

//         // Create select for post categories
//         const postCategoriesSelect = document.createElement('select');
//         postCategoriesSelect.id = 'postCategories';
//         postCategoriesSelect.multiple = true;
//         postCategoriesSelect.className = 'collapsible-select';

//         // Add options to the select
//         const categories = ['Sport', 'Art', 'Cinéma', 'Musique', 'Informatique'];
//         categories.forEach(category => {
//             const option = document.createElement('option');
//             option.value = category.toLowerCase();
//             option.textContent = category;
//             postCategoriesSelect.appendChild(option);
//         });

//         // Create input for post image
//         const postImageInput = document.createElement('input');
//         postImageInput.type = 'file';
//         postImageInput.id = 'postImage';
//         postImageInput.placeholder = 'Parcourir';
//         postImageInput.accept = 'image/*';
//         postImageInput.addEventListener('change', previewImage);

//         // Create div for image preview
//         const imagePreviewDiv = document.createElement('div');
//         imagePreviewDiv.id = 'imagePreview';

//         // Create button for posting
//         const postButton = document.createElement('button');
//         postButton.type = 'button';
//         postButton.textContent = 'Post';
//         postButton.addEventListener('click', addPost);

//         // Create div for the validation post section
//         const validationPostDiv = document.createElement('div');
//         validationPostDiv.className = 'validation-post';

//         // Append elements to the form
//         addPostForm.appendChild(postTextArea);
//         addPostForm.appendChild(postCategoriesSelect);
//         addPostForm.appendChild(postImageInput);
//         addPostForm.appendChild(imagePreviewDiv);
//         validationPostDiv.appendChild(postButton);
//         addPostForm.appendChild(validationPostDiv);

//         // Append elements to the add post container
//         addPostContainer.appendChild(postTitle);
//         addPostContainer.appendChild(addPostForm);

//         // Append add post container to create post
//         createPost.appendChild(addPostContainer);

//         return createPost;
//     }
// }
