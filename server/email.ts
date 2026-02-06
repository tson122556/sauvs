import nodemailer from 'nodemailer';

// 配置邮件服务
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface AppointmentEmailData {
  email: string;
  name: string;
  consultationType: string;
  appointmentDate: string;
  appointmentTime: string;
  phone: string;
}

/**
 * 发送预约确认邮件
 */
export async function sendAppointmentConfirmationEmail(data: AppointmentEmailData) {
  const { email, name, consultationType, appointmentDate, appointmentTime, phone } = data;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">预约确认</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px;">感谢您选择极紫星智慧科技</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
        <p style="color: #333; font-size: 16px;">尊敬的 ${name}，</p>
        
        <p style="color: #666; line-height: 1.6;">
          感谢您预约我们的咨询服务。我们已收到您的预约申请，以下是您的预约信息：
        </p>
        
        <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 10px 0;"><strong>咨询类型：</strong> ${consultationType}</p>
          <p style="margin: 10px 0;"><strong>预约日期：</strong> ${appointmentDate}</p>
          <p style="margin: 10px 0;"><strong>预约时间：</strong> ${appointmentTime}</p>
          <p style="margin: 10px 0;"><strong>联系电话：</strong> ${phone}</p>
          <p style="margin: 10px 0;"><strong>邮箱：</strong> ${email}</p>
        </div>
        
        <p style="color: #666; line-height: 1.6;">
          我们的团队将在 24 小时内与您联系，确认最终的咨询时间。如有任何疑问，请随时与我们联系。
        </p>
        
        <div style="background: #f0f4ff; padding: 15px; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 0; color: #667eea; font-size: 14px;">
            <strong>联系方式：</strong><br>
            电话：+86 15193876647<br>
            邮箱：contact@jizixing.com
          </p>
        </div>
        
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
          © 2026 西安极紫星智慧科技有限公司。保留所有权利。
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@jizixing.com',
      to: email,
      subject: '预约确认 - 极紫星智慧科技',
      html: htmlContent,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send appointment confirmation email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * 发送预约提醒邮件
 */
export async function sendAppointmentReminderEmail(data: AppointmentEmailData) {
  const { email, name, consultationType, appointmentDate, appointmentTime } = data;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">预约提醒</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
        <p style="color: #333; font-size: 16px;">尊敬的 ${name}，</p>
        
        <p style="color: #666; line-height: 1.6;">
          这是您预约咨询的提醒。我们将在以下时间与您进行 ${consultationType} 咨询：
        </p>
        
        <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 10px 0;"><strong>日期：</strong> ${appointmentDate}</p>
          <p style="margin: 10px 0;"><strong>时间：</strong> ${appointmentTime}</p>
        </div>
        
        <p style="color: #666; line-height: 1.6;">
          如需更改或取消预约，请提前 24 小时与我们联系。
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@jizixing.com',
      to: email,
      subject: '预约提醒 - 极紫星智慧科技',
      html: htmlContent,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send appointment reminder email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
