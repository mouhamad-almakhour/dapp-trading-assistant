export const RESET_PASSWORD_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Reset your password</title>

<style>
@media (prefers-color-scheme: dark) {
  body { background-color:#0a0e27 !important; }
  .card { background-color:#141d35 !important; border-color:#1e3a5f !important; }
  .title, .text { color:#f0f4f8 !important; }
  .muted { color:#cbd5e1 !important; }
}
</style>
</head>

<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%">
<tr>
<td align="center" style="padding:40px 16px;">

<table class="card" width="100%" style="max-width:620px;background:#ffffff;border-radius:10px;border:1px solid #e2e8f0;overflow:hidden;">

<!-- Header -->
<tr>
<td style="padding:28px 32px;">
<img src="https://res.cloudinary.com/dnlllum6x/image/upload/v1769701128/logo_k4zkma.png"
     width="140" alt="App logo" />
</td>
</tr>

<!-- Dashboard image -->
<tr>
<td>
<img src="https://res.cloudinary.com/dnlllum6x/image/upload/v1769701128/market-dashboard_tgqodt.png"
     width="100%" alt="Dashboard preview"
     style="display:block;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;" />
</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:32px;">
<h1 class="title" style="margin:0 0 12px;font-size:22px;color:#0a0e27;">
Reset your password
</h1>

<p class="text" style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569;">
Hi {{name}},<br><br>
We received a request to reset your password.
Click the button below to continue.
</p>

<a href="{{url}}"
style="display:block;background:#3b82f6;color:#ffffff;text-decoration:none;
padding:14px 18px;border-radius:8px;text-align:center;font-size:15px;">
Reset password
</a>

<p class="muted" style="margin-top:18px;font-size:13px;color:#475569;">
This link expires in {{expiresIn}}.<br>
If you didn’t request this, you can ignore this email.
</p>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>`;

export const VERIFY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Verify your email</title>

<style>
@media (prefers-color-scheme: dark) {
  body { background-color:#0a0e27 !important; }
  .card { background-color:#141d35 !important; border-color:#1e3a5f !important; }
  .title, .text { color:#f0f4f8 !important; }
  .muted { color:#cbd5e1 !important; }
}
</style>
</head>

<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%">
<tr>
<td align="center" style="padding:40px 16px;">

<table class="card" width="100%" style="max-width:620px;background:#ffffff;border-radius:10px;border:1px solid #e2e8f0;overflow:hidden;">

<!-- Header -->
<tr>
<td style="padding:28px 32px;">
<img src="https://res.cloudinary.com/dnlllum6x/image/upload/v1769701128/logo_k4zkma.png"
     width="140" alt="App logo" />
</td>
</tr>

<!-- Dashboard image -->
<tr>
<td>
<img src="https://res.cloudinary.com/dnlllum6x/image/upload/v1769701128/market-dashboard_tgqodt.png"
     width="100%" alt="Dashboard preview"
     style="display:block;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;" />
</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:32px;">
<h1 class="title" style="margin:0 0 12px;font-size:22px;color:#0a0e27;">
Verify your email
</h1>

<p class="text" style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569;">
Hi {{name}},<br><br>
Please confirm your email address to activate your account.
</p>

<a href="{{url}}"
style="display:block;background:#3b82f6;color:#ffffff;text-decoration:none;
padding:14px 18px;border-radius:8px;text-align:center;font-size:15px;">
Verify email
</a>

<p class="muted" style="margin-top:18px;font-size:13px;color:#475569;">
If you didn’t create this account, you can safely ignore this email.
</p>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>`;
