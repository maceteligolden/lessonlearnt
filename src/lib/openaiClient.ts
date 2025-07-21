export const sendFilePromptToOpenAI = async (file: File): Promise<string> => {
  const fileContent = await file.text();

  const payload = {
    role: "expert-level strategist",
    department: "any department",
    task: "Create a Lessons Learned Report",
    task_description:
      "As a skilled contributor, your task is to create a Lessons Learned Report that helps improve future processes, decisions, or outcomes. The report should be comprehensive and provide actionable insights for the intended team or organization. The finished work will be used to identify areas of improvement and optimize future outcomes. Core success factors include thorough analysis, clear recommendations, and practical solutions, and will be measured by its ability to drive positive change.",
    prompt:
      "Develop a tailored Lessons Learned Report aligned with the user's individual needs, drawing insights from the supplied reference materials. Initiate interaction with the user to obtain essential specifics and resolve any ambiguities. Iteratively refine the Lessons Learned Report through consistent evaluations using the given evaluationRubric and gather user input to ensure the end product aligns with the users expectations. You MUST FOLLOW the rules in order.",
    fileContent,
    key_references: {
      key_reference_1_title: "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses",
      key_reference_1_author: "Eric Ries",
      key_reference_1_year: "2011",
      key_reference_1_keyinsights: [
        "The importance of conducting thorough analysis and experimentation to identify areas of improvement in any process.",
        "The concept of a Minimum Viable Product (MVP) and how it can be applied to test and iterate quickly.",
        "The Build-Measure-Learn feedback loop and how it can help in gathering data and insights to drive positive changes.",
      ],
      key_reference_2_title: "The Customer Success Professional's Handbook",
      key_reference_2_author: "Ashvin Vaidyanathan",
      key_reference_2_year: "2019",
      key_reference_2_keyinsights: [
        "The importance of understanding user or stakeholder needs and expectations during process development.",
        "The use of metrics and KPIs to measure success rates.",
        "Strategies for creating personalized solutions based on segmentation and goals.",
      ],
      key_reference_3_title: "The Four Steps to the Epiphany",
      key_reference_3_author: "Steve Blank",
      key_reference_3_year: "2005",
      key_reference_3_keyinsights: [
        "The importance of development and validation to identify the right audience and their specific needs.",
        "The Customer Development Process as a method to optimize outcomes.",
        "The significance of continuous learning and iteration to drive improvement and success.",
      ],
    },
    criteria: {
      criteria_1: {
        name: "Thorough Analysis",
        description:
          "Work should demonstrate a deep understanding of the problem or process by conducting a comprehensive analysis. This includes identifying key issues, evaluating current practices, and examining data to uncover insights that can drive improvements.",
      },
      criteria_2: {
        name: "Clear Recommendations",
        description:
          "Report should provide clear and concise recommendations based on the analysis conducted. These should be specific, actionable, and logically organized.",
      },
      criteria_3: {
        name: "Practical Solutions",
        description:
          "Work should propose feasible, realistic solutions aligned with goals and available resources. Include rationale for how these solutions will drive positive change.",
      },
      criteria_4: {
        name: "Use of Reference Material",
        description:
          "Effectively apply knowledge from external references to enhance the work’s relevance and quality.",
      },
      criteria_5: {
        name: "Point of View from an Industry Expert",
        description:
          "Demonstrates in-depth knowledge and expertise aligned with best practices, standards, and expectations.",
      },
      criteria_6: {
        name: "Overall Rating",
        description:
          "A holistic assessment considering all the above criteria.",
      },
    },
    evaluationRubric: {
      "1": "Poor: Fundamental flaws present. No redeeming qualities.",
      "2": "Subpar: Slightly better than level 1, but foundational errors remain.",
      "3": "Incomplete: Main components are missing or rushed.",
      "4": "Basic: Meets some requirements but lacks depth.",
      "5": "Average: Adequate but unremarkable execution.",
      "6": "Above Average: Good effort, some depth, but not yet nuanced.",
      "7": "Proficient: Comprehensive with few minor errors.",
      "7.5": "Highly Proficient: Deep understanding with occasional insights.",
      "8": "Distinguished: Mastery evident, with innovation and clarity.",
      "8.5": "Almost Exemplary: Rich, detailed, and almost flawless.",
      "9": "Exemplary: Innovative, precise, and a benchmark for others.",
      "9.5": "Superior Exemplary: Exceptional mastery with dazzling clarity.",
      "10": "Outstanding: Perfect. Sets an unmatched standard.",
    },
    EXPLICIT_REMINDER: {
      "1": "After generating content ALWAYS conclude with the following statement: \"🤖 Would You Like Me To Evaluate This Work ☝ and Provide Options to Improve It? Yes or No?\"",
    },
  };

  const response = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from OpenAI.");
  }

  const data = await response.json();
  return data.result;
};
