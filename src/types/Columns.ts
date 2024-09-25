import { TableMeta } from "@tanstack/react-table";

// Define your custom meta type extending the default one
export interface CustomTableMeta extends TableMeta<any> {
  useremail: string;
}
