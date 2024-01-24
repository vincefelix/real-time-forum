// MainContentSection.mjs
import { CreatePostSection } from './CreatePostSection.mjs';
import { GeneratePostsSection } from './GeneratePostsSection.mjs';
import { CommentsSection } from './CommentsSection.mjs';

export class MainContentSection {
    constructor() {
        this.createMainContent();
    }

    createMainContent() {
        const mainContentSection = document.createElement('section');
        mainContentSection.className = 'main-content';

        // Create Create Post
        const createPostSection = new CreatePostSection();
        const createPost = createPostSection.createPostSection();

        // Create Feed
        const generatePostsSection = new GeneratePostsSection();
        const feed = document.createElement('div');
        feed.className = 'feed';
        generatePostsSection.generatePosts(feed, 2); // You can adjust the number of posts

        // Create Comments Section
        const commentsSection = new CommentsSection();
        const comments = commentsSection.createCommentsSection();

        // Append create post, feed, and comments to main-content section
        mainContentSection.appendChild(createPost);
        mainContentSection.appendChild(feed);
        mainContentSection.appendChild(comments);

        // Append main-content section to body
        document.body.appendChild(mainContentSection);
    }
}
