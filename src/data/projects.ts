export interface CodeSnippet {
  label: string
  language: string
  code: string
  rawUrl: string
}

export interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
  snippets?: CodeSnippet[]
}

const unitConverterBackend = `const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const toMeterFactor = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344
}

app.post('/length', (request, response) => {
  const { value, fromUnit, toUnit } = request.body
  const fromFactor = toMeterFactor[fromUnit]
  const toFactor = toMeterFactor[toUnit]
  if (!fromFactor || !toFactor) throw new Error('Invalid unit')
  const convertedValue = (value * fromFactor) / toFactor
  response.json({ value: convertedValue, fromUnit, toUnit })
})

const toCelsius = {
  celsius: v => v,
  fahrenheit: v => (v - 32) * 5 / 9,
  kelvin: v => v - 273.15
}

app.post('/temperature', (request, response) => {
  const { value, fromUnit, toUnit } = request.body
  const normalize = toCelsius[fromUnit]
  const convert = fromCelsius[toUnit]
  if (!normalize || !convert) throw new Error('Invalid unit')
  const celsius = normalize(value)
  const convertedValue = convert(celsius)
  response.json({ value: convertedValue, fromUnit, toUnit })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`))`

const unitConverterForm = `import { useState, useEffect } from 'react'
import sendreq from '../services/conversion'
import Result from './Result'

const unitCategories = {
  length: ['millimeter', 'centimeter', 'meter', 'kilometer', 'inch', 'foot', 'yard', 'mile'],
  weight: ['milligram', 'gram', 'kilogram', 'ounce', 'pound'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
}

const Form = ({ unit }) => {
  const [returnValue, setReturn] = useState(null)
  const [value, setValue] = useState(0)
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [categories, setCategory] = useState([])

  useEffect(() => {
    setCategory(unitCategories[unit] || [])
    setReturn(null); setValue(0)
    setFromUnit(''); setToUnit('')
  }, [unit])

  const handleSubmit = async e => {
    e.preventDefault()
    if (isNaN(value)) return
    if (fromUnit === '' || toUnit === '') return
    const unitObject = { value: parseFloat(value), fromUnit, toUnit }
    const result = await sendreq(unit, unitObject)
    setReturn(result)
  }

  return (
    <div className='form'>
      <h3>{unit.charAt(0).toUpperCase() + unit.slice(1).toLowerCase()} Converter</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
          <option value="" disabled>Select</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={toUnit} onChange={e => setToUnit(e.target.value)}>
          <option value="" disabled>Select</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button type='submit'>Convert</button>
      </form>
      {returnValue && <Result returnValue={returnValue} />}
    </div>
  )
}

export default Form`

const blogController = `const postRouter = require('express').Router()
const Post = require('../models/post')

postRouter.get('/', async (request, response) => {
  const term = request.query.term
  if (term) {
    const posts = await Post.aggregate([{
      $search: {
        index: "postSearch",
        text: { query: term, path: { wildcard: "*" } }
      }
    }, {
      $project: {
        id: "$_id", _id: 0,
        title: 1, content: 1, category: 1, tags: 1,
        createdAt: 1, updatedAt: 1
      }
    }])
    posts ? response.status(200).json(posts)
          : response.status(404).json({ error: 'Search failed' })
  } else {
    const posts = await Post.find({})
    posts ? response.status(200).json(posts)
          : response.status(404).json({ error: 'Posts not found' })
  }
})

postRouter.get('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id)
  post ? response.status(200).json(post)
       : response.status(404).json({ error: 'Post not found' })
})

postRouter.post('/', async (request, response) => {
  const body = request.body
  const post = new Post({
    title: body.title, content: body.content,
    category: body.category, tags: body.tags,
    createdAt: Date().toString(), updatedAt: Date().toString()
  })
  const savedPost = await post.save()
  response.status(201).json(savedPost)
})

postRouter.put('/:id', async (request, response) => {
  const prevPost = await Post.findById(request.params.id)
  if (prevPost) {
    const post = new Post({
      title: request.body.title || prevPost.title,
      content: request.body.content || prevPost.content,
      category: request.body.category || prevPost.category,
      tags: request.body.tags || prevPost.tags,
      updatedAt: Date().toString()
    })
    await post.save()
    await Post.findByIdAndDelete(request.params.id)
    response.status(201).json(post)
  } else {
    response.status(404).json({ error: 'Post not found' })
  }
})

postRouter.delete('/:id', async (request, response) => {
  await Post.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = postRouter`

const blogModel = `const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  category: String,
  tags: Array,
  createdAt: String,
  updatedAt: String,
})

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post`

const expenseTracker = `import os, argparse, json
from datetime import datetime

def add(args):
    expenses = check_file()
    try: id = expenses[-1]['id'] + 1
    except IndexError: id = 1
    expenses.append({
        "id": id, "description": args.description,
        "amount": args.amount,
        "date": datetime.today().strftime("%d-%m-%Y")
    })
    write_file(expenses)
    print(f"Expense added successfully (ID {id})")

def list(args):
    expenses = check_file()
    print('\\n%-5s%-12s%-20s%-12s' % ('ID','Date','Description','Amount'))
    for e in expenses:
        print('%-5s%-12s%-20s%-12s' % (e['id'], e['date'], e['description'], e['amount']))

def summary(args):
    total = 0
    expenses = check_file()
    for e in expenses:
        date = datetime.strptime(e['date'], "%d-%m-%Y")
        if args.month == 0 or args.month == date.month:
            total += e['amount']
    label = "Total expenses" + (f" for {args.month}" if args.month else "")
    print(f"{label}: \${total}")

def delete(args):
    expenses = check_file()
    for e in expenses:
        if e['id'] == args.id:
            expenses.remove(e)
            write_file(expenses)
            print("Expense removed")
            return

def check_file():
    if os.path.exists("expenses.json"):
        with open("expenses.json", "r") as f:
            return json.load(f)
    return []

def write_file(expenses):
    with open("expenses.json", "w") as f:
        json.dump(expenses, f, indent=4)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers()

    pa = subparsers.add_parser('add')
    pa.add_argument('-d', '--description', required=True)
    pa.add_argument('-a', '--amount', type=float, required=True)
    pa.set_defaults(func=add)

    pl = subparsers.add_parser('list')
    pl.set_defaults(func=list)

    ps = subparsers.add_parser('summary')
    ps.add_argument('-m', '--month', type=int, default=0)
    ps.set_defaults(func=summary)

    pd = subparsers.add_parser('delete')
    pd.add_argument('-i', '--id', type=int, required=True)
    pd.set_defaults(func=delete)

    args = parser.parse_args()
    args.func(args)`

const llmCodeRoast = `from ollama import chat
from .tools import read_files, list_files, get_cwd


class LlamaChat:
    def __init__(self, model=OLLAMA_MODEL) -> None:
        self.model = model
        self.messages = []
        self.available_tools = {
            "read_files": read_files,
            "list_files": list_files,
            "get_cwd": get_cwd,
        }

    def get_response(self, messages):
        self.messages = messages
        print("\\033[2m[Qwen thinking...] \\033[0m", end="\\r")

        while True:
            response = chat(
                model=self.model,
                messages=self.messages,
                tools=list(self.available_tools.values()),
                stream=True,
            )

            content = ""
            thinking = ""
            tool_calls = []
            thinking_started = False
            content_started = False

            for chunk in response:
                if chunk.message.thinking:
                    if not thinking:
                        print("\\033[2mQwen thinking: \\033[0m", end="")
                        thinking_started = True
                    thinking += chunk.message.thinking
                    print(f"\\033[2m{chunk.message.thinking}\\033[0m", end="", flush=True)
                if chunk.message.content:
                    if not content_started and thinking_started:
                        print("\\nQwen: ", end="")
                        content_started = True
                    content += chunk.message.content
                    print(chunk.message.content, end="", flush=True)
                if chunk.message.tool_calls:
                    tool_calls.extend(chunk.message.tool_calls)

            self.messages.append({
                "role": "assistant", "content": content,
                "tool_calls": tool_calls,
            })

            if tool_calls:
                for tool in tool_calls:
                    tool_name = tool.function.name
                    arguments = tool.function.arguments
                    print(f"\\nSystem: AI is running tool: {tool_name} {arguments}\\n")
                    if function_to_call := self.available_tools.get(tool_name):
                        result = function_to_call(**arguments)
                        self.messages.append({
                            "role": "tool", "content": str(result),
                            "name": tool_name,
                        })
            else:
                print()
                break`

const githubActivity = `import requests, json, csv

def display_info(username):
    url = f"https://api.github.com/users/{username}/events"
    response = requests.get(url)

    if response.status_code != 200 or response.json() == []:
        print(f"\\n - No GitHub activity for {username}\\n")
        return

    events = response.json()
    _, grouped = sort_events(events)

    verb_map = {}
    with open("events.csv", "r") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            verb_map[row[0]] = row[1]

    print(f"\\nGitHub activity for {username.capitalize()}")
    for group in grouped:
        for event_type, event_list in group.items():
            verb = verb_map.get(event_type, "did something")
            repo = event_list[0]["repo"]["name"]
            print(f" - {verb} {len(event_list)} time(s) to {repo}")
    print()

def sort_events(response):
    by_type = {}
    for event in response:
        t = event["type"]
        if t not in by_type: by_type[t] = []
        by_type[t].append(event)
    grouped = [{t: l} for t, l in by_type.items()]
    return list(by_type.keys()), grouped

def main():
    while True:
        username = input("github-activity: ").strip().lower()
        if username in ("quit", "q"):
            break
        display_info(username)

if __name__ == "__main__":
    main()`

const llmTools = `import os


def read_files(filepath: str) -> str:
    if not os.path.isfile(filepath):
        return f"Error: {filepath} is a directory, not a file."
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()


def list_files(directory: str) -> str:
    files = os.listdir(directory)
    return f"Files: {', '.join(files)}"


def get_cwd() -> str:
    return os.getcwd()`

export const projects: Project[] = [
  {
    title: "Unit Converter",
    description:
      "A full-stack web app built with React and Express for converting between different units of measurement. Deployed and live on Render.",
    tags: ["React", "Express", "Node.js", "CSS"],
    image: "",
    liveUrl: "https://unit-converter-arra.onrender.com",
    repoUrl: "https://github.com/Xqni/Unit-Converter",
    snippets: [
      {
        label: "backend/index.js",
        language: "javascript",
        code: unitConverterBackend,
        rawUrl: "https://raw.githubusercontent.com/Xqni/Unit-Converter/main/backend/index.js",
      },
      {
        label: "Form.jsx",
        language: "jsx",
        code: unitConverterForm,
        rawUrl: "https://raw.githubusercontent.com/Xqni/Unit-Converter/main/main/src/components/Form.jsx",
      },
    ],
  },
  {
    title: "Blogging Platform API",
    description:
      "RESTful API for a blogging platform built with Node.js, Express, and MongoDB. Full CRUD with search via MongoDB Atlas Search.",
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    image: "",
    repoUrl: "https://github.com/Xqni/Blogging-Platform-API",
    snippets: [
      {
        label: "controllers/posts.js",
        language: "javascript",
        code: blogController,
        rawUrl: "https://raw.githubusercontent.com/Xqni/Blogging-Platform-API/main/controllers/posts.js",
      },
      {
        label: "models/post.js",
        language: "javascript",
        code: blogModel,
        rawUrl: "https://raw.githubusercontent.com/Xqni/Blogging-Platform-API/main/models/post.js",
      },
    ],
  },
  {
    title: "Expense Tracker",
    description:
      "A CLI program in Python to track personal expenses. Features add, update, delete, list, and summary commands with JSON persistence.",
    tags: ["Python", "CLI", "argparse", "JSON"],
    image: "",
    repoUrl: "https://github.com/Xqni/Expense-Tracker",
    snippets: [
      {
        label: "main.py",
        language: "python",
        code: expenseTracker,
        rawUrl: "https://raw.githubusercontent.com/Xqni/Expense-Tracker/main/main.py",
      },
    ],
  },
  {
    title: "GitHub User Activity",
    description:
      "A command-line tool that fetches and displays GitHub user activity via the GitHub API. Demonstrates API integration and clean CLI design in Python.",
    tags: ["Python", "CLI", "GitHub API", "JSON"],
    image: "",
    repoUrl: "https://github.com/Xqni/GitHub-User-Activity",
    snippets: [
      {
        label: "main.py",
        language: "python",
        code: githubActivity,
        rawUrl: "https://raw.githubusercontent.com/Xqni/GitHub-User-Activity/main/main.py",
      },
    ],
  },
  {
    title: "LLM Code Roast",
    description:
      "A CLI chatbot powered by Qwen3:8b via Ollama with streaming responses and tool calling. The LLM can read files, list directories, and get the working directory — with full agentic loop that re-calls tools until the task is done.",
    tags: ["Python", "LLM", "Ollama", "CLI", "AI"],
    image: "",
    repoUrl: "https://github.com/Xqni/llm-python-code-roast",
    snippets: [
      {
        label: "src/chat.py",
        language: "python",
        code: llmCodeRoast,
        rawUrl: "https://raw.githubusercontent.com/Xqni/llm-python-code-roast/main/src/chat.py",
      },
      {
        label: "src/tools.py",
        language: "python",
        code: llmTools,
        rawUrl: "https://raw.githubusercontent.com/Xqni/llm-python-code-roast/main/src/tools.py",
      },
    ],
  },
]
