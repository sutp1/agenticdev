# Usage Examples for Excel Nano Agent

This guide provides detailed examples of how to use the Excel Nano Agent to automate various Excel tasks.

## Getting Started

1. Make sure the add-in is loaded (see SETUP.md)
2. Click the **Nano Agent** button in the Home ribbon
3. The task pane will open on the right side
4. Type your request in natural language

## Cell Formatting Examples

### Text Formatting

**Make text bold:**
```
"Bold the selected cells"
"Make the text bold"
```

**Make text italic:**
```
"Italicize selected cells"
"Make text italic"
```

**Apply underline:**
```
"Underline the selected text"
"Add underline"
```

**Combine formatting:**
```
"Make text bold and italic"
```

### Number Formatting

**Format as currency:**
```
"Format as currency"
"Format selected cells as dollars"
"Apply currency format"
```

**Format as percentage:**
```
"Format as percentage"
"Show as percent"
"Convert to percentage format"
```

**Format decimals:**
```
"Format with 2 decimal places"
"Show 3 decimals"
```

### Color Formatting

**Change font color:**
```
"Make text red"
"Change color to blue"
"Apply green color"
```

**Change background color:**
```
"Fill background with yellow"
"Set background color to orange"
"Apply red background"
```

## Formula Creation Examples

### SUM Formulas

**Sum a range:**
1. Select a range of numbers
2. Type: "Create a sum formula"
3. The formula will be placed below your selection

**Sum a specific column:**
```
"Create a sum formula for column A"
"Sum column B"
```

### AVERAGE Formulas

**Calculate average:**
1. Select numbers
2. Type: "Calculate the average"

**Average of specific column:**
```
"Average column C"
"Calculate average for column D"
```

### COUNT Formulas

**Count values:**
```
"Count the selected cells"
"How many values in this range"
```

## Chart Creation Examples

### Bar Charts

**Create from selection:**
1. Select your data (including headers)
2. Type: "Create a bar chart"
3. Chart appears next to your data

### Column Charts

```
"Generate a column chart from selection"
"Make a column chart"
```

### Line Charts

```
"Create a line chart"
"Generate line graph from this data"
```

### Pie Charts

```
"Make a pie chart"
"Create a pie chart from selection"
```

## Data Cleaning Examples

### Remove Duplicates

**Remove duplicate rows:**
1. Select data range including duplicates
2. Type: "Remove duplicates"
3. Duplicate rows are removed

Example data:
```
Name    | Age
--------|----
John    | 25
Jane    | 30
John    | 25  <- This will be removed
Bob     | 35
```

### Trim Whitespace

**Remove extra spaces:**
```
"Trim whitespace"
"Remove extra spaces"
"Clean up spaces"
```

Before:
```
"  John  "
" Jane   "
"Bob     "
```

After:
```
"John"
"Jane"
"Bob"
```

### Sort Data

**Sort ascending:**
```
"Sort in ascending order"
"Sort A to Z"
"Sort smallest to largest"
```

**Sort descending:**
```
"Sort in descending order"
"Sort Z to A"
"Sort largest to smallest"
```

### Apply Filters

**Enable filtering:**
```
"Apply filter"
"Add filter to selection"
"Enable data filtering"
```

This adds filter dropdown arrows to your headers.

## Complete Workflow Examples

### Example 1: Sales Data Analysis

**Scenario**: You have monthly sales data and want to analyze it.

1. **Input your data:**
   ```
   Month   | Sales
   --------|-------
   Jan     | 5000
   Feb     | 6500
   Mar     | 7200
   Apr     | 5800
   ```

2. **Format currency:**
   - Select sales column
   - Type: "Format as currency"

3. **Add total:**
   - Select sales data
   - Type: "Create a sum formula"

4. **Create visualization:**
   - Select all data
   - Type: "Generate a column chart"

5. **Result**: Formatted table with total and visual chart

### Example 2: Contact List Cleanup

**Scenario**: Clean up a messy contact list.

1. **Remove duplicates:**
   - Select all contact data
   - Type: "Remove duplicate rows"

2. **Trim spaces:**
   - Select name column
   - Type: "Trim whitespace"

3. **Sort alphabetically:**
   - Select entire list
   - Type: "Sort in ascending order"

4. **Apply filter:**
   - Select header row
   - Type: "Apply filter"

### Example 3: Budget Report

**Scenario**: Format a budget report professionally.

1. **Bold headers:**
   - Select header row
   - Type: "Make text bold"

2. **Format amounts:**
   - Select amount columns
   - Type: "Format as currency with 2 decimals"

3. **Highlight totals:**
   - Select total row
   - Type: "Bold text and fill background with yellow"

4. **Calculate totals:**
   - Select expense column
   - Type: "Create sum formula"

5. **Calculate averages:**
   - Select monthly data
   - Type: "Calculate average"

## Tips for Best Results

### 1. Clear Selection
Always select the cells you want to work with before giving a command.

### 2. Specific Commands
Be specific about what you want:
- ✅ "Format as currency with 2 decimals"
- ❌ "Make it look better"

### 3. One Action at a Time
For complex tasks, break them down:
1. First: "Bold the text"
2. Then: "Fill background with yellow"

### 4. Include Headers in Charts
When creating charts, include column headers in your selection.

### 5. Data Range for Formulas
Select the entire range you want to calculate before asking for formulas.

## Quick Actions

The add-in includes quick action buttons for common tasks:
- "Format selected cells as currency"
- "Create a sum formula for column A"
- "Generate a bar chart from selection"
- "Remove duplicates from selected data"

Click any quick action button to auto-fill the input field.

## Error Messages

If something goes wrong, the add-in will display helpful error messages:

- "Please select a range of cells" - Make a selection first
- "No duplicates found" - Your data is already unique
- "Failed to execute action" - Try rephrasing your command

## Advanced Usage

### Combining Multiple Actions

For complex formatting, you can use multiple commands in sequence:

1. "Bold the selected cells"
2. "Format as currency"
3. "Fill background with light blue"

### Working with Multiple Sheets

The add-in works with the currently active sheet. Switch sheets in Excel, then use the commands.

### Large Datasets

For large datasets (1000+ rows):
- Commands may take longer to execute
- Consider working with smaller ranges
- Use filters to show only relevant data

## Need Help?

If you're stuck:
1. Try the quick action buttons
2. Refer to the examples in this guide
3. Check the welcome message for suggestions
4. Open an issue on GitHub for support

## Next Steps

- Experiment with different combinations
- Try complex multi-step workflows
- Provide feedback for improving the AI understanding
- Request new features on GitHub
