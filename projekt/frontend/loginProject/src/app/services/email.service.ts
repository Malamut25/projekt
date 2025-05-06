import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000';
  private predefinedRecipient = 'hegyitibor52@gmail.com';
  private messageCounter = 1; // Counter for message numbers

  constructor(private http: HttpClient) { }

  /**
   * Sends email with auto-incremented message number
   * @param userSubject Subject entered by user (optional)
   * @param message Email body content
   * @param files Array of files to attach
   */
  sendPredefinedEmailWithAttachments(userSubject: string, message: string, files: File[]) {
    const subject = `#${this.messageCounter++} ${userSubject || 'Message from contact form'}`;
    
    const formData = new FormData();
    formData.append('to', this.predefinedRecipient);
    formData.append('subject', subject);
    formData.append('text', message);
    
    files.forEach(file => {
      formData.append('attachments', file, file.name);
    });

    return this.http.post(`${this.apiUrl}/send-email-with-attachments`, formData).toPromise();
  }

  /**
   * Gets the current message count (for display purposes)
   */
  getCurrentMessageNumber(): number {
    return this.messageCounter;
  }
}