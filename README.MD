# Project Name
Code-Editor-Backend

## Description
Its the backend of the code-editor
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

Instructions on how to set up and install the project.

### Prerequisites

- Node js (20 or higher)
- Docker

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/yourproject.git
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Install node-pty:
    npm i node-pty (Linux based system)
    
    For windows
    Follow docs -  https://www.npmjs.com/package/node-pty

## Usage

### set enviroment variables

copy .env.exmaple to .env file 
add valid access tokens.

### Starting the Server

1. Start the server:
    ```sh
    npm run build
    ```
2. Open your browser and navigate to `http://localhost:3001`

Example `.env` file:

```plaintext
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
AWS_S3_BUCKET_NAME=your-s3-bucket-name.
