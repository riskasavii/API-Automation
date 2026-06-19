const createUserSchema = {
    type: "object",
    required: ["title", "body", "userId", "id"],
    properties: {
        title: { type: "string" },
        body: { type: "string" },
        userId: { type: "integer" },
        id: { type: "integer" }
    }
};

module.exports = { createUserSchema };