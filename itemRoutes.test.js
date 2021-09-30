const request = require("supertest");

const app = require("./app");
let { items } = require("./fakeDb");

let db = require("./fakeDb")

const burrito = { name: "burrito", price: 5 };
const cheese = { name: "cheese", price: 3 }

beforeEach(function () {

    items.push({...burrito});
    items.push({...cheese});
});

afterEach(function () {
    items.splice(0, items.length);
    console.log("aftereach items:", items)
});


describe("GET /items", function () {
    it("Gets a shopping list", async function () {
        const resp = await request(app).get(`/items`);

        expect(resp.body).toEqual({ items: [
            { name: "burrito", price: 5 }, 
            { name: "cheese", price: 3 }
        ] });
    });
});

describe("POST /items", function () {
    it("Creates a new item on list", async function () {
        const resp = await request(app)
            .post(`/items`)
            .send({
                name: "chips",
                price: 3
            });
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            added: { name: "chips", price: 3 }
        });
    });
});

describe("PATCH /items/:name", function () {
    it("Updates a single item on list", async function () {
        const resp = await request(app)
            .patch(`/items/burrito`)
            .send({
                name: "taco"
            });
        expect(resp.body).toEqual({
            updated: { name: "taco", price: 5 }
        });
    });
});


describe("DELETE /items/:name", function () {
    it("Deletes a single item", async function () {
        console.log("62, items:", items)
        const resp = await request(app)
            .delete(`/items/burrito`);
        console.log("65, items:",items)
        expect(resp.body).toEqual({ message: "deleted" });
        expect(items.length).toEqual(1);
    });
});