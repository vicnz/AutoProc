
async function main(prisma) {
    await prisma.users.createMany({
        data: [
            { username: 'adamg', email: 'v.adam.gonzales@gmail.com', userType: 'ADMIN', password: '$2a$10$37ieBVq0ZgSstM0J1KQJEeZliQIldgBxph7YdrlkdJYRxOGd9XBQe', fname: 'Victor Adam', lname: 'Gonzales', departmentId: 'bc1f2cc3-4b44-456a-b26e-15a7bdb220a9' },
            { username: 'reniel08', email: 'arkadata@gmail.com', userType: 'TRACKER', password: '$2a$10$cBc39UvdixOKSiTGJ8F9O.9MiUf6vn8dxGDfs2c6ARgNHj1sc2s6a', fname: 'Reniel', lname: 'Atibagos' },
            { username: 'royal', email: 'ryo_alcantara@gmail.com', userType: 'USER', password: '$2a$10$.up/gHK4c.YCVTqHZmQOv.tSZq1XbmGXCwVXKBc3c2qvQp7XUWZ5y', fname: 'Roy', lname: 'Alcantara', departmentId: 'e0d6241d-e813-4662-bbd4-fc89a282221d' },
            { username: 'adamg09', email: 'gonzales.v.adam@outlook.com', userType: 'USER', password: '$2a$10$.up/gHK4c.YCVTqHZmQOv.tSZq1XbmGXCwVXKBc3c2qvQp7XUWZ5y', fname: 'Victor Adam', mname: 'Salengua', lname: 'Gonzales', departmentId: 'bc1f2cc3-4b44-456a-b26e-15a7bdb220a9' },
            { username: 'johndoe23', email: 'johndoe@appleseed.com', userType: 'USER', password: '$2a$10$.up/gHK4c.YCVTqHZmQOv.tSZq1XbmGXCwVXKBc3c2qvQp7XUWZ5y', fname: 'John', lname: 'Doe', departmentId: 'c92cd135-391a-45a9-a396-1219a71bd174' },
        ]
    })
}

module.exports = main;