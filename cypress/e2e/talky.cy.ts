describe('Talky Application E2E Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure a clean state
    cy.clearLocalStorage();
  });

  it('should allow a user to register', () => {
    cy.fixture('user').then((userData) => {
      const timestamp = Date.now();
      const uniqueEmail = `testuser+${timestamp}@example.com`;
      const { newUser } = userData;

      // Visit the signup page
      cy.visit('/signup');
      
      // Check if the signup form is visible
      cy.contains('Sign up new account').should('be.visible');
      
      // Fill out the registration form
      cy.get('input[name="name"]').type(newUser.name);
      cy.get('input[name="email"]').type(uniqueEmail);
      cy.get('input[name="password"]').first().type(newUser.password);
      cy.get('input[name="password"]').last().type(newUser.password);
      
      // Submit the form
      cy.intercept('POST', '/api/register').as('registerRequest');
      cy.get('button[type="submit"]').click();
      
      // Wait for the registration request to complete
      cy.wait('@registerRequest').its('response.statusCode').should('eq', 201);
      
      // Verify redirection to login page
      cy.url().should('include', '/login');
    });
  });

  it('should allow a user to login', () => {
    cy.fixture('user').then((userData) => {
      const { validUser } = userData;
      
      // Visit the login page
      cy.visit('/login');
      
      // Check if the login form is visible
      cy.contains('Sign in to your account').should('be.visible');
      
      // Fill out the login form
      cy.get('input[name="email"]').type(validUser.email);
      cy.get('input[name="password"]').type(validUser.password);
      
      // Submit the form
      cy.intercept('POST', '/api/login').as('loginRequest');
      cy.get('button[type="submit"]').click();
      
      // Wait for the login request to complete
      cy.wait('@loginRequest').its('response.statusCode').should('eq', 201);
      
      // Verify redirection to home page
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      
      // Verify localStorage has token
      cy.window().its('localStorage.accessToken').should('exist');
    });
  });

  it('should display posts on the home page', () => {
    cy.fixture('user').then((userData) => {
      const { validUser } = userData;
      cy.login(validUser.email, validUser.password);
      
      // Visit the home page
      cy.visit('/');
      
      // Intercept the API call to fetch blogs
      cy.intercept('GET', '**/api/post').as('fetchBlogs');
      
      // Wait for the blogs to load
      cy.wait('@fetchBlogs');
      
      // Check if posts are displayed
      cy.get('div.bg-white.rounded-xl').should('exist');
    });
  });

  it('should allow a user to create a new post', () => {
    cy.fixture('user').then((userData) => {
      const { validUser } = userData;
      cy.login(validUser.email, validUser.password);
      
      // Visit the home page
      cy.intercept('POST', '/api/login').as('loginRequest');
      
      // Wait for the login request to complete
      
      // Verify redirection to home page
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      
      // Click the create post button
      cy.get('button.fixed.bottom-6.right-6').should('be.visible').click();
      
      // Check if the create post modal is visible
      cy.contains('Create New Post').should('be.visible');
      
      // Upload an image
      cy.fixture('test-image.jpg', 'base64').then((fileContent) => {
        cy.get('input[id="profileImage"]').attachFile({
          fileContent,
          fileName: 'test-image.jpg',
          mimeType: 'image/jpeg'
        });
      });
      
      // Add content to the post
      const postContent = 'This is a test post created by Cypress';
      cy.get('textarea').type(postContent);
      
      // Submit the post
      cy.intercept('POST', '**/api/post/add').as('createPost');
      cy.contains('button', 'Post').click();
      
      // Wait for the post creation to complete
      cy.wait('@createPost').its('response.statusCode').should('eq', 201);
      
      // Verify the new post appears in the feed
      cy.contains(postContent).should('be.visible');
    });
    
    
  });
  it('should allow a user to add a comment on a post', () => {
    cy.fixture('user').then((userData) => {
      const { validUser } = userData;
      cy.login(validUser.email, validUser.password);

      cy.intercept('POST', '/api/login').as('loginRequest');
      
      // Wait for the login request to complete
      
      // Verify redirection to home page
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      
      // Click the create post button
      
      // Visit the home page
      
      // Ensure posts are loaded
      cy.get('div.bg-white.rounded-xl').first().should('be.visible');
      
      // Click on the comment button (if it's hidden)
      cy.contains('Show comments').click({ force: true });
  
      // Type a new comment
      const commentText = 'This is a Cypress test comment';
      cy.get('input[placeholder="Add a comment..."]').type(commentText);
  
      // Submit the comment
      cy.get('button.bg-blue-600').click();
  
      // Verify the comment appears in the comments section
      cy.contains(commentText).should('be.visible');
    });
  });
});
