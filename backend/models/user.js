const { Model, DataTypes, Op } = require('sequelize');
const { sequelize } = require('../util/db');

class User extends Model {
  async numberOfRequests() {
    return (await this.getRequests()).length;
  }

  static async withRequests(limit) {
    return await User.findAll({
      attributes: {
        include: [[sequelize.fn("COUNT", sequelize.col("requests.id")), "request_count"]]
      },
      include: [
        {
          model: Request,
          attributes: []
        },
      ],
      group: ['user.id'],
      having: sequelize.literal(`COUNT(requests.id) > ${limit}`)
    });
  }

  static async calculateRanks() {
    const users = await User.findAll({
      attributes: ['id', 'points'],
      order: [['points', 'DESC']],
      raw: true
    });

    let rank = 1;
    let previousPoints = null;
    let rankOffset = 0;

    const ranks = users.map((user, index) => {
      if (previousPoints !== null && user.points !== previousPoints) {
        rank += rankOffset + 1;
        rankOffset = 0;
      } else {
        rankOffset++;
      }

      previousPoints = user.points;

      return {
        userId: user.id,
        rank
      };
    });

    for (const userRank of ranks) {
      await User.update({ rank: userRank.rank }, {
        where: { id: userRank.userId }
      });
    }
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phonenumber: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  staff: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
  scopes: {
    admin: {
      where: {
        admin: true
      }
    },
    staff: {
      where: {
        staff: true
      }
    },
    name(value) {
      return {
        where: {
          name: {
            [Op.iLike]: `%${value}%`
          }
        }
      }
    },
  }
});

module.exports = User;
