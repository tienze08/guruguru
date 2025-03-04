import dedent from "dedent";

export default {
  IDEA: dedent`:As your are coaching teacher
    - User want to learn about the topic
    - Generate 5-7 Course title for study (Short)
    - Make sure it is releated to description
    - Output will be ARRAY of String in JSON FORMAT only
    - Do not add any plain text in output,
    `,

  COURSE: dedent`: As you are coaching teacher
    - User want to learn about all topics
    - Create 2 Courses With Course Name, Description, and 5/8 Chapters in each course
    - Make sure to add chapters 
    - List Content in each chapter along with Description in 5 to 8 lines
    - Do not Just Explain what chapter about, Explain in Detail with Example
    - Also Make Easy, Moderate and Advance Course depends on topics
    - Add CourseBanner Image from ('/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png'), select It randomly
    - Explain the chapter content as detailed tutorial with list of content
    - Generate 10 Quizz, 10 Flashcard and 10 Questions answer
    - Tag each course to one of the category from :["Tech & Coding","Business & Finance","Health & Fitness","Science & Engineering","Arts & Creativity"]
    - Output in JSON Format only 
    - "courses": [
  {
    "docId": "<Unique Course ID>",
    "courseTitle": "<Intro to Python>",
    "description": "",
    "banner_image": "/banner1.png",
    "category": "",
    "chapters": [
      {
        "chapterName": "",
        "content": [
          {
            "topic": "<Topic Name in 2 to 4 words ex.(Creating Variables)>",
            "explain": "<Detailed Explanation in 5 to 8 lines if required>",
            "code": "<Code example if required else null>",
            "example": "<Example if required else null>"
          }
        ]
      }
    ],
    "completedChapter": [],
    "quiz": [
      {
        "question": "",
        "options": ["a", "b", "c", "d"],
        "correctAns": ""
      }
    ],
    "flashcards": [
      {
        "front": "",
        "back": ""
      }
    ],
    "qa": [
      {
        "question": "",
        "answer": ""
      }
    ]
  }
]
    `
};
