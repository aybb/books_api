module.exports = function(sequelize, DataTypes) {
  const book = sequelize.define(
    'book',
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      release_date: {
        type: DataTypes.DATE,
      },
      cover_image: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    }
  );
  // ASSOCIATIONS
  book.associate = function(models) {
    book.belongsTo(models.user);
  };
  // INSTANCE METHODS
  book.prototype.canBeEditedBy = function(editorId) {
    return this.user_id === editorId;
  };
  return book;
};