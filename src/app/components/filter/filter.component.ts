import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { ThemeService } from '../../services/theme.service';
import { SubthemeService } from '../../services/subtheme.service';
import { CategoryService } from '../../services/category.service'; // Import CategoryService

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Add FormsModule here
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  themes: any[] = [];
  subThemes: any[] = [];
  categories: any[] = [];
  selectedTheme: number | null = null; // Ensure correct type
  selectedSubTheme: number | null = null;
  selectedCategory: number | null = null;

  @Output() filterChange = new EventEmitter<any>();

  constructor(
    private themeService: ThemeService,
    private subThemeService: SubthemeService,
    private categoryService: CategoryService // Inject CategoryService
  ) { }

  ngOnInit() {
    this.loadThemes();
  }

  loadThemes() {
    this.themeService.getThemes().subscribe((data) => {
      this.themes = data;
    });
  }

  onThemeChange(themeId: number) {
    this.selectedSubTheme = null; // Reset sub-theme on theme change
    this.selectedCategory = null; // Reset category on theme change
    this.subThemes = []; // Clear sub-themes
    this.categories = []; // Clear categories

    if (themeId) {
      this.subThemeService.getSubThemesByThemeId(themeId).subscribe((data) => {
        this.subThemes = data;
      });
    }
  }

  onSubThemeChange(subThemeId: number) {
    this.selectedCategory = null; // Reset category on sub-theme change
    this.categories = []; // Clear categories

    if (subThemeId) {
      this.categoryService.getCategoriesBySubThemeId(subThemeId).subscribe((data) => {
        this.categories = data;
      });
    }
  }

  applyFilter() {
    this.filterChange.emit({
      theme: this.selectedTheme,
      subTheme: this.selectedSubTheme,
      category: this.selectedCategory,
    });
  }
}