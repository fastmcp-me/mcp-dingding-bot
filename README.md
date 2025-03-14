# MCP DingDing Bot

MCP Server for the DingDing Bot API, enabling DingDing / Dingtalk message notifications and interactions.

## Features

* **Message Notifications**: Send various types of DingDing messages (text / markdown)

## Tools

1. `send_text_message`
   * Send a plain text message to a dingding group
   * Inputs:
     * `text` (string): Text content
     * `atAll` (optional boolean): Whether to @ all members

2. `send_markdown_message`
   * Send a markdown formatted message to a dingding group
   * Inputs:
     * `title` (string): Message title
     * `text` (string): Markdown content
     * `atAll` (optional boolean): Whether to @ all members

## Setup

### DingDing Bot Token

1. Create a DingDing group chat bot:
   * Go to group settings > Group Bot Management
   * Create a custom bot
   * Save the webhook URL and secret

### Usage with Claude Desktop
Add the following to your `claude_desktop_config.json`:

### Docker

```json
{
  "mcpServers": {
    "gitlab": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "DINGTALK_BOT_ACCESS_TOKEN",
        "-e",
        "DINGTALK_BOT_SECRET",
        "shawyeok/mcp-dingding-bot"
      ],
      "env": {
        "DINGTALK_BOT_ACCESS_TOKEN": "<YOUR_ACCESS_TOKEN>",
        "DINGTALK_BOT_SECRET": "<YOUR_SECRET>" // Optional, for robots with signature verification enabled
      }
    }
  }
}
```

### NPX

```json
{
  "mcpServers": {
    "gitlab": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-dingding-bot"
      ],
      "env": {
        "DINGTALK_BOT_ACCESS_TOKEN": "<YOUR_ACCESS_TOKEN>",
        "DINGTALK_BOT_SECRET": "<YOUR_SECRET>" // Optional, for robots with signature verification enabled
      }
    }
  }
}
```

## Build

Docker build:
```shell
docker build -t shawyeok/mcp-dingding-bot .
```

## Environment Variables

- `DINGTALK_BOT_ACCESS_TOKEN`: Your dingding group robot access token (required)
- `DINGTALK_BOT_SECRET`: Your dingding group robot signature secret (optional)

## References
- https://modelcontextprotocol.io/quickstart/server
- https://open.dingtalk.com/document/robots/custom-robot-access

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
