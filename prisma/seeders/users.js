
async function main(prisma) {
    await prisma.users.createMany({
        data: [
            { username: 'adamg', email: 'v.adam.gonzales@gmail.com', userType: 'ADMIN', password: '$2a$10$37ieBVq0ZgSstM0J1KQJEeZliQIldgBxph7YdrlkdJYRxOGd9XBQe', fname: 'Victor Adam', lname: 'Gonzales', departmentId: 'bc1f2cc3-4b44-456a-b26e-15a7bdb220a9' },
            { username: 'reniel', email: 'arkadata@gmail.com', userType: 'UTIL', password: '$2a$10$cBc39UvdixOKSiTGJ8F9O.9MiUf6vn8dxGDfs2c6ARgNHj1sc2s6a', fname: 'Reniel', lname: 'Atibagos', departmentId: 'bc1f2cc3-4b44-456a-b26e-15a7bdb220a9' },
            { username: 'royal', email: 'ryo_alcantara@gmail.com', userType: 'USER', password: '$2a$10$.up/gHK4c.YCVTqHZmQOv.tSZq1XbmGXCwVXKBc3c2qvQp7XUWZ5y', fname: 'Roy', lname: 'Alcantara', departmentId: 'e0d6241d-e813-4662-bbd4-fc89a282221d' },
        ],
        skipDuplicates: true
    })
}

module.exports = main;