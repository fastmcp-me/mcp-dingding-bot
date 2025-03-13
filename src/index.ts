import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { DingtalkBot } from "./dingtalk_custom_robot.js";
// Create server instance
const server = new McpServer({
  name: "dingding-bot",
  version: "1.0.0",
  description: "A tool for sending messages to Dingding groups via a custom robot",
});

const DINGTALK_BOT_ACCESS_TOKEN = process.env.DINGTALK_BOT_ACCESS_TOKEN;
const DINGTALK_BOT_SECRET = process.env.DINGTALK_BOT_SECRET;

if (!DINGTALK_BOT_ACCESS_TOKEN) {
  console.error("DINGTALK_BOT_ACCESS_TOKEN environment variable is not set");
  process.exit(1);
}

const dingtalkBot = new DingtalkBot(DINGTALK_BOT_ACCESS_TOKEN, DINGTALK_BOT_SECRET);

server.tool(
  'send_text_message',
  'Send a plain text message',
  {
    text: z.string().describe("The text content to send"),
    atAll: z.boolean().optional().describe("Whether to @all the users in the group"),
  },
  async ({ text, atAll }) => {
    const response = await dingtalkBot.sendText(text, [], atAll);
    if (response.errcode !== 0) {
      return {
        content: [{ type: "text", text: `Failed to send message, code: ${response.errcode}, message: ${response.errmsg}` }],
      };
    }
    return {
      content: [{ type: "text", text: "Message sent successfully" }],
    };
  }
);

server.tool(
  'send_markdown_message',
  'Send a markdown message',
  {
    title: z.string().describe("The title of the message"),
    text: z.string().describe("The text content to send"),
    atAll: z.boolean().optional().describe("Whether to @all the users in the group"),
  },
  async ({ title, text, atAll }) => {
    const response = await dingtalkBot.sendMarkdown(title, text, [], atAll);
    if (response.errcode !== 0) {
      return {
        content: [{ type: "text", text: `Failed to send message, code: ${response.errcode}, message: ${response.errmsg}` }],
      };
    }
    return {
      content: [{ type: "text", text: "Message sent successfully" }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Dingding group robot MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main()", error);
  process.exit(1);
});
