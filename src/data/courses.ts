export interface Course {
  name: string
  code: string
  platform: string
  description: string
}

export const courses: Course[] = [
  {
    name: "CS50P: Introduction to Programming with Python",
    code: "CS50P",
    platform: "Harvard (edX) — Self-Study",
    description: "Fundamentals of programming using Python — data structures, algorithms, file I/O, and problem-solving techniques.",
  },
  {
    name: "CS50x: Introduction to Computer Science",
    code: "CS50x",
    platform: "Harvard (edX) — Self-Study",
    description: "Broad introduction to computer science — C, algorithms, data structures, memory, and web development fundamentals.",
  },
  {
    name: "CS50W: Web Programming with Python and JavaScript",
    code: "CS50W",
    platform: "Harvard (edX) — Self-Study",
    description: "Web development with Django, JavaScript, React, and SQL — building and deploying interactive web applications.",
  },
]
