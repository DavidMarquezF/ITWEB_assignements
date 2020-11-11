import {Exercise} from "./exercise.model";

export interface Workout {
  _id: string;
  userId: string;
  name: string;
  description: string;
  exercises: Exercise[];
}
