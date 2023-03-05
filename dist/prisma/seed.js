"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const falso_1 = require("@ngneat/falso");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Start seeding ...`);
        for (let i = 0; i < 1000; i++) {
            let address = (0, falso_1.randAddress)();
            let item = {
                id: (0, falso_1.randUuid)(),
                name: (0, falso_1.randFullName)(),
                password: (0, falso_1.randPassword)(),
                password2: (0, falso_1.randPassword)(),
                username: (0, falso_1.randUserName)(),
                email: (0, falso_1.randEmail)(),
                phone: (0, falso_1.randPhoneNumber)(),
                addressStreet: String(address.street),
                city: String(address.city),
                zipCode: String(address.zipCode),
                county: String(address.county),
                country: String(address.country)
            };
            const group = yield prisma.user.create({
                data: item,
            });
        }
        console.log(`Seeding finished.`);
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
