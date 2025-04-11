var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
let Product = class Product extends BaseEntity {
    name;
    price;
};
__decorate([
    Column({ type: "varchar" }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Column({ type: "numeric" }),
    IsNumber(),
    IsPositive(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
Product = __decorate([
    Entity({ name: "products" })
], Product);
export { Product };
