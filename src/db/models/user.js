module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      access_token: {
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
  user.associate = function(models) {
    user.hasMany(models.book, { as: 'books' });
  };
  return user;
};