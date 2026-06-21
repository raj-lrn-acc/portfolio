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
