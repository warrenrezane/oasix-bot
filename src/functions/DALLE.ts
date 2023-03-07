import { Message } from "discord.js";
import axios, { AxiosError } from "axios";

export default async function (message: Message): Promise<void> {
  await message.channel.sendTyping();

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY as string}`,
    },
  };

  const payload = {
    prompt: message.content,
    size: "1024x1024",
    user: message.author.username,
  };

  try {
    const { data } = await axios.post(
      "https://api.openai.com/v1/images/generations",
      payload,
      config
    );

    await message.channel.send({
      content: `<@${message.member?.user.id}> ${data.choices[0].text}`,
      files: [
        {
          attachment: data.data.url[0],
        },
      ],
    });

    return;
  } catch (error) {
    await message.channel.send({
      content: `<@${message.author.id}> I'm very sorry, I can't answer your question right now. I'm a little bit busy. Could you please ask it again later? Thank you!`,
    });
  }
}
