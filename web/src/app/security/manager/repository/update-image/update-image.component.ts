import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { RepositoryService } from '../../../../services/repository/repository.service';
import { WorkService } from '../../../../services/work/work.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.html',
  styleUrls: ['./update-image.css'],
})
export class UpdateImageComponent implements OnInit {

  image: any | null = null;

  isHome: boolean = false;
  works: { id: number, name: string }[] = [];
  selectedWorks: { id: number, name: string }[] = [];
  dataLoaded: boolean = false;

  constructor(
    private repositoryService: RepositoryService,
    private workService: WorkService,
    private toastr: ToastrService,
    private modalUpdate: MdbModalRef<UpdateImageComponent>,
  ) { }

  ngOnInit(): void {
    this.loadWorks();
  }

  loadWorks() {
    this.workService.getWorks().subscribe(
      (response: any) => {
        this.works = response.data.works.map((item: any) => {
          return {
            id: item.id,
            name: item.name
          };
        });

        this.loadPreselectedWorks();
      },
      error => {
        console.error('Error al obtener los trabajos', error);
      }
    );
  }

  loadPreselectedWorks() {
    if (this.image && this.image.works.length > 0) {
      // Obtener el id de la obra preseleccionada
      const preselectedWorkId = this.image.works[0].work.id;

      // Encontrar la obra preseleccionada en el arreglo de obras y seleccionarla
      const preselectedWork = this.works.find(work => work.id === preselectedWorkId);
      if (preselectedWork) {
        this.selectedWorks = [preselectedWork];
      }

      // Marcar los trabajos preseleccionados después de un pequeño retraso
      setTimeout(() => {
        this.selectedWorks.forEach(selectedWork => {
          const radio = document.getElementById('radio_' + selectedWork.id) as HTMLInputElement;
          if (radio) {
            radio.checked = true;
          }
        });
      }, 10);
    }

    if (this.image && this.image.homePosition !== null) {
      this.isHome = true;
    }
    this.dataLoaded = true;
  }

  isSelected(work: any): boolean {
    return this.selectedWorks.some(selectedWork => selectedWork.id === work.id);
  }

  toggleSelection(work: any): void {
    this.selectedWorks = [work];
  }


  close() {
    this.modalUpdate.close();
  }

  update() {

    this.repositoryService.updateImage(this.image, this.isHome, this.selectedWorks).subscribe(
      (response: any) => {

        this.showSuccess('Imagen actualizada con exito');
        setTimeout(() => {
          this.repositoryService.redirectTo('manager/repository');
          this.close();

        }, 500);
      },
      error => {

        // Interface for errors. Array made from keys that has string array.
        interface ErrorData {
          [field: string]: string[];
        }

        const errors: ErrorData = error.error.data;

        for (const field in errors) {

          const errorsArray = errors[field];
          for (const value of errorsArray) {
            let message = field + ': ' + value;
            this.showError(message);
          }
        }
      }
    );
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
}