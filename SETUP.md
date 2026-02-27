# Setup Guide for Excel Nano Agent

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Microsoft Excel** (Desktop or Online)
- **Git** (for cloning the repository): [Download Git](https://git-scm.com/)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/sutp1/agenticdev.git
cd agenticdev
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- Fluent UI components
- TypeScript
- Webpack and related tools
- Office.js types

### 3. Start Development Server

```bash
npm start
```

This will:
- Start a local development server on `https://localhost:3000`
- Enable hot reloading for development
- Serve the add-in files with HTTPS (required by Office)

**Note**: You may see a browser warning about the SSL certificate being self-signed. This is expected for local development. Click "Advanced" and proceed to accept the certificate.

## Sideloading the Add-in

### Option 1: Excel Desktop (Windows)

1. Make sure the dev server is running (`npm start`)
2. Open Excel and create a new workbook
3. Navigate to **Insert** > **Get Add-ins**
4. Click on **My Add-ins** tab at the top
5. In the "Shared Folder" section (or "Upload My Add-in" option):
   - Click **Upload My Add-in**
   - Browse and select the `manifest.xml` file from your project directory
   - Click **Upload**
6. The Nano Agent button will appear in the Home ribbon
7. Click the button to open the task pane

### Option 2: Excel Desktop (Mac)

1. Make sure the dev server is running (`npm start`)
2. Open Excel and create a new workbook
3. Navigate to **Insert** > **Add-ins** > **My Add-ins**
4. Click **Add** in the Custom Add-ins section
5. Select **From URL** and enter: `https://localhost:3000/manifest.xml`
6. Click **OK**
7. The Nano Agent button will appear in the Home ribbon

### Option 3: Excel Online

1. Make sure the dev server is running (`npm start`)
2. Go to [Excel Online](https://office.com/launch/excel)
3. Create a new blank workbook
4. Click **Insert** > **Add-ins**
5. Click **Upload My Add-in** (top right)
6. Browse and select the `manifest.xml` file
7. Click **Upload**
8. The Nano Agent button will appear in the Home ribbon

## Troubleshooting

### "This add-in is no longer available"

This error occurs when the dev server is not running. Make sure you run `npm start` before loading the add-in.

### SSL Certificate Warnings

For local development, you'll need to accept the self-signed certificate:
1. Navigate to `https://localhost:3000` in your browser
2. Click "Advanced" and proceed despite the warning
3. Then try loading the add-in in Excel

### Port Already in Use

If port 3000 is already in use, you can change it in `webpack.config.js`:
```javascript
devServer: {
  port: 3001,  // Change to any available port
  // ...
}
```

Remember to update the manifest.xml URLs if you change the port.

### Add-in Not Appearing

1. Clear Excel's cache:
   - Windows: `%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\`
   - Mac: `~/Library/Containers/com.microsoft.Excel/Data/Library/Caches/`
2. Restart Excel
3. Try sideloading again

## Development Workflow

### Making Changes

1. Edit files in the `src/` directory
2. The dev server will automatically reload
3. Refresh the task pane in Excel to see changes
   - Right-click in the task pane
   - Select **Reload**

### Testing Features

The add-in supports these natural language commands:

#### Formatting
- "Bold the selected cells"
- "Make text italic"
- "Format as currency"
- "Format as percentage"
- "Change background color to yellow"

#### Formulas
- "Create a sum formula for column A"
- "Calculate average of selected cells"
- "Count values in the selection"

#### Charts
- "Generate a bar chart from selection"
- "Create a line chart"
- "Make a pie chart"
- "Create a column chart"

#### Data Cleaning
- "Remove duplicate rows"
- "Trim whitespace"
- "Sort data in ascending order"
- "Apply filter to selection"

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## Next Steps

- Customize the UI in `src/taskpane/taskpane.css`
- Add more Excel actions in `src/services/excelService.ts`
- Improve natural language processing in `src/services/aiService.ts`
- Integrate with a real LLM API (GPT-4, Claude, etc.)

## Support

For issues or questions:
- Open an issue on GitHub
- Check the [Office Add-ins documentation](https://docs.microsoft.com/office/dev/add-ins/)
- Review the [Office.js API reference](https://docs.microsoft.com/javascript/api/excel)
