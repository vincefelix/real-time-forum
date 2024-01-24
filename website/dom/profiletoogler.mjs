export class ProfileToggleSection {
    constructor() {
        this.createProfileToggle();
    }

    createProfileToggle() {
        const profileToggleSection = document.createElement('div');
        profileToggleSection.className = 'profile-toogle';

        const toggleAllElement = document.createElement('div');
        toggleAllElement.className = 'toogle-allelement';

        // Create Disconnection Button
        const disconnectionButton = this.createButton('Logout', './assets/logout.png');

        // Create Dark Mode Button
        const darkModeButton = this.createButton('Display', './assets/logout.png');

        // Append buttons to toggleAllElement
        toggleAllElement.appendChild(disconnectionButton);
        toggleAllElement.appendChild(darkModeButton);

        // Append toggleAllElement to profileToggleSection
        profileToggleSection.appendChild(toggleAllElement);

        // Append profileToggleSection to body
        document.body.appendChild(profileToggleSection);
    }

    createButton(text, imagePath) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'disconnection-button';

        const button = document.createElement('button');

        const image = document.createElement('img');
        image.src = imagePath;
        image.alt = '';

        const span = document.createElement('span');
        span.textContent = text;

        button.appendChild(image);
        button.appendChild(span);
        buttonContainer.appendChild(button);

        return buttonContainer;
    }
}

// Example usage
const profileToggle = new ProfileToggleSection();
