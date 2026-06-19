const axios = require('axios');
const { expect } = require('chai');
const Ajv = require('ajv');
const ajv = new Ajv();
const { createUserSchema } = require('../schemas/createUser.schema');

describe('POST Create Post - JSONPlaceholder API', () => {
    it('Harus berhasil membuat data baru dan struktur JSON Schema sesuai', async () => {
        const payload = {
            title: 'Belajar API Automation',
            body: 'Menggunakan Mocha, Axios, dan AJV Schema',
            userId: 1
        };

        // Mengirim request ke JSONPlaceholder (Bebas API Key)
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', payload);

        // 1. Validasi Status Code (201 Created)
        expect(response.status).to.equal(201);

        // 2. Validasi Data Respons yang dikirim
        expect(response.data.title).to.equal(payload.title);
        expect(response.data.body).to.equal(payload.body);
        expect(response.data.userId).to.equal(payload.userId);

        // 3. Validasi JSON Schema
        const validate = ajv.compile(createUserSchema);
        const valid = validate(response.data);
        
        if (!valid) {
            console.log(validate.errors);
        }
        expect(valid).to.be.true;
    });
});