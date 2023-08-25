export interface ImageInformationRequest {
  filename?: string;
  width?: string;
  height?: string;
}

export interface ImageInformation {
  filename: string;
  width: number;
  height: number;
}
