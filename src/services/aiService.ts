/**
 * AI Service for processing natural language commands
 * This service translates user input into structured Excel actions
 */

export interface ExcelAction {
  type: 'format' | 'formula' | 'chart' | 'data-cleaning' | 'unknown';
  parameters: {
    [key: string]: any;
  };
  description: string;
}

/**
 * Process natural language input and determine the Excel action to perform
 * In a production environment, this would call an LLM API (like GPT-4)
 * For now, we'll use pattern matching and keyword detection
 */
export async function processNaturalLanguage(input: string): Promise<ExcelAction> {
  const lowerInput = input.toLowerCase();

  // Format actions
  if (containsKeywords(lowerInput, ['bold', 'italic', 'underline', 'font', 'color', 'background'])) {
    return parseFormatAction(lowerInput);
  }
  
  if (containsKeywords(lowerInput, ['currency', 'percentage', 'number format', 'decimal'])) {
    return parseNumberFormatAction(lowerInput);
  }

  // Formula actions
  if (containsKeywords(lowerInput, ['sum', 'average', 'count', 'formula', 'calculate'])) {
    return parseFormulaAction(lowerInput);
  }

  // Chart actions
  if (containsKeywords(lowerInput, ['chart', 'graph', 'bar', 'line', 'pie', 'column', 'visualization'])) {
    return parseChartAction(lowerInput);
  }

  // Data cleaning actions
  if (containsKeywords(lowerInput, ['clean', 'remove', 'duplicate', 'trim', 'sort', 'filter'])) {
    return parseDataCleaningAction(lowerInput);
  }

  // Default response for unrecognized commands
  return {
    type: 'unknown',
    parameters: {},
    description: 'I\'m not sure how to help with that. Try asking me to format cells, create formulas, generate charts, or clean data.'
  };
}

function containsKeywords(text: string, keywords: string[]): boolean {
  return keywords.some(keyword => text.includes(keyword));
}

function parseFormatAction(input: string): ExcelAction {
  const action: ExcelAction = {
    type: 'format',
    parameters: {},
    description: 'Formatting cells'
  };

  if (input.includes('bold')) {
    action.parameters.bold = true;
  }
  if (input.includes('italic')) {
    action.parameters.italic = true;
  }
  if (input.includes('underline')) {
    action.parameters.underline = true;
  }
  
  // Color detection
  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black', 'white'];
  colors.forEach(color => {
    if (input.includes(color)) {
      if (input.includes('background') || input.includes('fill')) {
        action.parameters.fillColor = color;
      } else {
        action.parameters.fontColor = color;
      }
    }
  });

  return action;
}

function parseNumberFormatAction(input: string): ExcelAction {
  const action: ExcelAction = {
    type: 'format',
    parameters: {},
    description: 'Formatting numbers'
  };

  if (input.includes('currency') || input.includes('dollar')) {
    action.parameters.numberFormat = 'currency';
  } else if (input.includes('percentage') || input.includes('percent')) {
    action.parameters.numberFormat = 'percentage';
  } else if (input.includes('decimal')) {
    const decimalMatch = input.match(/(\d+)\s*decimal/);
    const decimals = decimalMatch ? parseInt(decimalMatch[1]) : 2;
    action.parameters.numberFormat = 'decimal';
    action.parameters.decimals = decimals;
  }

  return action;
}

function parseFormulaAction(input: string): ExcelAction {
  const action: ExcelAction = {
    type: 'formula',
    parameters: {},
    description: 'Creating formula'
  };

  if (input.includes('sum')) {
    action.parameters.formulaType = 'SUM';
    action.description = 'Creating SUM formula';
  } else if (input.includes('average')) {
    action.parameters.formulaType = 'AVERAGE';
    action.description = 'Creating AVERAGE formula';
  } else if (input.includes('count')) {
    action.parameters.formulaType = 'COUNT';
    action.description = 'Creating COUNT formula';
  }

  // Extract column reference if mentioned
  const columnMatch = input.match(/column\s+([a-z])/i);
  if (columnMatch) {
    action.parameters.column = columnMatch[1].toUpperCase();
  }

  return action;
}

function parseChartAction(input: string): ExcelAction {
  const action: ExcelAction = {
    type: 'chart',
    parameters: {
      chartType: 'ColumnClustered' // Default chart type
    },
    description: 'Creating chart'
  };

  if (input.includes('bar')) {
    action.parameters.chartType = 'BarClustered';
  } else if (input.includes('line')) {
    action.parameters.chartType = 'Line';
  } else if (input.includes('pie')) {
    action.parameters.chartType = 'Pie';
  } else if (input.includes('column')) {
    action.parameters.chartType = 'ColumnClustered';
  }

  return action;
}

function parseDataCleaningAction(input: string): ExcelAction {
  const action: ExcelAction = {
    type: 'data-cleaning',
    parameters: {},
    description: 'Cleaning data'
  };

  if (input.includes('duplicate')) {
    action.parameters.action = 'removeDuplicates';
    action.description = 'Removing duplicate rows';
  } else if (input.includes('trim')) {
    action.parameters.action = 'trim';
    action.description = 'Trimming whitespace';
  } else if (input.includes('sort')) {
    action.parameters.action = 'sort';
    action.parameters.ascending = !input.includes('descending');
    action.description = 'Sorting data';
  } else if (input.includes('filter')) {
    action.parameters.action = 'filter';
    action.description = 'Applying filter';
  }

  return action;
}

/**
 * In a production environment, this would call an actual LLM API
 * Example implementation with GPT-4:
 */
export async function callLLMAPI(userInput: string): Promise<ExcelAction> {
  // This is a placeholder for actual API integration
  // In production, you would:
  // 1. Configure API key via environment variables
  // 2. Call OpenAI API with structured prompt
  // 3. Parse the response
  // 4. Return structured action
  
  // API key should be stored in environment variables, not hardcoded
  const apiKey = process.env.OPENAI_API_KEY || '';
  const endpoint = 'https://api.openai.com/v1/chat/completions';
  
  // For now, fall back to pattern matching
  return processNaturalLanguage(userInput);
  
  /* Production implementation example:
  if (!apiKey) {
    console.warn('OpenAI API key not configured, using pattern matching');
    return processNaturalLanguage(userInput);
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an Excel automation assistant. Convert user requests into structured Excel actions.'
        },
        {
          role: 'user',
          content: userInput
        }
      ],
      temperature: 0.7
    })
  });
  
  const data = await response.json();
  return parseGPTResponse(data);
  */
}
