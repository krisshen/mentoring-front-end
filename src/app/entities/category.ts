export class Category {
  id: string;
  name: string;
  description: string;

  constructor(jsonData: any) {
    this.id = jsonData.id;
    this.name = jsonData.name;
    this.description = jsonData.description;
  }
}
