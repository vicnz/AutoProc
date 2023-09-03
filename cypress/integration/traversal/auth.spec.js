//@ts-ignore

describe("First E2E Test", () => {
    it("Load Page", () => {
        cy.visit("http://localhost:3000/")
    })
})