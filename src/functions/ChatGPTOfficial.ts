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
    model: "text-davinci-003",
    max_tokens: 1000,
    prompt: message.content,
    temperature: 0,
    user: message.author.username,
  };

  try {
    const { data } = await axios.post(
      "https://api.openai.com/v1/completions",
      payload,
      config
    );

    await message.channel.send({
      content: `<@${message.member?.user.id}> ${data.choices[0].text}`,
    });

    return;
  } catch (error) {
    await message.channel.send({
      content: `<@${message.member?.user.id}> I'm very sorry, I can't answer your question right now. I'm a little bit busy. Could you please ask it again later? Thank you!`,
    });
  }
}
