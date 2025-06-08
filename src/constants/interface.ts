
export interface IBoard extends Document {
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITask extends Document {
  name: string;
  description: string;
  icon: string;
  status: string;
  boardId: Number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Task {
  name: string;
  description: string;
  icon: string;
  status: string;
} 