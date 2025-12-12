### MCP Tool descriptions and instructions waste a huge amount of context. 
So we built https://github.com/voicetreelab/lazy-mcp/ to solve it.

Previously 18% of my Claude context window was spent on the instructions for two MCP tools, Serena and Playwright. Unbelievable. 
![[Pasted image 20251012175335.png]]

That's an insane amount of context bloat to be included in every single message I send to Claude. 99% of the time Claude doesn't actually need to have detailed instructions for when and how to call `serena_get_current_config()`, so it wasted.

Let's optimize this. I rarely need playwright, but when I do, I don't want to have to manually enable it in my config file. 

Let's make an MCP manager that lets agents choose on the fly which MCP tools they would like to use, and have the context injected only then. This will also improve the accuracy of tool calls, since the instructions will be closer in-context. 

let's just make it recursive. Our primitives will be:
- a folder of tools, which has a description summarising what the category is and when to use.
- a specific tool

then the lazy-mcp server itself will have two meta-tools:
- get_tools_in_category(\<category>)
- execute_tool(\<tool>)

Here's our context window now:

![[Pasted image 20251012180310.png]]


EXAMPLE TREE STRUCT

```
mcp-proxy/
├── root.json
├── coding_tools/
│   ├── coding_tools.json
│   ├── serena/
│   │   ├── serena.json
│   │   ├── edit/
│   │   │   └── edit.json
│   │   ├── search/
│   │   │   ├── search.json
│   │   │   ├── search_symbol/
│   │   │   │   └── search_symbol.json
│   │   │   └── find_references/
│   │   │       └── find_references.json
│   │   └── file_ops/
│   │       └── file_ops.json
│   └── playwright/
│       ├── playwright.json
│       └── browser/
│           └── browser.json
├── database_tools/
│   ├── ...

```

example json file:

```
{
  "overview": "Serena provides semantic code understanding. Search for symbols, edit code intelligently, and perform file operations.",
  "categories": {
    "edit": "Modify code with semantic awareness",
    "search": "Find symbols, references, and code patterns",
    "file_ops": "Create, delete, move, and list files"
  },
  "tools": {
    "login": {
      "description": "Authenticate with Serena service to access code intelligence features",
      "input_schema": {
        "type": "object",
        "properties": {
          "api_key": {
            "type": "string",
            "description": "Serena API key"
          }
        },
        "required": ["api_key"]
      }
    }
  }
}
```

The full flow can now be:

**on agent startup:**

/tools/list -> "the message u get when you ask for /tools/list ++++++++ inject for each root category <category.overview>, "


-----------------
**getting a tool**
get_tools_in_category(coding_tools) -> overview of every every folders folder.json file
                                               -> available_categories: [{"serena" : use when xyz"}, {"playwright" : "use when abc"]
                                               -> available_tools : []
get_tools_in_category(coding_tools.serena) -> available_categories:
                                                           available:tools: [{login:""}]

**executing** a tool: 
execute_tool(coding_tools.serena.search.search_symbol("manu"))
// or if unique execute_tool(search_symbol("manu"))

here's claude using it:

![[Pasted image 20251012180507.png]]