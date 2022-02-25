import { Course } from "./course";

export class CartItem {

    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number;

    constructor(course: Course) {
        this.id = course.id;
        this.name = course.name;
        this.imageUrl = course.imageUrl;
        this.unitPrice = course.price;

        this.quantity = 1;
    }
}
