export class LeftsideSection {
    constructor() {
        this.createLeftside();
    }

    createLeftside() {
        const leftsideSection = document.createElement('section');
        leftsideSection.className = 'leftside';

        const leftSidebar = document.createElement('div');
        leftSidebar.className = 'left-sidebar';

        const ulElement = document.createElement('ul');

        // Create Categories
        const categoriesItem = document.createElement('li');
        const categoriesLink = document.createElement('a');
        categoriesLink.href = '';
        categoriesLink.textContent = 'Categories';

        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';

        const categoriesList = ['Sport', 'Art', 'Cinema', 'Music', 'Computer Science'];

        categoriesList.forEach(category => {
            const categoryLink = document.createElement('a');
            categoryLink.href = '#';
            categoryLink.textContent = category;
            dropdownContent.appendChild(categoryLink);
        });

        categoriesItem.appendChild(categoriesLink);
        categoriesItem.appendChild(dropdownContent);

        // Create Post
        const postItem = document.createElement('li');
        const postLink = document.createElement('a');
        postLink.href = '';
        postLink.textContent = 'Post';

        postItem.appendChild(postLink);

        // Create Comment
        const commentItem = document.createElement('li');
        const commentLink = document.createElement('a');
        commentLink.href = '';
        commentLink.textContent = 'Comment';

        commentItem.appendChild(commentLink);

        // Append items to ul
        ulElement.appendChild(categoriesItem);
        ulElement.appendChild(postItem);
        ulElement.appendChild(commentItem);

        // Append ul to left-sidebar
        leftSidebar.appendChild(ulElement);

        // Append left-sidebar to leftside section
        leftsideSection.appendChild(leftSidebar);

        // Append leftside section to body
        document.body.appendChild(leftsideSection);
    }
}

