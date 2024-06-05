import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityRoutingModule } from './security-routing.module';
;
import { UserLoginComponent } from './user-login/user-login.component';
import { PanelComponent } from './manager/panel/panel.component';

import { RouterModule } from '@angular/router';
import { NavBarComponent } from './manager/nav-bar/nav-bar.component';
import { HomepageRowComponent } from './manager/panel/homepage-row/homepage-row.component';
import { TimerComponent } from './manager/panel/homepage-row/timer/timer.component';
import { HomeImageCarouselComponent } from './manager/panel/homepage-row/home-image-carousel/home-image-carousel.component';
import { PostHomeImageComponent } from './manager/panel/homepage-row/timer/post-home-image/post-home-image.component';
import { ImageUploadComponent } from './manager/panel/image-upload/image-upload.component';
import { WorkpageRowComponent } from './manager/panel/workpage-row/workpage-row.component';
import { PostWorkImageComponent } from './manager/panel/workpage-row/worknewimage/post-work-image/post-work-image.component';
import { WorkNewImageComponent } from './manager/panel/workpage-row/worknewimage/worknewimage.component';
import { WorkImageCarouselComponent } from './manager/panel/workpage-row/work-image-carousel/work-image-carousel.component';
import { DeleteWorkComponent } from './manager/panel/workpage-row/delete-work/delete-work.component';
import { AddWorkComponent } from './manager/panel/workpage-row/add-work/add-work.component';
import { UpdateWorkComponent } from './manager/panel/workpage-row/update-work/update-work.component';
import { RepositoryComponent } from './manager/repository/repository.component';
import { ImageViewComponent } from './manager/panel/image-view/image-view.component';
import { ManagerComponent } from './manager/manager.component';
import { DeleteHomeImageComponent } from './manager/panel/homepage-row/home-image-carousel/delete-home-image/delete-home-image.component';
import { DeleteWorkImageComponent } from './manager/panel/workpage-row/work-image-carousel/delete-work-image/delete-work-image.component';
import { DeleteImageComponent } from './manager/repository/delete-image/delete-image.component';
import { UpdateImageComponent } from './manager/repository/update-image/update-image.component';

@NgModule({
  declarations: [
    UserLoginComponent,
    PostHomeImageComponent,
    NavBarComponent,
    ImageUploadComponent,
    HomepageRowComponent,
    TimerComponent,
    ImageViewComponent,
    WorkpageRowComponent,
    PostWorkImageComponent,
    DeleteWorkComponent,
    AddWorkComponent,
    UpdateWorkComponent,
    WorkNewImageComponent,
    PanelComponent,
    RepositoryComponent,
    PanelComponent,
    ManagerComponent,
    DeleteHomeImageComponent,
    DeleteWorkImageComponent,
    DeleteImageComponent,
    UpdateImageComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DragDropModule,
    WorkImageCarouselComponent,
    HomeImageCarouselComponent,
    SecurityRoutingModule,
  ]
})
export class SecurityModule { }
