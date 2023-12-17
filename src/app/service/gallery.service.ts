import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  async createBucketPhoto() {
    const { data, error } = await this.supabase.storage.createBucket('photos');
    return { data, error };
  }

  async getBucketPhoto() {
    const { data, error } = await this.supabase.storage.getBucket('photos');
    return { data, error };
  }

  async upload(bucket: string, path: string, file: File) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file);
    return { data, error };
  }

  async download(bucket: string, path: string) {
    const { data } = await this.supabase.storage.from(bucket).list(path);

    return { data };
  }
}
