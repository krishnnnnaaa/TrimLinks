import { Url } from "@/model/User";

export interface ApiResponse{
    success:boolean,
    message: string,
    url?: Array<Url>
}