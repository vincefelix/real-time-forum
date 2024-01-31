export class Navigation {
    constructor() {
        this.createNavigation();
    }

    createNavigation() {
        // Create nav element
        const navElement = document.createElement('nav');

        // Create logo section
        const logoSection = document.createElement('div');
        logoSection.className = 'logo';

        // Logo image
        const logoImg = document.createElement('img');
        logoImg.className = 'logo-img';
        logoImg.src = '/static/./assets/realtime-logo.png';
        logoImg.alt = 'logo';

        // Logo text
        const logoText = document.createElement('h1');
        logoText.textContent = 'Forum';

        // Hamburger icon
        const tooglerLeftImg = document.createElement('img');
        tooglerLeftImg.className = 'tooglerleftimg';
        tooglerLeftImg.src = '/static/./assets/hamburger.png';
        tooglerLeftImg.alt = '';

        // Append elements to logo section
        logoSection.appendChild(logoImg);
        logoSection.appendChild(logoText);
        logoSection.appendChild(tooglerLeftImg);

        // Create others page section
        const othersPageSection = document.createElement('div');
        othersPageSection.className = 'others-page';

        // Create ul element
        const ulElement = document.createElement('ul');

        // Home tab
        const homeTab = document.createElement('li');
        homeTab.id = 'homeTab';
        homeTab.className = 'active';
        homeTab.style.marginRight = '20px';

        const homeLink = document.createElement('a');
        homeLink.href = '#';
        homeLink.textContent = 'Home';

        // Profile tab
        const profileTab = document.createElement('li');
        profileTab.id = 'profileTab';

        const profileLink = document.createElement('a');
        profileLink.href = '#';
        profileLink.textContent = 'Profil';

        // Append links to li elements
        homeTab.appendChild(homeLink);
        profileTab.appendChild(profileLink);

        // Append li elements to ul element
        ulElement.appendChild(homeTab);
        ulElement.appendChild(profileTab);

        // Append ul element to others page section
        othersPageSection.appendChild(ulElement);

        // Create user nav section
        const userNavSection = document.createElement('div');
        userNavSection.className = 'user-nav';

        // User nav info section
        const userNavInfoSection = document.createElement('div');
        userNavInfoSection.className = 'user-nav-info';

        // Presence status
        const presenceStatus = document.createElement('span');
        presenceStatus.className = 'presence-status';

        // User nav image
        const userNavImg = document.createElement('span');
        userNavImg.className = 'user_nav-img';

        const optionsMenuImg = document.createElement('img');
        optionsMenuImg.className = 'options-menu-img';
        optionsMenuImg.src = '/static/./assets/profil-img.png';
        optionsMenuImg.alt = '';

        // User name
        const userName = document.createElement('span');
        userName.className = 'username';
        userName.textContent = 'Masseck';

        // Append elements to user nav info section
        userNavInfoSection.appendChild(presenceStatus);
        userNavInfoSection.appendChild(userNavImg);
        userNavImg.appendChild(optionsMenuImg);
        userNavInfoSection.appendChild(userName);

        // Append user nav info section to user nav section
        userNavSection.appendChild(userNavInfoSection);

        // Append sections to nav element
        navElement.appendChild(logoSection);
        navElement.appendChild(othersPageSection);
        navElement.appendChild(userNavSection);

        // Append nav element to the body
        document.body.appendChild(navElement);
    }
}

