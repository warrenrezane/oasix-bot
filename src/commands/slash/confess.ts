import {
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  TextChannel,
  EmbedBuilder,
  ComponentType,
  ButtonBuilder,
  ButtonStyle,
  CommandInteractionOptionResolver,
  CommandInteraction,
  Message,
} from "discord.js";
import { QuickDB } from "quick.db";
import { SlashCommand } from "../../interfaces/SlashCommand";

export const Confess: SlashCommand = {
  name: "confess",
  description: "Submit or reply to a confession.",
  usage:
    "/confess submit [confession] or /confess reply [confession_id] [reply] or /confess report [confession_id] [reason]",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["SendMessages"],
  options: [
    {
      name: "submit",
      description: "Submit a confession to the confessions channel.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "confession",
          description: "The confession you want to submit.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: "reply",
      description: "Reply to a confession.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "confession",
          description: "The ID of confession you want to reply to.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "reply",
          description: "The reply you want to submit.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: "report",
      description: "Report a confession.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "confession",
          description: "The ID of confession you want to report.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "reason",
          description: "The reason why you want to report this confession.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],
  run: async (client, interaction, db) => {
    let message;

    const confessions = db.table("confessions");
    const count = (await confessions.all()).length;

    const confessions_banned_ids = db.table("confessions_banned_ids");
    const banned_user = await confessions_banned_ids.get(interaction.user.id);

    await interaction.deferReply();

    if (banned_user) {
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Prohibited Action!")
            .setDescription(
              "You've been banned for using the confession commands. Please contact the staff to process your appeal."
            )
            .setTimestamp(),
        ],
      });
    }

    switch (
      (interaction.options as CommandInteractionOptionResolver).getSubcommand()
    ) {
      case "submit":
        const confession = (
          interaction.options as CommandInteractionOptionResolver
        ).getString("confession");

        message = await handleConfessionSubmit(client, count, confession);

        await saveConfessionToDatabase(
          confessions,
          count,
          message,
          interaction
        );

        await announceToConfessionLogsChannel(
          client,
          count,
          interaction,
          confession,
          message
        );

        break;

      case "reply":
        const confessionMessageId = (
          interaction.options as CommandInteractionOptionResolver
        ).getString("confession");

        const reply = (
          interaction.options as CommandInteractionOptionResolver
        ).getString("reply");

        let confessionData: {
          message_id: string;
          user_id: string;
        } | null = await confessions.get(`${confessionMessageId}`);

        if (!confessionData) {
          return await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setTitle("Wrong Confession ID")
                .setDescription(
                  `Sorry, the confession ID you entered doesn't exist.`
                ),
            ],
          });
        }

        let { message_id, user_id } = confessionData;

        message = await handleConfessionReply(client, message_id, reply, count);

        await saveConfessionToDatabase(
          confessions,
          count,
          message,
          interaction
        );

        await announceToConfessionLogsChannel(
          client,
          count,
          interaction,
          reply,
          message
        );

        /**
         * Experimental Feature
         * Notify the user when someone replies to their confession.
         */
        const user = client.guilds.cache
          .get(process.env.GUILD_ID as string)
          ?.members.cache.get(user_id);

        if (typeof user === "undefined") return; // There should be a message here.

        user!.send({
          embeds: [
            new EmbedBuilder()
              .setColor("Random")
              .setTitle("Confession Reply")
              .setDescription(
                "Wow, it looks like someone has replied to your confession! 👀👀👀"
              ),
          ],
          components: [
            {
              type: ComponentType.ActionRow,
              components: [
                new ButtonBuilder()
                  .setURL(message.url)
                  .setLabel("Jump to confession!")
                  .setStyle(ButtonStyle.Link),
              ],
            },
          ],
        });

        break;

      case "report":
        const reportedConfessionMessageId = (
          interaction.options as CommandInteractionOptionResolver
        ).getString("confession");

        const reason = (
          interaction.options as CommandInteractionOptionResolver
        ).getString("reason");

        let reportedConfessionData: {
          message_id: string;
          user_id: string;
        } | null = await confessions.get(`${reportedConfessionMessageId}`);

        if (!reportedConfessionData) {
          return await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setTitle("Wrong Confession ID")
                .setDescription(
                  `Sorry, the confession ID you entered doesn't exist.`
                ),
            ],
          });
        }

        if (reportedConfessionData.user_id === interaction.user.id) {
          return await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setTitle("Error!")
                .setDescription(
                  `You cannot report yourself. Why would you do that though? Krazy.`
                ),
            ],
          });
        }

        announceToConfessionReportsChannel(
          client,
          interaction,
          reason,
          reportedConfessionData
        );

        return await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor("Green")
              .setTitle("Confession Report Submitted!")
              .setDescription(
                `Thank you for your report. We will take action to it, as soon as possible!`
              ),
          ],
        });

      default:
        break;
    }

    return await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("Green")
          .setTitle("Confession Submitted!")
          .setDescription(`Success! Your confession has been submitted.`),
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            new ButtonBuilder()
              .setURL(message?.url as string)
              .setLabel("Jump to confession!")
              .setStyle(ButtonStyle.Link),
          ],
        },
      ],
    });
  },
};

const confessionEmbedMessage = (count: number, confession: string | null) => {
  return [
    new EmbedBuilder()
      .setTitle(`Confession #${count + 1}`)
      .setDescription(`${confession}`)
      .setColor("Random")
      .setTimestamp(),
  ];
};

const handleConfessionSubmit = async (
  client: Client,
  count: number,
  confession: string | null
) => {
  return await (
    client.guilds.cache
      .get(process.env.GUILD_ID as string)
      ?.channels.cache.get(
        process.env.CONFESSION_CHANNEL_ID as string
      ) as TextChannel
  ).send({
    embeds: confessionEmbedMessage(count, confession),
  });
};

const handleConfessionReply = async (
  client: Client,
  message_id: string,
  reply: string | null,
  count: number
) => {
  let targetConfessionMessage = await (
    client.guilds.cache
      .get(process.env.GUILD_ID as string)
      ?.channels.cache.get(
        process.env.CONFESSION_CHANNEL_ID as string
      ) as TextChannel
  ).messages.fetch(message_id);

  return await targetConfessionMessage.reply({
    embeds: confessionEmbedMessage(count, reply),
  });
};

const saveConfessionToDatabase = async (
  confessions: QuickDB,
  count: number,
  message: Message,
  interaction: CommandInteraction
) => {
  return await confessions.set(`${count + 1}`, {
    message_id: message.id,
    user_id: interaction.user.id,
  });
};

const announceToConfessionLogsChannel = async (
  client: Client,
  count: number,
  interaction: CommandInteraction,
  confession: string | null,
  message: Message
) => {
  return await (
    client.guilds.cache
      .get(process.env.GUILD_ID as string)
      ?.channels.cache.get(
        process.env.CONFESSION_LOGS_CHANNEL_ID as string
      ) as TextChannel
  ).send({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Anonymous Confession (#${count + 1})`)
        .setDescription(`"${confession}"`)
        .addFields(
          {
            name: "**User**",
            value: `||${interaction.user.tag} (<@${interaction.user.id}>)||`,
          },
          { name: "**ID**", value: `||${interaction.user.id}||` },
          {
            name: "**Link**",
            value: `[Jump to confession](${message.url})`,
          }
        )
        .setColor("White")
        .setTimestamp(),
    ],
  });
};

const announceToConfessionReportsChannel = async (
  client: Client,
  interaction: CommandInteraction,
  reason: string | null,
  reportedConfessionData: { user_id: string; message_id: string }
) => {
  return await (
    client.guilds.cache
      .get(process.env.GUILD_ID as string)
      ?.channels.cache.get(
        process.env.CONFESSION_REPORTS_CHANNEL_ID as string
      ) as TextChannel
  ).send({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Confession Report`)
        .addFields(
          {
            name: "**From**",
            value: `${interaction.user.tag} (<@${interaction.user.id}>)`,
          },
          { name: "**Reason**", value: `"${reason}"` },
          {
            name: "**Reported User**",
            value: `<@${reportedConfessionData.user_id}>`,
            inline: true,
          },
          {
            name: "**Reported User's ID**",
            value: `${reportedConfessionData.user_id}`,
            inline: true,
          },
          {
            name: "**Reported Confession Link**",
            value: `[Jump to reported confession](https://discord.com/channels/${
              process.env.GUILD_ID as string
            }/${process.env.CONFESSION_CHANNEL_ID as string}/${
              reportedConfessionData.message_id
            })`,
          }
        )
        .setColor("Yellow"),
      new EmbedBuilder()
        .setDescription(
          `To ban this user from using confessions, use the following command:
          ` +
            "`?confessions-ban " +
            reportedConfessionData.user_id +
            "`" +
            `
          `
        )
        .setColor("Yellow")
        .setTimestamp(),
    ],
    components: [
      {
        type: ComponentType.ActionRow,
        components: [
          new ButtonBuilder()
            .setURL(
              `https://discord.com/channels/${process.env.GUILD_ID as string}/${
                process.env.CONFESSION_CHANNEL_ID as string
              }/${reportedConfessionData.message_id}`
            )
            .setLabel("Jump to reported confession!")
            .setStyle(ButtonStyle.Link),
        ],
      },
    ],
  });
};
