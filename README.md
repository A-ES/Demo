# AI Agent

An AI agent that can execute tasks using tools and manage conversations.

## Features

### Core Functionality

- Interactive and single-run modes
- Streaming text responses
- Multi-turn conversations with tool calling
- Configurable model settings and temperature

### Built-in Tools

- File operations: read, write, edit files
- Directory operations: list directories, search with glob patterns
- Text search: grep for pattern matching
- Shell execution: run shell commands
- Web access: search and fetch web content
- Memory: store and retrieve information
- Todo: manage task lists

### Context Management

- Automatic context compression when approaching token limits
- Tool output pruning to manage context size
- Token usage tracking

### Safety and Approval

- Multiple approval policies: on-request, auto, never, yolo
- Dangerous command detection and blocking
- Path-based safety checks
- User confirmation prompts for mutating operations

### Session Management

- Save and resume sessions
- Create checkpoints
- Persistent session storage

### MCP Integration

- Connect to Model Context Protocol servers
- Use tools from MCP servers
- Support for stdio and HTTP/SSE transports

### Subagents

- Specialized subagents for specific tasks
- Built-in subagents: codebase investigator, code reviewer
- Configurable subagent definitions with custom tools and limits

### Loop Detection

- Detects repeating actions
- Prevents infinite loops in agent execution

### Hooks System

- Execute scripts before/after agent runs
- Execute scripts before/after tool calls
- Error handling hooks
- Custom commands and scripts

### GitHub Automation

- **Auto-commit**: After the agent finishes, automatically commit changed files (only when the working directory is a git repo and there are changes).
- **Auto-push**: Optionally push the commit to a branch (e.g. `origin/agent-updates`).
- **Auto-PR**: Optionally create a pull request via the GitHub CLI (`gh pr create`). Requires [GitHub CLI](https://cli.github.com/) installed and authenticated.

**Does it create the commit automatically?**  
Yes. When `enabled = true` and `auto_commit = true`, the agent runs **on its own** after each run: if there are uncommitted changes, it runs `git add -A` and `git commit -m "..."` (no manual step). Push and PR run automatically too when enabled.

#### Credentials & setup (step by step)

**1. Auto-commit only (no credentials needed)**  
- Ensure your project is a git repo (`git init` if not).  
- Set git user name and email so commits have an author:
  ```bash
  git config user.name "Your Name"
  git config user.email "you@example.com"
  ```
- In `.ai-agent/config.toml`:
  ```toml
  [github]
  enabled = true
  auto_commit = true
  auto_push = false
  auto_pr = false
  ```
- That’s it. After the agent finishes, it will create the commit automatically when there are changes.

**2. Auto-push (credentials required)**  
Choose one:

- **Option A – GitHub CLI (recommended if you want PRs later)**  
  1. Install [GitHub CLI](https://cli.github.com/): `brew install gh` (macOS) or see the link.  
  2. Run `gh auth login` and follow the prompts (browser or token).  
  3. No extra token needed for push; `gh` and `git` use the same auth after login.

- **Option B – Personal Access Token (HTTPS)**  
  1. GitHub → Settings → Developer settings → [Personal access tokens](https://github.com/settings/tokens) → Generate new token (classic).  
  2. Enable scope **repo**.  
  3. Use the token as the **password** when `git push` asks (or store it in your OS keychain / credential helper so you’re not prompted every time).

- **Option C – SSH key**  
  1. Generate a key: `ssh-keygen -t ed25519 -C "you@example.com"`.  
  2. Add the **public** key to GitHub: Settings → SSH and GPG keys.  
  3. Use an SSH remote: `git remote set-url origin git@github.com:USER/REPO.git`.  
  No token needed; SSH key is the credential.

**3. Auto-PR**  
- Requires GitHub CLI: install `gh` and run `gh auth login` (step 2A above).  
- Then set in config:
  ```toml
  [github]
  enabled = true
  auto_commit = true
  auto_push = true
  auto_pr = true
  branch = "agent-updates"
  ```

**Summary**

| Feature     | Credential / requirement                          |
|------------|----------------------------------------------------|
| Auto-commit | None (just git `user.name` / `user.email`)       |
| Auto-push   | GitHub CLI **or** HTTPS token **or** SSH key      |
| Auto-PR     | GitHub CLI (`gh auth login`)                      |

Enable in config (e.g. `.ai-agent/config.toml`):

```toml
[github]
enabled = true
auto_commit = true
auto_push = true
auto_pr = true
branch = "agent-updates"
commit_message_template = "Agent: {user_message}"
pr_title_template = "Agent updates: {user_message}"
```

### Configuration

- Configurable working directory
- Tool allowlisting
- Developer and user instructions
- Shell environment policies
- MCP server configuration

### User Interface

- Terminal UI with formatted output
- Command interface: /help, /config, /tools, /mcp, /stats, /save, /resume, /checkpoint, /restore
- Real-time tool call visualization
