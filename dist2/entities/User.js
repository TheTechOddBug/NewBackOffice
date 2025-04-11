var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
let User = class User extends BaseEntity {
    name;
    username;
    password;
    email;
};
__decorate([
    IsNotEmpty(),
    Column({ nullable: false })
], User.prototype, "name", void 0);
__decorate([
    IsNotEmpty(),
    Column({ nullable: false })
], User.prototype, "username", void 0);
__decorate([
    IsNotEmpty(),
    MinLength(6),
    Column({ nullable: false })
], User.prototype, "password", void 0);
__decorate([
    IsNotEmpty(),
    IsEmail(),
    Column({
        nullable: false,
        unique: true
    })
], User.prototype, "email", void 0);
User = __decorate([
    Entity("users"),
    Unique(["email"])
], User);
export { User };
