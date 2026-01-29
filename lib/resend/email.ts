import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ name, email, subject, url, htmlTemplate }: SendEmailValues) => {
    const html = htmlTemplate
        .replace('{{name}}', name)
        .replace('{{url}}', url)
        .replace('{{expiresIn}}', '1 hour')


    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject,
            html,
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to send password reset email:", error);
        return { success: false, error: "Failed to send password reset email" };
    }
};

