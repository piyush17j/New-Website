# New Website - GitHub Enterprise Web Suite

A full-stack web application built with Next.js that integrates with GitHub Enterprise, providing a comprehensive suite for managing repositories, issues, pull requests, and more.

## Features

- **Repository Management**: List, create, and manage GitHub Enterprise repositories
- **Issue Tracking**: View and manage issues across repositories
- **Pull Request Management**: Review and merge pull requests
- **Authentication**: Secure integration with GitHub Enterprise API
- **Dashboard**: Overview of your GitHub Enterprise activity

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your GitHub Enterprise settings in the settings page
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with:

```
GITHUB_ENTERPRISE_URL=https://your-github-enterprise.com
GITHUB_TOKEN=your_personal_access_token
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Octokit (GitHub API client)
- Axios

## Deployment

This application can be deployed to Vercel, Netlify, or any platform supporting Next.js.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License