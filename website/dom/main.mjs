import { LeftsideSection } from './left.mjs';
import { RightSidebarSection } from './right.mjs';
import { Navigation } from './nav.mjs';
import { MainContentSection } from './createpost.mjs';
import { ProfileToggleSection } from "./profiletoogler.mjs";


const mainContent = new MainContentSection();
// mainContent.createMainContent();

// Instantiate and create the right sidebar
const rightSidebar = new RightSidebarSection();

// Create an instance of the Navigation class
const navigation = new Navigation();

// Create an instance of the left-sidebar
const leftsection = new LeftsideSection()

// Instantiate and create the toogler
const profileToggle = new ProfileToggleSection();


