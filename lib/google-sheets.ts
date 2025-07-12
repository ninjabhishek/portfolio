interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  // Google Sheets API integration
  const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || process.env.GOOGLE_SHEETS_URL;
  
  if (!GOOGLE_SHEETS_URL) {
    throw new Error("Google Sheets URL not configured");
  }

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("subject", data.subject);
  formData.append("message", data.message);
  formData.append("timestamp", new Date().toISOString());

  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Optional: Send email notification via Google Apps Script
    const EMAIL_NOTIFICATION_URL = import.meta.env.VITE_EMAIL_NOTIFICATION_URL || process.env.EMAIL_NOTIFICATION_URL;
    
    if (EMAIL_NOTIFICATION_URL) {
      await fetch(EMAIL_NOTIFICATION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "engineer@mastercard.com",
          subject: `Portfolio Contact: ${data.subject}`,
          body: `
            New contact form submission:
            
            Name: ${data.name}
            Email: ${data.email}
            Subject: ${data.subject}
            
            Message:
            ${data.message}
            
            Timestamp: ${new Date().toLocaleString()}
          `,
        }),
      });
    }
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
}
