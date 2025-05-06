import { Component } from '@angular/core';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-general-email-form',
  templateUrl: './general-email-form.component.html',
  styleUrls: ['./general-email-form.component.css']
})
export class GeneralEmailFormComponent {
  subject = '';
  message = '';
  files: File[] = [];
  filePreviews: {name: string, url: string, type: string}[] = [];
  isSending = false;
  sendStatus = '';
  statusClass = '';
  localStorage:any
  constructor(private emailService: EmailService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach(file => {
        this.files.push(file);
        this.generateFilePreview(file);
      });
      input.value = '';
    }
  }

  private generateFilePreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.filePreviews.push({
        name: file.name,
        url: e.target.result,
        type: file.type.split('/')[0]
      });
    };
    reader.readAsDataURL(file);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.filePreviews.splice(index, 1);
  }

  truncateFileName(name: string, limit: number = 20): string {
    return name.length > limit ? name.substring(0, limit) + '...' : name;
  }

  async onSubmit() {
    if (!this.message) {
      this.showStatus('Please enter a message', 'error');
      return;
    }

    this.isSending = true;
    this.showStatus('Email Küldése...', 'sending');

    try {
      await this.emailService.sendPredefinedEmailWithAttachments(
        this.subject,
        this.message,
        this.files
      );
      this.showStatus('Email sikeresen elküldve!', 'success');
      this.resetForm();
    } catch (error) {
      console.error('Error sending email:', error);
      this.showStatus('Hiba az email köldésekor. Próbálkoz vele később.', 'error');
    } finally {
      this.isSending = false;
    }
  }

  private resetForm() {
    this.subject = '';
    this.message = '';
    this.files = [];
    this.filePreviews = [];
  }

  private showStatus(message: string, type: string) {
    this.sendStatus = message;
    this.statusClass = type;
  }
}