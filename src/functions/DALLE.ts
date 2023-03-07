import { Message } from "discord.js";
import axios, { AxiosError } from "axios";
import fs from "fs";

export default async function(message: Message): Promise<void> {
  await message.channel.sendTyping();

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY as string}`,
    },
  };

  const payload = {
    prompt: message.content,
    size: "512x512",
    response_format: "b64_json",
    user: message.author.username,
  };

  try {
    const { data } = await axios.post(
      "https://api.openai.com/v1/images/generations",
      payload,
      config
    );

    const base64Data = data.data[0].b64_json;
    fs.writeFile(`src/temp/${message.author.id}-${data.created}.png`, base64Data, { encoding: 'base64' }, function(err) {
      if (err) {
        console.log(err);
      }
    });

    await message.channel.send({
      content: `<@${message.member?.user.id}>`,
      files: [
        {
          attachment: `src/temp/${message.author.id}-${data.created}.png`,
        },
      ],
    });

    return;
  } catch (error) {
    console.log(error);

    await message.channel.send({
      content: `<@${message.author.id}> I'm very sorry, I can't answer your question right now. I'm a little bit busy. Could you please ask it again later? Thank you!`,
    });
  }
}
