export interface IMenu {
  title: string;
  imagePath: string;
  dishes: IDish[];
}
export interface IDish {
  name: string;
  description: string;
  sek: number;
}
