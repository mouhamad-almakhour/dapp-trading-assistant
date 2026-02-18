import { sendWelcomeEmail } from "../resend/email";
import { WELCOME_EMAIL_TEMPLATE } from "../resend/templates";
import { inngest } from "./client";
import { WELCOME_EMAIL_PROMPT } from "./prompts/welcome.prompt";

export const sendSignUpEmail = inngest.createFunction(
  { id: "send-sign-up-email" },
  { event: "app/user.signup" },
  async ({ event, step }) => {
    const { name, email, url } = event.data;

    // STEP 1 — AI generate intro
    const userProfile = `Name: ${name}`;
    const prompt = WELCOME_EMAIL_PROMPT.replace("{{userProfile}}", userProfile);

    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({
        model: "gemini-3-flash-preview",
      }),
      body: {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
    });

    // STEP 2 — Send email
    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Welcome to our platform!";
      const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name)
        .replace("{{intro}}", introText)
        .replace("{{url}}", url);

      return await sendWelcomeEmail({
        email,
        htmlTemplate,
      });
    });

    return {
      success: true,
      message: "Welcome email sent successfully",
    };
  },
);
