# mjml-email-templates

Node.js application that uses the MJML framework to develop responsive component-based emails. The application utilizes the Gulp build system to automate the development workflow.

## Installation

**Note**: Ensure you have Node.js installed on your system before proceeding.

1. Clone this repository to your local machine.
   `git clone https://github.com/AmjedAgabani/mjml-email-templates.git`
2. Navigate to the project directory
   `cd mjml-email-templates`
3. Install the required dependencies
   `npm install`

## Usage

The following `npm` scripts are available for use:

| Script      | Description                                                                                                                                                                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build`     | Builds the project. This will create a `build` directory in the project root, which may contain any number of subdirectories depending on your project structure. Open the compiled email template by navigating to the appropriate file path within the `build` directory.              |
| `build:dev` | Builds the project for local development. This will also create a `build` directory, but image URLs will use `http://localhost:3000/img`, making it easy to preview images on your local server. Navigate to the correct path within the `build` directory to access the email template. |
| `clean`     | Deletes the `build` directory and everything inside it.                                                                                                                                                                                                                                  |
| `serve`     | Uses the serve package to create a simple HTTP server. Serves the contents of the `build` directory, allowing you to preview the output of your project in the browser.                                                                                                                  |
| `watch`     | Watches for changes to the project files and automatically rebuilds the project. Will also launch a browser window displaying an index of the `build` directory, making it easy to navigate through the various email templates.                                                         |



To run a script, open your terminal and enter `npm run <script>`.
