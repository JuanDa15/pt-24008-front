import { ProductService } from '@API/product/product.service';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, ProductDTO } from '@interfaces/product/product';
import { ServerResponse } from '@interfaces/shared.interface';
import { FileInputComponent } from '@shared/components/file-input/file-input.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { CloudinaryService } from '@shared/services/cloudinary.service';
import { FormHelperService } from '@shared/services/form-helper.service';
import { NotificationHandlerService } from '@shared/services/notification-handler.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FileInputComponent, MatIconModule, MatButtonModule, RouterLink, MatTooltipModule, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  public fb = inject(FormBuilder)
  public fh = inject(FormHelperService)
  public ar = inject(ActivatedRoute)
  public productService = inject(ProductService)
  public router = inject(Router)
  public cloudinaryService = inject(CloudinaryService)
  public notification = inject(NotificationHandlerService)

  public isEditView = signal(false)
  public productID = signal<string | null>(null)

  public form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    image: ['', Validators.required]
  })

  ngOnInit(): void {
    const { id } = this.ar.snapshot.params

    if (id) {
      this.isEditView.set(true)
      this.productID.set(id)
      this.fetchProduct(this.productID()!)
      return;
    }
  }

  public fetchProduct(id: string): void {
    this.productService.detail<ServerResponse<Product>>(id).subscribe({
      next: ({ data }) => {
        if (!data) return;
        this.form.patchValue({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          image: data.image
        })
      },
      error: () => {
        this.router.navigateByUrl('/app/product/list')
      }
    })
  }

  public submit(): void | Promise<void> {
    if (this.form.invalid) return this.form.markAllAsTouched()

    const body = this.form.value as unknown as ProductDTO
    if (!this.isEditView()) return this.create(body);
    if (this.isEditView()) return this.update(body);
  }

  public async update(body: ProductDTO): Promise<void> {
    let newUrl = null;
    if (typeof this.form.value.image !== 'string') {
      newUrl = await this.cloudinaryService.uploadImage(this.form.value.image as unknown as File)
    }

    this.productService.update<ProductDTO, ServerResponse<Product>>(this.productID()!, {
      ...body,
      image: newUrl || this.form.value.image!
    }).subscribe({
      next: ({ message }) => {
        this.notification.createNotification({
          message,
          type: 'success'
        })
        this.router.navigateByUrl('/app/product/list')
      }
    })
  }

  public async create(body: ProductDTO): Promise<void> {
    const url = await this.cloudinaryService.uploadImage(this.form.value.image as unknown as File)

    this.productService.create<ProductDTO, ServerResponse<Product>>({ ...body, image: url }).subscribe({
      next: ({ message }) => {
        this.notification.createNotification({
          message,
          type: 'success'
        })
        this.router.navigateByUrl('/app/product/list')
      }
    })
  }

  public deleteProduct() {
    this.productService.remove(this.productID()!).subscribe({
      next: () => {
        this.router.navigateByUrl('/app/product/list')
      }
    })
  }
}
