/* eslint-disable */
const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

// Read the XML file
const xml = fs.readFileSync('./reports/test-report.xml', 'utf8');

// Parse the XML using XMLParser
const parser = new XMLParser({ ignoreAttributes: false, parseAttributeValue: true, attributeNamePrefix: '' });
const parsedXml = parser.parse(xml);

// Extract relevant information from the parsed XML
const testSuites = Array.isArray(parsedXml.testsuites.testsuite)
	? parsedXml.testsuites.testsuite
	: [parsedXml.testsuites.testsuite];
const numTests = testSuites.reduce((acc, testsuite) => acc + Number(testsuite.tests), 0);
const numFailures = testSuites.reduce((acc, testsuite) => acc + Number(testsuite.failures), 0);
const numSkipped = testSuites.reduce((acc, testsuite) => acc + Number(testsuite.skipped), 0);
const testCases = testSuites.flatMap((testsuite) => {
	const cases = Array.isArray(testsuite.testcase) ? testsuite.testcase : [testsuite.testcase];

	return cases.map((testcase) => {
		return {
			name: `${testsuite.name}: ${testcase.name}`,
			failure: Array.isArray(testcase.failure) ? testcase.failure : [testcase.failure],
			duration: testcase.time,
		};
	});
});

// Generate an HTML report
let html = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test Results</title>
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #444;
        background-color: #f7f7f7;
      }

      .container {
        max-width: 960px;
        margin: 0 auto;
        padding: 1rem;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      h1 {
        text-align: center;
        margin-bottom: 2rem;
        color: #444;
      }

      p {
        margin: 0 0 1rem;
        font-size: 1.1rem;
      }

      h2 {
        margin-top: 3rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: #444;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 2rem;
      }

      th,
      td {
        text-align: left;
        padding: 0.5rem;
        border-bottom: 1px solid #ddd;
      }

      th {
        font-weight: bold;
        background-color: #f7f7f7;
        color: #444;
      }

      td {
        vertical-align: top;
      }

      tr:nth-child(even) {
        background-color: #f2f2f2;
      }

      .failed {
        color: #dc3545;
        font-weight: bold;
      }

      .skipped {
        color: #ffc107;
        font-weight: bold;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        text-align: left;
        padding: 8px;
      }
      th {
        background-color: #f2f2f2;
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      .test-name {
        width: 50%;
      }
      .result {
        width: 20%;
      }
      .message {
        width: 30%;
      }
      .failed {
        color: red;
        font-weight: bold;
      }
      .skipped {
        color: orange;
        font-weight: bold;
      }
      code {
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Test Results</h1>
      <p>Number of tests: ${numTests}</p>
      <p>Number of failures: ${numFailures}</p>
      <p>Number of skipped tests: ${numSkipped}</p>
      <h2>Test Cases</h2>
      <table>
      <thead>
        <tr>
          <th>Test Name</th>
          <th>Result</th>
          <th>Duration</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        ${testCases
			.map(
				(testCase) => `
              <tr>
                <td class="test-name">${testCase.name}</td>
                <td class="test-result ${
					testCase.failure.length ? 'failed' : testCase.skipped.length ? 'skipped' : 'passed'
				}">${testCase.failure.length ? 'Failed' : testCase.skipped.length ? 'Skipped' : 'Passed'}</td>
                <td class="test-duration">${testCase.duration ? `${testCase.duration}ms` : '-'}</td>
                <td>
                  ${
						testCase.failure.length
							? testCase.failure.map((failure) => `<code>${failure}</code>`).join('<br><br>')
							: testCase.skipped.length
							? testCase.skipped.map((skipped) => skipped).join('<br><br>')
							: '-'
					}
                </td>
              </tr>
            `,
			)
			.join('')}
      </tbody>
    </table>

            </body>
            </html>
            `;

// Write the HTML file
fs.writeFileSync('test-results.html', html, 'utf8');
