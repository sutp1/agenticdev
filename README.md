# Excel Nano Agent - AI-Powered Excel Web Add-in

An intelligent Excel Web Add-in that uses natural language processing to automate Excel tasks. Built with React, TypeScript, and Office.js.

## Features

- 🤖 **AI-Powered Chat Interface**: Natural language commands translated into Excel actions
- 📊 **Cell Formatting**: Bold, italic, underline, colors, and number formats
- 🧮 **Formula Generation**: Automatic creation of SUM, AVERAGE, COUNT formulas
- 📈 **Chart Creation**: Generate bar, line, pie, and column charts from data
- 🧹 **Data Cleaning**: Remove duplicates, trim whitespace, sort, and filter data
- 🎨 **Fluent UI Design**: Modern interface matching Excel's native design

## Tech Stack

- **TypeScript** - Type-safe development
- **React** - Component-based UI
- **Office.js** - Excel API integration
- **Webpack** - Module bundling
- **Fluent UI** - Microsoft design system

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Excel Desktop or Excel Online
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sutp1/agenticdev.git
cd agenticdev
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The add-in will be available at `https://localhost:3000`

### Sideloading the Add-in

#### Excel Desktop (Windows/Mac)

1. Start the dev server: `npm start`
2. Open Excel
3. Go to **Insert** > **Add-ins** > **My Add-ins**
4. Click **Upload My Add-in**
5. Select the `manifest.xml` file from the project root
6. Click **Upload**
7. The Nano Agent button will appear in the Home tab

#### Excel Online

1. Start the dev server: `npm start`
2. Open Excel Online
3. Go to **Insert** > **Add-ins** > **Upload My Add-in**
4. Select the `manifest.xml` file
5. Click **Upload**

## Usage Examples

Once the add-in is loaded, you can use natural language commands like:

- "Bold the selected cells"
- "Format as currency"
- "Create a sum formula for column A"
- "Generate a bar chart from the selection"
- "Remove duplicate rows"
- "Sort data in ascending order"
- "Apply filter to the selection"

## Project Structure

```
excel-nano-agent/
├── manifest.xml              # Office Add-in manifest
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── webpack.config.js        # Webpack bundler config
├── src/
│   ├── taskpane/
│   │   ├── taskpane.html    # HTML template
│   │   ├── taskpane.tsx     # Entry point
│   │   ├── taskpane.css     # Styles
│   │   └── components/
│   │       └── App.tsx      # Main React component
│   └── services/
│       ├── aiService.ts     # Natural language processing
│       └── excelService.ts  # Excel automation functions
└── dist/                    # Build output (generated)
```

## Development

### Build for Production

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

## API Integration

The current implementation uses pattern matching for natural language processing. To integrate with an actual LLM (like GPT-4):

1. Add your API key to environment variables
2. Uncomment the production implementation in `src/services/aiService.ts`
3. Configure the API endpoint and model

Example:
```typescript
const apiKey = process.env.OPENAI_API_KEY;
const endpoint = 'https://api.openai.com/v1/chat/completions';
```

## Security Notes

- Never commit API keys to the repository
- Use environment variables for sensitive data
- The manifest should use HTTPS in production
- Implement proper authentication for production deployments

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.
