/**
 * Excel Service for executing Excel actions using Office.js
 * This service contains all the Excel automation logic
 */

import { ExcelAction } from './aiService';

export interface ExcelActionResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Main function to execute Excel actions based on AI-processed commands
 */
export async function executeExcelAction(action: ExcelAction): Promise<ExcelActionResult> {
  try {
    switch (action.type) {
      case 'format':
        return await executeFormatAction(action);
      case 'formula':
        return await executeFormulaAction(action);
      case 'chart':
        return await executeChartAction(action);
      case 'data-cleaning':
        return await executeDataCleaningAction(action);
      case 'unknown':
        return {
          success: false,
          message: action.description
        };
      default:
        return {
          success: false,
          message: 'Unknown action type'
        };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to execute action',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Execute formatting actions on selected cells
 */
async function executeFormatAction(action: ExcelAction): Promise<ExcelActionResult> {
  return Excel.run(async (context) => {
    const range = context.workbook.getSelectedRange();
    range.load('address');

    // Apply text formatting
    if (action.parameters.bold !== undefined) {
      range.format.font.bold = action.parameters.bold;
    }
    if (action.parameters.italic !== undefined) {
      range.format.font.italic = action.parameters.italic;
    }
    if (action.parameters.underline !== undefined) {
      range.format.font.underline = action.parameters.underline ? 'Single' : 'None';
    }

    // Apply colors
    if (action.parameters.fontColor) {
      range.format.font.color = getColorCode(action.parameters.fontColor);
    }
    if (action.parameters.fillColor) {
      range.format.fill.color = getColorCode(action.parameters.fillColor);
    }

    // Apply number formatting
    if (action.parameters.numberFormat === 'currency') {
      range.numberFormat = [['$#,##0.00']];
    } else if (action.parameters.numberFormat === 'percentage') {
      range.numberFormat = [['0.00%']];
    } else if (action.parameters.numberFormat === 'decimal') {
      const decimals = action.parameters.decimals || 2;
      const format = `0.${'0'.repeat(decimals)}`;
      range.numberFormat = [[format]];
    }

    await context.sync();

    return {
      success: true,
      message: `✓ Applied formatting to ${range.address}`
    };
  });
}

/**
 * Execute formula creation actions
 */
async function executeFormulaAction(action: ExcelAction): Promise<ExcelActionResult> {
  return Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const range = context.workbook.getSelectedRange();
    range.load('address, rowCount, columnCount');
    await context.sync();

    let formula = '';
    const formulaType = action.parameters.formulaType;

    if (action.parameters.column) {
      // Create formula for specific column
      const column = action.parameters.column;
      const addressMatch = range.address.match(/\d+/);
      const startRow = addressMatch ? parseInt(addressMatch[0]) : 1;
      const lastRow = range.rowCount + startRow - 1;
      formula = `=${formulaType}(${column}:${column})`;
    } else {
      // Create formula for selected range
      if (range.rowCount > 1 || range.columnCount > 1) {
        formula = `=${formulaType}(${range.address})`;
      } else {
        return {
          success: false,
          message: 'Please select a range of cells for the formula'
        };
      }
    }

    // Place formula in the cell below the selection
    const formulaRange = range.getOffsetRange(range.rowCount, 0).getCell(0, 0);
    formulaRange.formulas = [[formula]];
    formulaRange.format.font.bold = true;
    formulaRange.format.fill.color = '#E7E6E6';

    await context.sync();

    return {
      success: true,
      message: `✓ Created ${formulaType} formula: ${formula}`
    };
  });
}

/**
 * Execute chart creation actions
 */
async function executeChartAction(action: ExcelAction): Promise<ExcelActionResult> {
  return Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const range = context.workbook.getSelectedRange();
    range.load('address');
    await context.sync();

    // Create chart from selected data
    const chartType = action.parameters.chartType || 'ColumnClustered';
    const chart = sheet.charts.add(
      chartType as Excel.ChartType,
      range,
      Excel.ChartSeriesBy.auto
    );

    chart.title.text = 'Data Visualization';
    chart.legend.position = 'Right';
    chart.legend.format.fill.setSolidColor('white');

    // Position chart next to the data
    chart.top = 10;
    chart.left = 400;
    chart.height = 300;
    chart.width = 500;

    await context.sync();

    return {
      success: true,
      message: `✓ Created ${chartType} chart from ${range.address}`
    };
  });
}

/**
 * Execute data cleaning actions
 */
async function executeDataCleaningAction(action: ExcelAction): Promise<ExcelActionResult> {
  return Excel.run(async (context) => {
    const range = context.workbook.getSelectedRange();
    range.load('address, values, rowCount, columnCount');
    await context.sync();

    const cleaningAction = action.parameters.action;

    switch (cleaningAction) {
      case 'removeDuplicates':
        return await removeDuplicates(context, range);
      
      case 'trim':
        return await trimWhitespace(context, range);
      
      case 'sort':
        return await sortData(context, range, action.parameters.ascending);
      
      case 'filter':
        return await applyFilter(context, range);
      
      default:
        return {
          success: false,
          message: 'Unknown data cleaning action'
        };
    }
  });
}

/**
 * Remove duplicate rows from selection
 */
async function removeDuplicates(context: Excel.RequestContext, range: Excel.Range): Promise<ExcelActionResult> {
  const values = range.values;
  const uniqueValues = [];
  const seen = new Set();

  for (const row of values) {
    const key = JSON.stringify(row);
    if (!seen.has(key)) {
      seen.add(key);
      uniqueValues.push(row);
    }
  }

  const duplicatesRemoved = values.length - uniqueValues.length;
  
  if (duplicatesRemoved > 0) {
    range.values = uniqueValues;
    await context.sync();
    
    return {
      success: true,
      message: `✓ Removed ${duplicatesRemoved} duplicate row(s)`
    };
  } else {
    return {
      success: true,
      message: '✓ No duplicates found'
    };
  }
}

/**
 * Trim whitespace from all cells
 */
async function trimWhitespace(context: Excel.RequestContext, range: Excel.Range): Promise<ExcelActionResult> {
  const values = range.values;
  const trimmedValues = values.map(row =>
    row.map(cell => typeof cell === 'string' ? cell.trim() : cell)
  );

  range.values = trimmedValues;
  await context.sync();

  return {
    success: true,
    message: '✓ Trimmed whitespace from all cells'
  };
}

/**
 * Sort data in the selected range
 */
async function sortData(
  context: Excel.RequestContext,
  range: Excel.Range,
  ascending: boolean = true
): Promise<ExcelActionResult> {
  range.load('columnCount');
  await context.sync();

  // Sort by first column
  range.sort.apply([
    {
      key: 0,
      ascending: ascending
    }
  ]);

  await context.sync();

  return {
    success: true,
    message: `✓ Sorted data in ${ascending ? 'ascending' : 'descending'} order`
  };
}

/**
 * Apply auto-filter to selection
 */
async function applyFilter(context: Excel.RequestContext, range: Excel.Range): Promise<ExcelActionResult> {
  range.load('address');
  await context.sync();

  const sheet = context.workbook.worksheets.getActiveWorksheet();
  
  // Clear existing filters first
  if (sheet.autoFilter) {
    sheet.autoFilter.remove();
  }

  // Apply new filter
  sheet.autoFilter.apply(range);
  await context.sync();

  return {
    success: true,
    message: `✓ Applied filter to ${range.address}`
  };
}

/**
 * Helper function to convert color names to hex codes
 */
function getColorCode(colorName: string): string {
  const colorMap: { [key: string]: string } = {
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#00FF00',
    'yellow': '#FFFF00',
    'orange': '#FFA500',
    'purple': '#800080',
    'black': '#000000',
    'white': '#FFFFFF',
    'gray': '#808080',
    'grey': '#808080'
  };

  return colorMap[colorName.toLowerCase()] || '#000000';
}
