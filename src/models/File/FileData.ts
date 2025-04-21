export type FileDataApi = {
  location: string;
  originalname: string;
  filename: string;
};

export type FileData = {
  location: string;
};

export const normalizeFileData = (from: FileDataApi): FileData => ({
  location: from.location,
});
