import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export const sendNoReplyEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"No Reply" <${process.env.NO_REPLY_EMAIL}>`,
      to,
      subject,
      text,
      html
    })

    console.log(`Email sent: ${info.messageId}`)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
export const sendEmailWithTemplate = async (
  to: string,
  username: string,
  verificationLink: string,
  template: string
) => {
  let emailTemplate = fs.readFileSync(path.join(__dirname, `../html/${template}-template.html`), 'utf8')
  const currentYear = new Date().getFullYear()
  // Replace placeholders with real values
  emailTemplate = emailTemplate
    .replace('{USERNAME}', username)
    .replace('{VERIFICATION_LINK}', verificationLink)
    .replace('{YEAR}', currentYear.toString())

  await sendNoReplyEmail(to, `Verify Your ${template}`, 'Please verify your info by clicking the link.', emailTemplate)
}
