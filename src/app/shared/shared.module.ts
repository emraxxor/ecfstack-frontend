import { DialogComponent } from './../component/ui/dialog.component';
import { PlaceholderDirective } from './../component/ui/placeholder.directive';
import { InputFileComponent } from './../component/ui/input.file.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../component/ui/image.component';

@NgModule({
  declarations: [
    ImageComponent,
    InputFileComponent,
    PlaceholderDirective,
    DialogComponent
  ],
  imports: [CommonModule],
  exports: [
    ImageComponent,
    InputFileComponent,
    PlaceholderDirective,
    DialogComponent,
    CommonModule
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule {}
