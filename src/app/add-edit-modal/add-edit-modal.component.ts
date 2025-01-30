import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddEditModalComponent {
  @Input() selectedQA: any;
  @Output() close = new EventEmitter<any>();
  qaForm: FormGroup;

  constructor(private fb: FormBuilder, private questionService: QuestionService) {
    this.qaForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.selectedQA) {
      this.qaForm.patchValue(this.selectedQA);
    }
  }

  save(): void {
    if (this.qaForm.valid) {
      const data = this.qaForm.value;
      if (this.selectedQA) {
        this.questionService.updateQuestion(this.selectedQA.id, data).subscribe(() => {
          this.close.emit({ refresh: true });
        });
      } else {
        this.questionService.addQuestion(data).subscribe(() => {
          this.close.emit({ refresh: true });
        });
      }
    }
  }

  closeModal(): void {
    this.close.emit({ refresh: false });
  }
}