export interface IDocs {
  id: string;
  file_name: string;
  file_path: string;
  size: string;
  type: string;
  ocr_status?: string;
  created_at: string;
  updated_at: string;
  rename?: boolean
}