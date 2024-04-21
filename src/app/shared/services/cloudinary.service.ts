import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  public readonly CLOUD_NAME = environment.CLOUDINARY_CLOUD_NAME

  public async uploadImage(file: File): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const uploadUrl = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/upload`

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'pt-24008')

      try {
        const resp = await fetch(uploadUrl, {
          method: 'POST',
          body: formData
        })

        if (!resp.ok) {
          throw new Error('Error uploading image')
        }

        const cloudinaryResponse = await resp.json()
        resolve(cloudinaryResponse.secure_url)
      } catch (error: any) {
        throw new Error(error)
      }
    })
  }
}
