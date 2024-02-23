import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
        user: 'kbpapplication@gmail.com',
        pass: 'vufzzpluzpfzkiah',
    },
});

export async function POST(request) {
    const payload = await request.json();
    const email = payload.email;
    const key = payload.key;

    const info = await transporter.sendMail({
        from: 'kbpapplication@gmail.com',
        to: email,
        subject: "Your Technoholic Competition Code",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html dir="ltr" lang="en">
        
          <head>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
          </head>
          <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Your Technoholic Competition Code<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
          </div>
        
          <body style="background-color:#ffffff;margin:0 auto;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:0px 20px">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
                      <tbody>
                        <tr>
                          <td><img alt="Slack" height="36" src="https://firebasestorage.googleapis.com/v0/b/technoholic-a14a8.appspot.com/o/logo%2FkbpEmail-Photoroom.png-Photoroom.png?alt=media&token=19a873fd-8ef1-4706-8154-e7a7b4bc7731" style="display:block;outline:none;border:none;text-decoration:none" width="120" /></td>
                        </tr>
                      </tbody>
                    </table>
                    <h1 style="color:#1d1c1d;font-size:36px;font-weight:700;margin:30px 0;padding:0;line-height:42px">Congratulations! You have successfully registered for the Technoholic competition.</h1>
                    <p style="font-size:20px;line-height:28px;margin:16px 0;margin-bottom:30px">Your competition code is below. Use this code to access the competition and showcase your skills.</p>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background:rgb(245, 244, 245);border-radius:4px;margin-bottom:30px;padding:40px 10px">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:30px;line-height:24px;margin:16px 0;text-align:center;vertical-align:middle">${key}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="font-size:14px;line-height:24px;margin:16px 0;color:#000">If you want to edit your submitted form response, use the above code to make any necessary changes.</p>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:32px;padding-left:8px;padding-right:8px;width:100%">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td data-id="__react-email-column" style="width:66%"><img alt="Slack" height="36" src="https://firebasestorage.googleapis.com/v0/b/technoholic-a14a8.appspot.com/o/logo%2FkbpEmail-Photoroom.png-Photoroom.png?alt=media&token=19a873fd-8ef1-4706-8154-e7a7b4bc7731" style="display:block;outline:none;border:none;text-decoration:none" width="120" /></td>
                                  <td data-id="__react-email-column">
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                              <tbody style="width:100%">
                                                <tr style="width:100%">
                                                  <td data-id="__react-email-column"><a href="/" style="color:#067df7;text-decoration:none" target="_blank"><img alt="Slack" height="32" src="https://react-email-demo-7s5r0trkn-resend.vercel.app/static/slack-twitter.png" style="display:inline;outline:none;border:none;text-decoration:none;margin-left:32px" width="32" /></a></td>
                                                  <td data-id="__react-email-column"><a href="https://www.facebook.com/kbpdegreecollegethane" style="color:#067df7;text-decoration:none" target="_blank"><img alt="Slack" height="32" src="https://react-email-demo-7s5r0trkn-resend.vercel.app/static/slack-facebook.png" style="display:inline;outline:none;border:none;text-decoration:none;margin-left:32px" width="32" /></a></td>
                                                  <td data-id="__react-email-column"><a href="https://www.linkedin.com/school/adarsh-vikas-mandal-karmaveer-bhaurao-patil-college-of-arts-and-commerce-wagale-estate-thane-w/" style="color:#067df7;text-decoration:none" target="_blank"><img alt="Slack" height="32" src="https://react-email-demo-7s5r0trkn-resend.vercel.app/static/slack-linkedin.png" style="display:inline;outline:none;border:none;text-decoration:none;margin-left:32px" width="32" /></a></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td><p style="font-size:12px;line-height:15px;margin:16px 0;color:#b7b7b7;text-align:left;margin-bottom:50px">All rights reserved.</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
        
        </html>`,
    });
{/* <a href="https://www.kbpcollegethane.net/" rel="noopener noreferrer" style="color:#b7b7b7;text-decoration:underline" target="_blank">Our website</a>   |   <a href="https://slack.com/legal" rel="noopener noreferrer" style="color:#b7b7b7;text-decoration:underline" target="_blank">Policies</a>   |   <a href="https://slack.com/help" rel="noopener noreferrer" style="color:#b7b7b7;text-decoration:underline" target="_blank">Help center</a>   |   <a href="https://slack.com/community" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="6" style="color:#b7b7b7;text-decoration:underline" target="_blank">Slack Community</a>
                            // <p style="font-size:12px;line-height:15px;margin:16px 0;color:#b7b7b7;text-align:left;margin-bottom:50px">©2022 Slack Technologies, LLC, a Salesforce company. <br />500 Howard Street, San Francisco, CA 94105, USA <br /> */}
    console.log("Message sent: %s", info.messageId);

    if (!payload.name || !payload.email || !payload.key) {
        return NextResponse.json({ result: " not found", success: false }, { status: 400 })
    } else {
        return NextResponse.json({ result: " Success", success: true }, { status: 201 })
    }
}