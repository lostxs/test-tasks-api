import { Column, DataType, Model, Table } from 'sequelize-typescript';

export const TaskCategory = {
  WORK: 'work',
  PERSONAL: 'personal',
  OTHER: 'other',
} as const;

export type TaskCategory = (typeof TaskCategory)[keyof typeof TaskCategory];

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class TaskModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.ENUM(
      TaskCategory.WORK,
      TaskCategory.PERSONAL,
      TaskCategory.OTHER,
    ),
    allowNull: false,
  })
  declare category: TaskCategory;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare status: boolean;
}
