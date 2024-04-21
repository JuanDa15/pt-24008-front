import { ProductService } from '@API/product/product.service';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductDTO } from '@interfaces/product/product';
import { ServerResponse } from '@interfaces/shared.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  public fb = inject(FormBuilder)
  public ar = inject(ActivatedRoute)
  public productService = inject(ProductService)
  public router = inject(Router)

  public isEditView = signal(false)
  public productID = signal<string | null>(null)

  public form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]]
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
          stock: data.stock
        })
      }
    })
  }

  public submit(): void {
    if (this.form.invalid) return this.form.markAllAsTouched()

    if (!this.isEditView()) return this.create();
    if (this.isEditView()) return this.update();
  }

  public update(): void {
    const body = this.form.value as ProductDTO
    this.productService.update(this.productID()!, body).subscribe({
      next: () => {
        this.router.navigateByUrl('/app/product/list')
      }
    })
  }

  public create(): void {
    const body = this.form.value as ProductDTO

    this.productService.create<ProductDTO, ServerResponse<Product>>(body).subscribe({
      next: () => {
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
