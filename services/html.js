export const htmlCode = (resetCode) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Forgot Password</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        body {
          font-family: 'Helvetica', Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          text-align: center;
        }
        table {
          width: 100%;
          max-width: 600px;
          margin: 30px auto;
          border: 0;
        }
        .email-container {
          background-color: #ffffff;
          padding: 40px 30px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background-color: #007bff;
          color: #ffffff;
          padding: 40px 30px;
          font-size: 28px;
          font-weight: 600;
          border-radius: 10px 10px 0 0;
        }
        .email-body {
          font-size: 16px;
          color: #333;
          line-height: 1.6;
          padding: 20px;
        }
        .reset-code {
          font-size: 20px;
          font-weight: bold;
          color: #007bff;
          margin: 20px 0;
        }
        .cta-button {
          background-color: #28a745;
          color: #ffffff;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 5px;
          font-size: 18px;
          display: inline-block;
          margin-top: 20px;
        }
        .email-footer {
          padding: 10px 0;
          font-size: 14px;
          color: #777;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        @media (max-width: 600px) {
          .email-container {
            padding: 20px;
          }
          .email-header {
            font-size: 24px;
            padding: 30px 20px;
          }
          .cta-button {
            padding: 12px 20px;
            font-size: 16px;
          }
        }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <td>
            <div class="email-container">
              <div class="email-header">
                Forgot Your Password?
              </div>
              <div class="email-body">
                <p>Hello,</p>
                <p>We received a request to reset your password. To proceed, use the following code:</p>
                <p class="reset-code">${resetCode}</p>
                <p>If you did not request this password reset, please ignore this email.</p>
                <p>If the code does not work, you can use this link to reset your password:</p>
                <p><a href="https://yourlink.com/reset?code=${resetCode}" target="_blank" class="cta-button">Reset Your Password</a></p>
              </div>
              <div class="email-footer">
                <p>Cheers,</p>
                <p>YourApp Team</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
