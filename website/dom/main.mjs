import { LeftsideSection } from './left.mjs';
import { RightSidebarSection } from './right.mjs';
import { Navigation } from './nav.mjs';
import { MainContentSection } from './createpost.mjs';
import { ProfileToggleSection } from "./profiletoogler.mjs";

const navigation = new Navigation();

const leftsection = new LeftsideSection()

const mainContent = new MainContentSection();

const rightSidebar = new RightSidebarSection();

const profileToggle = new ProfileToggleSection();
