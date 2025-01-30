import { Component, EventEmitter, Output } from '@angular/core';
import { QuestionService } from '../../services/question.service';
@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  standalone: true,
})
export class UploadModalComponent {
  @Output() close = new EventEmitter<void>();
  file: File | null = null;

  constructor(private questionService: QuestionService) { }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  uploadFile(): void {
    if (this.file) {
      this.questionService.importFromExcel(this.file).subscribe(() => {
        alert('File uploaded successfully!');
        this.close.emit();
      });
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
