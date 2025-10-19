When performing a code review, validate that there are changes in the README.md file that match the changes in the pull request. If there are no changes, or if the changes do not match, then the pull request is not ready to be merged.

When performing a code review, ensure that the description field in the front matter is not empty.

Write automated tests in Playwright following these guidelines:

- **Use `test.describe` for grouping**
- Do not add comments to each line of code
- Write only the Playwright test steps for the scenario
- Read and analyze the provided Dom context from the browser
- Create one test at a time unless specifically asked for multiple tests
- Prioritise `getByRole` `getByText` selectors over `locator` when possible
- Keep test code clean and focused on the test scenario 
- Don't add assertions unless asked
- For the random test data, keep it short and compact. Don't write long texts
