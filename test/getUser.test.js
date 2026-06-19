const axios = require('axios');
const { expect } = require('chai');
const Ajv = require('ajv');
const ajv = new Ajv();
const { getUserSchema } = require('../schemas/user.schema');

describe('GET Single User - JSONPlaceholder API', () => {
    it('Harus berhasil mendapatkan data user dan struktur JSON Schema sesuai', async () => {
        try {
            // Mengirim request ke JSONPlaceholder (Bebas API Key)
            const response = await axios.get('https://jsonplaceholder.typicode.com/users/2');

            expect(response.status).to.equal(200);

            // Validasi JSON Schema
            const validate = ajv.compile(getUserSchema);
            const valid = validate(response.data);
            
            if (!valid) {
                console.log(validate.errors);
            }
            expect(valid).to.be.true;
        } catch (error) {
            if (error.response) {
                console.log("STATUS ERROR:", error.response.status);
                console.log("DATA ERROR:", error.response.data);
            } else {
                console.log("MESSAGE:", error.message);
            }
            throw error;
        }
    });
});