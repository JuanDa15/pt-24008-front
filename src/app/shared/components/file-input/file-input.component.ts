import { Component, Input, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { FormHelperService } from '@shared/services/form-helper.service';
import { NotificationHandlerService } from '@shared/services/notification-handler.service';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [ReactiveFormsModule, MatError],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss'
})
export class FileInputComponent {
  public notification = inject(NotificationHandlerService)
  public fh = inject(FormHelperService)
  public validTypes = ['image/png', 'image/jpeg', 'image/jpg']
  public base64: string | null = null

  @Input({ required: true }) control!: FormControl;

  public async onChange(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    const target = event.target as HTMLInputElement
    const files = target.files

    if (files?.length === 0) {
      target.value = ''
      this.base64 = null
      this.control.markAllAsTouched()
      return;
    }

    if (!this.validTypes.includes(files![0].type)) {
      this.notification.createNotification({
        message: `Invalid file type, allowed types: ${this.validTypes.join(', ')}`,
        type: 'error'
      })
      this.base64 = null
      target.value = '';
      this.control.markAllAsTouched()
      return;
    }

    this.base64 = await this.fileToBase64(files![0])
    this.control.setValue(files![0])
  }

  public fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (!reader.result) return reject('Error')
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
}
