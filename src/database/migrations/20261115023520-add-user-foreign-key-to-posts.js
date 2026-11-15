"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("posts", {
      fields: ["user_id"],
      type: "foreign key",
      name: "posts_user_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      "posts",
      "posts_user_id_fk"
    );
  },
};