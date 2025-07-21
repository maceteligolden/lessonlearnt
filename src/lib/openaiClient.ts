export const sendFilePromptToOpenAI = async (file: File): Promise<string> => {
  const fileContent = await file.text();
   
  const fullPrompt = `
You are a world-class strategic analyst tasked with writing a Lessons Learned Report using the structure and guardrails below.

You MUST follow the format exactly. Each major section (marked by Roman numerals I–IX) represents a key part of the report. Each subsection (marked A, B, C...) contains instructions on what to write under that part.

You MUST:
1. Use the headings exactly as they appear.
3. NEVER skip or invent sections. If something is unknown, write "Not available" or make a clear, reasonable assumption.
4. Draw only from the uploaded file and the provided key references.
5. Each section is labeled using Roman numerals (I., II., III., etc.)
6. Within each section, follow and respect the meaning of each alphabetical list item (A., B., C., etc.) — these are guidelines that define the structure of the content for that section.
7. Only use HTML tags to format the report:
   - Use <h2> for section titles (I., II., III.)
   - Use <strong> for alphabetical subpoints (A., B., C.)
   - Use <p> for paragraphs
   - Use <br> for line breaks
   - Use <ul><li> for bullet lists where necessary
8. Do not include any markdown syntax or extra wrappers (like <html>, <body>, etc.)
9. At the end of the report, include a short expert summary under a heading: <h2>Expert Summary</h2>

---

📄 FILE CONTENT TO ANALYZE:
${fileContent}

📚 KEY REFERENCES (use insights to strengthen findings):
- Eric Ries, *The Lean Startup* (2011):
  - Focus on experimentation, MVPs, and the Build-Measure-Learn loop.
- Ashvin Vaidyanathan, *The Customer Success Professional’s Handbook* (2019):
  - Understand stakeholder needs, use metrics/KPIs, and personalize solutions.
- Steve Blank, *The Four Steps to the Epiphany* (2005):
  - Customer Development process, validation, and continuous iteration.

---

✍️ FORMAT TO FOLLOW (NO CHANGES ALLOWED — FILL IN EACH SECTION):

---
Detailed Outline for a Lessons Learned Report

I. Introduction  
A. Purpose of the Lessons Learned Report  
B. Background information on the project or task  
C. Objectives of the report  

II. Methodology  
A. Explanation of the data collection process  
B. Identification of the sources of information (interviews, surveys, project documentation, etc.)  
C. Description of the criteria used to evaluate lessons learned  

III. Findings  
A. Summary of the lessons learned  
B. Categorization of the lessons learned into different areas (e.g., project management, communication, technical aspects, etc.)  
C. Detailed description of each lesson learned, including:  
- What went well  
- What did not go well  
- Factors contributing to the success or failure  
- Impact of the lesson learned on the project or task  
- Recommendations for improvement  

IV. Analysis  
A. Comparison of the lessons learned with initial project objectives and plans  
B. Identification of patterns or common themes among the lessons learned  
C. Assessment of the significance and relevance of each lesson learned  

V. Conclusions  
A. Summary of the key findings and analysis  
B. Identification of the most critical lessons learned  
C. Overall assessment of the project or task based on the lessons learned  

VI. Recommendations  
A. Specific actions to be taken based on the lessons learned  
B. Prioritization of the recommendations  
C. Assignment of responsibility for implementing the recommendations  

VII. Lessons Learned Implementation Plan  
A. Development of an action plan for implementing the recommendations  
B. Timeline for implementing each recommendation  
C. Monitoring and evaluation mechanisms to ensure the effectiveness of the implementation  

VIII. Lessons Learned Documentation  
A. Archiving of the lessons learned report and related documents  
B. Communication of the lessons learned to relevant stakeholders  
C. Integration of the lessons learned into future projects or tasks  

IX. Conclusion  
A. Summary of the report  
B. Acknowledgment of the contributors and stakeholders  
C. Final thoughts and closing remarks  
---

📈 After completing the report, write a separate section titled:
**Expert Analysis Based on Lessons Learned**
In this section, provide a high-level summary from the point of view of a strategist, analyzing how the key findings can lead to broader process, product, or team improvements.

Do NOT add anything beyond the format above. Do NOT add a table of contents, rating, title, author name, or markdown formatting.

🤖 Would You Like Me To Evaluate This Work ☝ and Provide Options to Improve It? Yes or No?
`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "o4-mini",
      reasoning: { effort: "medium" },
      input: [
        {
          role: "user",
          content: fullPrompt,
        },
      ],
    }),
  });
 
  if (!response.ok) {
    throw new Error("Failed to get response from OpenAI.");
  }

  const data = await response.json();

  return data.output[1].content[0].text;
};
