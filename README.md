# Macro Protocol Website

This is the official website for Macro Protocol, a cryptocurrency credit card platform.

## Development Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Local Development

To run this website locally:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   
3. Start the development server:
   ```
   npm run dev
   ```
   This will start a local development server with hot module replacement.

4. Build for production:
   ```
   npm run build
   ```
   
5. Preview the production build:
   ```
   npm run preview
   ```

## Project Structure

- `index.html` - Main webpage
- `styles.css` - CSS styles
- `script.js` - JavaScript functionality
- `documents/` - Whitepaper and other documents
- `vite.config.js` - Vite configuration
- `vercel.json` - Vercel deployment configuration

## Deployment Instructions

### Deploying to Vercel

1. Make sure you have the Vercel CLI installed:
   ```
   npm i -g vercel
   ```

2. Login to your Vercel account:
   ```
   vercel login
   ```

3. Deploy the project:
   ```
   vercel
   ```

4. For production deployment:
   ```
   vercel --prod
   ```

## Troubleshooting Deployment Issues

If you encounter 404 errors on Vercel:

1. Check that the build process completed successfully
2. Make sure your `vercel.json` file is properly configured
3. Verify that all references to assets use the correct paths
4. Check the build output in the `dist` directory
5. Deploy again with `vercel --prod`

## Contact

For questions or issues, please contact the development team. 