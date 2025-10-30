export interface Upload {
   _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export interface AdminState {
  uploads: Upload[];
  loading: boolean;
  error: string | null;
}

export interface UploadPayload {
  image: File;
  title: string;
  price: number;
}

export interface UpdatePayload {
  id: string;
  image?: File;
  title?: string;
  price?: number;
}
