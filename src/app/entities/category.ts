export class Category {
  name: string;
  description: string;

  constructor(jsonData: any) {
    this.name = jsonData.name;
    this.description = jsonData.description;
  }
}
