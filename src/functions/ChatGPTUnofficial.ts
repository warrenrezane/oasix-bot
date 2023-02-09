import axios from "axios";
import { Message } from "discord.js";
import { MySQLDriver, QuickDB } from "quick.db";

export default async function (
  message: Message,
  mysql: MySQLDriver
): Promise<void> {
  // Connect to DB
  await mysql!.connect();
  const db = new QuickDB({ driver: mysql });

  // Set ChatGPT table
  const chatgpt = db.table("chatgpt");

  // Check if user's ChatGPT cache exist
  // If it doesn't exist, create a new data inside chatgpt table.
  // If exists, fetch the conversationId and messageId to be passed in the axios post request, and finally, reset the data.
  if (!(await chatgpt.has(`${message.member?.user.id}`))) {
    await message.channel.sendTyping();

    const { data } = await axios({
      method: "post",
      url: process.env.OASIX_BOT_CHATGPT_ENDPOINT as string,
      data: { user: message.member?.user.username, message: message.content },
    });

    await message.channel.send({
      content: `<@${message.member?.user.id}> ${data.response}`,
    });

    await chatgpt.set(`${message.member?.user.id}`, {
      messageId: data.messageId,
      conversationId: data.conversationId,
    });

    return;
  } else {
    await message.channel.sendTyping();
    const cache: { conversationId: string; messageId: string } | null =
      await chatgpt.get(`${message.member?.user.id}`);
    const { conversationId, messageId } = cache!;

    const { data } = await axios({
      method: "post",
      url: process.env.OASIX_BOT_CHATGPT_ENDPOINT as string,
      data: {
        user: message.member?.user.username,
        message: message.content,
        conversationId,
        messageId,
      },
    });

    await message.channel.send({
      content: `<@${message.member?.user.id}> ${data.response}`,
    });

    await chatgpt.delete(`${message.member?.user.id}`);
    await chatgpt.set(`${message.member?.user.id}`, {
      messageId: data.messageId,
      conversationId: data.conversationId,
    });

    return;
  }
}
