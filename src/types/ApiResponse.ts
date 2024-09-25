export interface Url {
    shortId: string; // Ensure this matches the API response structure
    // Add other properties as necessary
  }

export interface ApiResponse{
    success:boolean,
    message: string,
    url?: Url
}